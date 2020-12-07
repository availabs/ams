import React from "react"

const AmsProfile = ({ user, className= "mt-16", children, ...props }) =>
  <div className={ className }>
    <div className="p-20">
      <div className="font-bold text-xl text-center">
        Welcome: { user.email }
      </div>
      <div className="mt-4">
        { children }
      </div>
    </div>
  </div>

export default ({
  type: AmsProfile,
  wrappers: ["ams-profile"],
  children: [{ type: "ams-update-password" }]
})
