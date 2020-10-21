import React from "react"

import { Link } from "react-router-dom"

import Header from "components/avl-components/components/Header/HeaderComponent"

import wrapper from "../wrappers/ams-directory"

import { useTheme } from "components/avl-components/wrappers/with-theme"

import get from "lodash.get"

export default wrapper(({ path, children, user, showHeaders, className="mt-16", ...props }) => {
  const theme = useTheme();
  return (
    <div className={ className }>
      { !showHeaders ? null : <Header title="Directory"/> }
      <div className="py-20">
        <div className="inline-block">
          { React.Children.toArray(children)
              .reduce((accum, child) => {
                const showInDirectory = get(child, ["props", "showInDirectory"], true),
                  showIfLoggedIn = get(child, ["props", "showIfLoggedIn"], true),
                  amsAction = get(child, ["props", "amsAction"]);
                if (amsAction && showInDirectory && (!user.authed || (user.authed && showIfLoggedIn))) {
                  const authLevel = get(child, ["props", "authLevel"], -1);
                  if (user.authLevel >= authLevel) {
                    accum.push(
                      <Link key={ child.props.amsAction }
                        to={ `${ path }/${ child.props.amsAction }` }>
                        <div className={ `py-1 px-2 rounded hover:${ theme.accent1 }` }>
                          { child.props.amsAction }
                        </div>
                      </Link>
                    )
                  }
                  else {
                    accum.push(
                      <div key={ child.props.amsAction }
                        className={ `py-1 px-2 cursor-not-allowed line-through rounded hover:${ theme.accent1 }` }>
                        { child.props.amsAction }
                      </div>
                    )
                  }
                }
                else if (!amsAction) {
                  accum.push(child);
                }
                return accum;
              }, [])
          }
        </div>
      </div>
    </div>
  )
})
