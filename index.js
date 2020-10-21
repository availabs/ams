import React from "react"

import AmsComps from "./components"

import amsManager  from "./wrappers/ams-manager"

const AmsManager = ({ children, className = "max-w-6xl m-auto", ...props }) => {
  return <div className={ className }>{ children }</div>
}
export default {
  ...AmsComps,
  "ams-manager": amsManager(AmsManager)
};
