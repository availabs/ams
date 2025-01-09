import React from "react";
import wrapper from "../wrappers/ams-project-management";
import ThemeContext from '../theme'
import AmsRequests from "./ams-requests";
import AmsSendInvite from "./ams-send-invite";
import AmsUserSearch from "./ams-user-search";
import AmsAssignToProject from "./ams-assign-to-project";
import AmsCreateGroup from "./ams-create-group";
import AmsGroupsInProject from "./ams-groups-in-project";

const ProjectManagementTile = ({
  children,
  title = "",
  tileWidth = "sm:max-w-md",
}) => {
  const myTheme = React.useContext(ThemeContext);

  return (
    <div className={`mt-8 ${tileWidth}`}>
      <div
        className={`${
          myTheme.tile ?? "bg-white py-8 px-4 shadow-lg sm:rounded-md sm:px-10"
        }`}
      >
        <div className="sm:w-full border-gray-200">
          <h2 className="text-xl font-medium text-gray-900 mb-2">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
};

export default wrapper((props) => {
  return (
    <div className={props.className}>
      <div className="flex flex-wrap mt-10">
        <div className={`text-3xl w-full`}>Project & User Management</div>
        <ProjectManagementTile tileWidth="w-full" title="User Requests and Verification">
          <AmsRequests {...props} />
        </ProjectManagementTile>
        <ProjectManagementTile tileWidth="w-full" title="Invite User">
          <AmsSendInvite {...props} />
        </ProjectManagementTile>
        <ProjectManagementTile tileWidth="w-full" title="User Search">
          <AmsUserSearch {...props} />
        </ProjectManagementTile>
        <ProjectManagementTile tileWidth="w-[49%] mr-4" title="Assign Group to Project">
          <AmsAssignToProject {...props} />
        </ProjectManagementTile>
        <ProjectManagementTile tileWidth="w-[49%]" title="Create Group">
          <AmsCreateGroup {...props} />
        </ProjectManagementTile>
        <ProjectManagementTile tileWidth="w-full" title="Groups within Project">
          <AmsGroupsInProject {...props} />
        </ProjectManagementTile>
      </div>
    </div>
  );
});
