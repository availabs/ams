import React from "react";
import usersWrapper from "../wrappers/ams-users";
import { Table, Button } from "../ui_components";
export default usersWrapper((props) => {
  const DeleteUserCell = (cellProps) => {
    return (
      <div>
        <Button
          style={{ height: "60px" }}
          themeOptions={{ size: "sm", color: "cancel" }}
          showConfirm
          onClick={() => {
            console.log("deleting user::", cellProps.row.original.email)
            props.deleteUser(cellProps.row.original.email);
          }}
        >
          Delete
        </Button>
      </div>
    );
  };

  const tableColumns = [...COLUMNS];
  tableColumns.push({ accessor: "", Header: "Delete User", Cell: DeleteUserCell })

  return (
    <div className="h-full bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="text-xl mb-4">Users</div>
      <Table
        data={props.users}
        columns={tableColumns}
        pageSize={10}
        striped
      />
    </div>
  );
});

const DateCell = ({ value, ...props }) => {
  return <div>{value && value.toLocaleDateString()}</div>;
};

const COLUMN_FILTER_PROPS = {
  filterClassName: "bg-blue-50 rounded",
  filter: "text",
  filterPlaceholder: "",
};

const COLUMNS = [
  {
    accessor: (d) => d?.preferences?.display_name ?? "",
    Header: "Display Name",
    ...COLUMN_FILTER_PROPS,
  },
  {
    accessor: "email",
    Header: "Email",
    ...COLUMN_FILTER_PROPS,
  },
  {
    accessor: (d) => d.groups.join(", "),
    Header: "Agency",
    minWidth: "150px",
    ...COLUMN_FILTER_PROPS,
  },
  {
    accessor: (d) =>
      d.projects
        .map((p) => AUTH_TO_ROLE[p.auth_level])
        .filter(onlyUnique)
        .join(", "),
    Header: "Roles",
    minWidth: "150px",
    ...COLUMN_FILTER_PROPS,
  },
  {
    accessor: (d) => new Date(d.created_at.replace(/"/g, "")),
    Cell: DateCell,
    sortType: "datetime",
    Header: "Registered",
    maxWidth: "125px",
    ...COLUMN_FILTER_PROPS,
  },
];

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}
const AUTH_TO_ROLE = {
  10: "System Admin",
  5: "Agency Admin",
  1: "Agency User",
  5: "Contributor",
  5: "Librarian",
  0: "Public",
};
