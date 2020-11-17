import React from "react"

import { Header } from "@availabs/avl-components"

const AmsProfile = ({ user, className= "mt-16", children, showHeaders, ...props }) =>
  <div className={ className }>
    { !showHeaders ? null : <Header title="Profile"/> }
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
