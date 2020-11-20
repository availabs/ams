import React from "react"

import { useAmsApi } from "./ams-redux"

export default Component =>
  props => <Component { ...props } { ...useAmsApi() }/>
