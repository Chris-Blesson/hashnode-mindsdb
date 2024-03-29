import { generateFeedback } from "@/app/MindsdbHandlers/FeedbackGenerator";
import { model } from "@/app/constants/models";
import { removeHtmlTags } from "@/app/utils/sanitizeMarkdown";
import connect from "@/lib/mindsdb-connection";
import { mysqlConnection } from "@/lib/mysql-connection";
import { auth } from "@clerk/nextjs";
import MindsDB from "mindsdb-js-sdk";

import { NextRequest, NextResponse } from "next/server";

/**
 * End contest flow
 * Request body should contain contestId, and the answers
 * Insert the answers to submission table where contestId and the userId matches
 * Generate the feedback
 * Insert the feedback to feedback table where candidate and contest id matches
 */

const db = process.env.NEXT_PLANETSCALE_DB_NAME;

const fetchSubmissionRecord = (candidateId, contestId) => {
  return `SELECT id from ${db}.Submission WHERE candidate_id="${candidateId}" AND entity_id="${contestId}"`;
};

const updateSubmissionRecord = (candidateId, contestId) => {
  return `UPDATE ${db}.Submission SET answer=? WHERE candidate_id="${candidateId}" AND entity_id="${contestId}"`;
};

const updateFeedbackRecord = (candidateId, contestId) => {
  return `UPDATE ${db}.Feedback SET score=?, feedback=?, end_time_candidate=? WHERE candidate_id="${candidateId}" AND entity_id="${contestId}"`;
};

export async function POST(req: NextRequest) {
  try {
    await connect();
    const data = await req.json();
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json(
        {
          message: "Unauthenticated",
        },
        {
          status: 401,
        }
      );
    }
    if (!data.answers || !data.contestId) {
      return NextResponse.json(
        {
          message: "Invalid value for startTime or contestId",
        },
        {
          status: 400,
        }
      );
    }

    const mysql = await mysqlConnection();
    const [fetchSubmissionRecordData] = await mysql.query(
      fetchSubmissionRecord(userId, data.contestId)
    );
    const submissionId = fetchSubmissionRecordData?.[0]?.id;
    if (!submissionId) {
      return NextResponse.json(
        {
          message: "You have not started the contest",
        },
        {
          status: 400,
        }
      );
    }
    await mysql.query(updateSubmissionRecord(userId, data.contestId), [
      JSON.stringify({ answer: data.answers }),
    ]);

    //Generate feedback
    const individualAnswers = Object.keys(data.answers)
      .map((questionKey) => {
        const answerValue = data.answers[questionKey].value;
        const isChatType = answerValue?.toBeRenderedMessages instanceof Array;
        console.log("answer value", answerValue);
        if (isChatType) {
          //@ts-ignore
          return answerValue.toBeRenderedMessages;
        } else {
          return removeHtmlTags(answerValue);
        }
      })
      .join("\n\n");

    const [language, tone, score] = await Promise.all([
      MindsDB.SQL.runQuery(
        generateFeedback(individualAnswers, model.langugageModel)
      ),
      MindsDB.SQL.runQuery(
        generateFeedback(individualAnswers, model.toneModel)
      ),
      MindsDB.SQL.runQuery(
        generateFeedback(individualAnswers, model.scoreModel)
      ),
    ]);

    const [language_proficiency, tone_feedback, scoreVal] = [
      language.rows?.[0]?.response,
      tone.rows?.[0]?.response,
      score.rows?.[0]?.response,
    ];
    // const feedback = await MindsDB.SQL.runQuery(
    //   generateFeedback(feedbackRequestedFor)
    // );
    // const feedbackObject = feedback.rows?.[0]?.response;
    console.log("Feedback", {
      language_proficiency,
      tone_feedback,
      scoreVal,
    });

    const feedbackObject = {
      language_proficiency,
      tone_feedback,
      scoreVal,
    };

    const currentTime = Date.now();
    await mysql.query(updateFeedbackRecord(userId, data.contestId), [
      scoreVal,
      JSON.stringify(feedbackObject),
      currentTime,
    ]);
    return NextResponse.json({
      message: submissionId,
    });
  } catch (err) {
    console.log("err in end contest", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
