import MindsDB from "mindsdb-js-sdk";
import connect from "@/lib/mindsdb-connection";

const LIST_AGENTS = `SELECT * from agents`;
export const listAgents = async () => {
  await connect();
  const agents = await MindsDB.SQL.runQuery(LIST_AGENTS);
  console.log("agents", agents);
  return agents?.rows;
};
