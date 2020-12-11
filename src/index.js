import React from "react"

import AmsComps from "./components"
import { amsManager } from "./wrappers"

const AmsManager = ({ children, className = "max-w-6xl mx-auto h-full flex-1 flex flex-col" }) => {
  return <div className={ className }>{ children }</div>
}
const Components = {
  ...AmsComps,
  "ams-manager": amsManager(AmsManager)
}
export { Components }
export { default as Wrappers } from "./wrappers"
export { default as Reducers } from "./reducers"

export { enableAuth, useAuth } from "./wrappers"
