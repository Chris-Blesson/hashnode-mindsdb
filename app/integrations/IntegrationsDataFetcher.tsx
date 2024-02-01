import { listAgents } from "@/app/db-handlers/integrations/listAgents";
import { listIntegrations } from "../db-handlers/integrations/listIntegrations";
import AvailableTabs from "./AvailableTabs";

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
  return (
    <AvailableTabs
      agentList={tableListAgentAdapter}
      integrationList={tableListOfIntegrations}
    />
  );
};

export default ListAgents;
