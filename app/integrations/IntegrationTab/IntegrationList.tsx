"use client";

import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import DeleteIntegration from "./DeleteIntegration";

const integrationsColumn = [
  {
    key: "name",
    uid: "name",
    label: "Chatbot name",
  },
  {
    key: "params",
    uid: "params",
    label: "Params",
  },
  {
    key: "is_running",
    uid: "is_running",
    label: "Is Running",
  },
  {
    key: "last_error",
    uid: "last_error",
    label: "Last Error",
  },
  {
    key: "action",
    uid: "action",
    label: "Action",
  },
];

const renderCell = (item, columnKey: string, chatbotName) => {
  console.log("item[columnKey]", item[columnKey]);
  switch (columnKey) {
    case "action":
      return <DeleteIntegration chatbotName={chatbotName} />;
    case "params":
      return <p>{JSON.stringify(item[columnKey])}</p>;
    default:
      return <p>{`${item[columnKey] || "N/A"}`}</p>;
  }
};
const IntegrationList = ({ integrationList }) => {
  return (
    <Table isHeaderSticky isStriped aria-label="Submissions table">
      <TableHeader columns={integrationsColumn}>
        {(column) => {
          return <TableColumn key={column.key}>{column.label}</TableColumn>;
        }}
      </TableHeader>
      <TableBody items={integrationList} emptyContent="No Integrations found">
        {(item: any) => {
          return (
            <TableRow key={item.name}>
              {(columnKey: any) => (
                <TableCell>{renderCell(item, columnKey, item.name)}</TableCell>
              )}
            </TableRow>
          );
        }}
      </TableBody>
    </Table>
  );
};

export default IntegrationList;
