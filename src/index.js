import React from "react"

import AmsComps from "./components"
import { amsManager } from "./wrappers"

const AmsManager = ({ children, className = "max-w-7xl mx-auto h-full flex flex-col" }) => {
  return <div className={ className }>{ children }</div>
}
const Components = {
  ...AmsComps,
  "ams-manager": amsManager(AmsManager)
}
export { postMessageWrapper } from "./wrappers"
export { Components }
export { default as Wrappers } from "./wrappers"
export { default as Reducers } from "./reducers"

export { enableAuth, useAuth } from "./wrappers"

export * from "./api"
