"use client";

import CreateIntegration from "./CreateIntegration";
import IntegrationList from "./IntegrationList";

const IntegrationTab = ({ integrationList }) => {
  return (
    <div>
      <CreateIntegration integrationList={integrationList} />
      <IntegrationList integrationList={integrationList} />
    </div>
  );
};

export default IntegrationTab;
