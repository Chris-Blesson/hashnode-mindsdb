import connect from "@/lib/mindsdb-connection";
import { NextResponse } from "next/server";
import MindsDB from "mindsdb-js-sdk";

const DELETE_DB = `DROP DATABASE mindsdb_slack`;
const DELETE_CB = (chatbotName) => {
  return `DROP CHATBOT ${chatbotName}`;
};

export async function POST(req: Request) {
  try {
    await connect();
    const requestBody = await req.json();
    const { chatbotName } = requestBody;
    console.log("request body", requestBody);
    if (chatbotName) {
      return NextResponse.json(
        {
          message: "Bad Request",
        },
        {
          status: 400,
        }
      );
    }
    const queryResult = await Promise.all([
      MindsDB.SQL.runQuery(DELETE_DB),
      MindsDB.SQL.runQuery(DELETE_CB(chatbotName)),
    ]);
    console.log("query result", queryResult);

    if (queryResult[0].error_message) {
      throw queryResult[0].error_message;
    }

    return NextResponse.json({
      message: "Integration deleted successfully",
    });
  } catch (err) {
    console.log("error in chat", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
