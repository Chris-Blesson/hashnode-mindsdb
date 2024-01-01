import { mysqlConnection } from "@/lib/mysql-connection";
import { NextRequest, NextResponse } from "next/server";
import { findUser } from "./[id]/route";
import { ensureSuperTokensInit } from "../../../config/backendConfig";
import supertokens from "supertokens-node";
import { headers } from "next/headers";
ensureSuperTokensInit();

export async function GET(request: NextRequest) {
  try {
    const mysql = await mysqlConnection();
    const headersList = headers();
    const userId = headersList.get("x-user-id");
    console.log("user id", userId);
    const [data] = await mysql.query(findUser(userId, "id"));
    return NextResponse.json(data?.[0] || {});
  } catch (err) {
    console.log("err in candidate contest", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export const createUser = () => {
  return `INSERT INTO ${process.env.NEXT_PLANETSCALE_DB_NAME}.Account (id, email, account_type,organisation_id, area_of_interest, avatar_url, country, city, phone_number, document_url, experience )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
};

export async function POST(req: NextRequest) {
  try {
    const mysql = await mysqlConnection();
    const data = await req.json();
    const headersList = headers();
    const userId = headersList.get("x-user-id");
    const userInfo = await supertokens.getUser(userId || "");
    console.log("user info", userInfo);
    const [createAccount] = await mysql.query(createUser(), [
      userId,
      userInfo?.emails[0],
      data.account_type,
      data.organisation_id || "",
      data.area_of_interest || "",
      data.avatar_url || "",
      data.country,
      data.city,
      data.phone_number,
      data.document_url,
      data.experience,
    ]);
    console.log("create account", createAccount);
    return NextResponse.json(
      {
        message: "Account created",
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error("err", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
