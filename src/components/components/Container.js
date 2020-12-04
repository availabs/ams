import React from "react"

import { useTheme } from "@availabs/avl-components"

export default ({ title, children }) => {
  const theme = useTheme();
  return (
    <div className="flex justify-center">
      <div className={ `
          m-auto inline-block rounded px-20 py-10 shadow-xl
          ${ theme.accent1 }
        ` }>
        { !title ? null : <div className="text-3xl font-bold">{ title }</div> }
        <div>
          { children }
        </div>
      </div>
    </div>
  )
}
