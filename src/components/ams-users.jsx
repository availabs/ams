import React from "react";
import { Link } from "react-router-dom";
import usersWrapper from "../wrappers/ams-users";
import { Table } from "~/modules/avl-components/src";

export default usersWrapper((props) => {
  console.log("users wrapper, props::", props);

  console.log(props.users);
  return (
    <div className="h-full bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 ">
      <Table data={props.users} columns={COLUMNS} />
    </div>
  );
});

const DateCell = ({ value, ...props }) => {
  const myDate = new Date(value.replace(/"/g, ""));

  return <div>{myDate.toLocaleString()}</div>;
};
const COLUMNS = [
  { accessor: "", Header: "Display Name" }, //TODO
  {
    accessor: "email",
    Header: "Email",
    searchable: true,
    filter: "text",
    filterPlaceholder: "zzs",
    filterThemeOptions: { size: "mini" },
    filterClassName: "w-full text-sm z-50",
  },
  {
    accessor: (d) => d.groups.join(", "),
    Header: "Agency",
  },
  { accessor: "", Header: "Roles" }, //TODO -- for now, map thru `projects`, get AuthLevel

  { accessor: "created_at", Header: "Registered", Cell: DateCell },
  { accessor: "", Header: "Logins" }, //TODO
  { accessor: "", Header: "Last Login" }, //TODO
];
