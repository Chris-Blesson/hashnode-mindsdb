import { listAgents } from "@/app/db-handlers/integrations/listAgents";
import AgentsTable from "./ListAgents/ListAgentTable";
import IntegrationTab from "./IntegrationTab";
import { listIntegrations } from "../db-handlers/integrations/listIntegrations";

const ListAgents = async () => {
  const [listOfAgents, listOfIntegrations] = await Promise.all([
    listAgents(),
    listIntegrations(),
  ]);
  const tableListAgentAdapter = listOfAgents.map((agent) => {
    return {
      agent_name: agent.name,
      skill: agent.skills,
    };
  });
  const tableListOfIntegrations = listOfIntegrations.map((integration) => {
    return {
      ...integration,
      action: "",
    };
  });
  return <IntegrationTab integrationList={tableListOfIntegrations} />;
};

export default ListAgents;
