"use client";

import { Tabs, Tab } from "@nextui-org/react";
import IntegrationTab from "./IntegrationTab";
import AgentsTable from "./ListAgents/ListAgentTable";

const AvailableTabs = ({ integrationList, agentList }) => {
  return (
    <Tabs aria-label="Feedback">
      <Tab title="Integrations">
        <IntegrationTab integrationList={integrationList} />
      </Tab>
      <Tab title="Available agents">
        <AgentsTable agents={agentList} />
      </Tab>
    </Tabs>
  );
};

export default AvailableTabs;
