import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
} from "@nextui-org/react";
import { STATUS_COLOR_MAPPING, TABLE_HEADERS } from "../[id]/constants";
import { useCallback } from "react";
import Link from "next/link";

export const LeaderBoard = ({
  candidates,
  setCurrentCandidate,
  headers = TABLE_HEADERS,
}) => {
  const deriveStatus = useCallback((user) => {
    if (!user.start_time_candidate) return "pending";
    if (user.start_time_candidate && !user.feedback) return "in_progress";
    return "done";
  }, []);
  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "full", src: user.avatar_url }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return <div className="flex flex-col"></div>;
      case "document_url":
        return <Link href={cellValue} target="_blank">View Resume</Link>;
      case "contest_status":
        return (
          <Chip
            className="capitalize"
            // @ts-ignore
            color={STATUS_COLOR_MAPPING[deriveStatus(user)].type}
            size="md"
            variant="flat"
          >
            {STATUS_COLOR_MAPPING[deriveStatus(user)].label}
          </Chip>
        );
      case "actions":
      default:
        return cellValue;
    }
  }, []);
  return (
    <Table
      selectionMode="multiple"
      selectionBehavior="replace"
      aria-label="Leader Board"
      onRowAction={(key) => {
        setCurrentCandidate(
          candidates.find((candidate) => candidate.id === key)
        );
      }}
    >
      <TableHeader columns={headers || TABLE_HEADERS}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No rows to display."} items={candidates}>
        {(item: any) => (
          <TableRow className="cursor-pointer" key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
