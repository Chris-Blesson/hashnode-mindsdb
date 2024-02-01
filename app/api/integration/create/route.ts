import connect from "@/lib/mindsdb-connection";
import { NextResponse } from "next/server";
import MindsDB from "mindsdb-js-sdk";

const DB_CREATION_QUERY = (appToken, oauthToken) => {
  return `
CREATE DATABASE mindsdb_slack
WITH
  ENGINE = 'slack',
  PARAMETERS = {
      "token": "${oauthToken}",
      "app_token": "${appToken}"
    };
        `;
};

const CHAT_BOT_CREATION = (chatbotName) => `CREATE CHATBOT ${chatbotName}
USING
    database = 'mindsdb_slack',
    agent = 'my_agent',
    enable_dms = true,
    is_running = true`;
export async function POST(req: Request) {
  try {
    await connect();
    const requestBody = await req.json();
    const { appToken, oauthToken, chatbotName } = requestBody;
    console.log("request body", requestBody);
    if (!appToken || !oauthToken || !chatbotName) {
      return NextResponse.json(
        {
          message: "Bad Request",
        },
        {
          status: 400,
        }
      );
    }
    const queryResult = await MindsDB.SQL.runQuery(
      DB_CREATION_QUERY(appToken, oauthToken)
    );
    console.log("query result", queryResult);

    if (queryResult.error_message) {
      throw queryResult.error_message;
    }

    const cbQuery = await MindsDB.SQL.runQuery(CHAT_BOT_CREATION(chatbotName));
    if (cbQuery.error_message) {
      throw queryResult.error_message;
    }

    return NextResponse.json({
      message: "Integration created successfully",
    });
  } catch (err) {
    console.log("error in chat", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
