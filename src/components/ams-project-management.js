import React from "react"

const AmsProjectManagement = ({ children, className = "mt-16" }) =>
  <div className={ className }>
    <div className="py-20">
      { children }
    </div>
  </div>

export default ({
  type: AmsProjectManagement,
  wrappers: ["ams-project-management"],
  children: [
    { type: "ams-requests" },
    { type: "ams-send-invite" },
    { type: "ams-user-search" },
    { type: "ams-assign-to-project" },
    { type: "ams-create-group" },
    { type: "ams-groups-in-project" }
  ]
})
