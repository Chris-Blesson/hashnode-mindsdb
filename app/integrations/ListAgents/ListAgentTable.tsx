"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@nextui-org/react";

const agentsColumn = [
  {
    key: "agent_name",
    uid: "agent_name",
    label: "Agent Name",
  },
  {
    key: "skill",
    uid: "skill",
    label: "Skills",
  },
];

const renderCell = (item, columnKey: string) => {
  switch (columnKey) {
    case "skill":
      return (
        <>
          {item[columnKey].map((skill) => {
            return <Chip key={skill}>{skill}</Chip>;
          })}
        </>
      );
    default:
      return <p>{item[columnKey]}</p>;
  }
};

const AgentsTable = ({ agents }) => {
  return (
    <Table isHeaderSticky isStriped aria-label="Submissions table">
      <TableHeader columns={agentsColumn}>
        {(column) => {
          return <TableColumn key={column.key}>{column.label}</TableColumn>;
        }}
      </TableHeader>
      <TableBody items={agents} emptyContent="No Submissions found">
        {(item: any) => {
          return (
            <TableRow key={item.agent_name}>
              {(columnKey: any) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          );
        }}
      </TableBody>
    </Table>
  );
};

export default AgentsTable;
