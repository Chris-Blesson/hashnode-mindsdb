import connect from "@/lib/mindsdb-connection";
import MindsDB from "mindsdb-js-sdk";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userList = ["user_2aXZK9r2CiEID4J45rA24qGEYyk"];
    await connect();
    const QUERY = `SELECT b.*
    FROM practice_recommendations AS b
    where recommender_type = 'user_item' order by score`;

    const recommendationResponse = await MindsDB.SQL.runQuery(QUERY);
    recommendationResponse.rows.forEach(({ item_id }) => {
      if (!userList.includes(item_id)) {
        userList.push(item_id);
      }
    });
    const FETCH_USER_INFO = `Select * from ${
      process.env.DB_NAME
    }.Account where id in (${'"' + userList.join('","') + '"'})`;
    const USER_INFO = await MindsDB.SQL.runQuery(FETCH_USER_INFO);
    return NextResponse.json(USER_INFO?.rows);
  } catch (err) {
    console.log("err", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
