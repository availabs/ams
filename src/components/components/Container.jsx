import React from "react"
import { useTheme } from '../../theme'

export default ({ Title, children, className = "" }) => {
  const theme = useTheme();
  return (
    <div className={ `
      rounded p-10 shadow-xl
      ${ className }
    ` }>

      { !Title ? null :
        typeof Title === "function" ? <Title /> :
        <div className="text-3xl font-bold mb-2">{ Title }</div>
      }

      { children }

    </div>
  )
}
