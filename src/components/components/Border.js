import React from "react"

export default ({ children, className = "" }) =>
  <div className={ `mb-5 last:mb-0 py-2 px-4 border-2 rounded m-auto ${ className }` }>
    { children }
  </div>
