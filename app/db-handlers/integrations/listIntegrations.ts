import MindsDB from "mindsdb-js-sdk";
import connect from "@/lib/mindsdb-connection";

const LIST_INTEGRATIONS = `SELECT * from chatbots`;
export const listIntegrations = async () => {
  await connect();
  const integrations = await MindsDB.SQL.runQuery(LIST_INTEGRATIONS);
  console.log("integrations", integrations);
  return integrations?.rows;
};
