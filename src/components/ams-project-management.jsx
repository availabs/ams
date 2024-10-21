import React from "react"
import wrapper from "../wrappers/ams-project-management";

import AmsRequests from "./ams-requests";
import AmsSendInvite from "./ams-send-invite";
import AmsUserSearch from "./ams-user-search";
import AmsAssignToProject from "./ams-assign-to-project";
import AmsCreateGroup from "./ams-create-group";
import AmsGroupsInProject from "./ams-groups-in-project";

export default wrapper((props) => (<div className={ props.className }>
  <div className="py-20">
    <AmsRequests {...props} />
    <AmsSendInvite {...props} />
    <AmsUserSearch {...props} />
    <AmsAssignToProject {...props} />
    <AmsCreateGroup {...props} />
    <AmsGroupsInProject {...props} />
  </div>
</div>))