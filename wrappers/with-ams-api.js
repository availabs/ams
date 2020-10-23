import React from "react"

import { useApi } from "./ams-redux"

export default Component =>
  props => <Component { ...props } { ...useApi() }/>
