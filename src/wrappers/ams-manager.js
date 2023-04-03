import React from "react"

import { Config } from "../api/utils"

import { Link, useLocation } from "react-router-dom"

import Container from "../components/components/Container"

import get from "lodash.get"

const NoChild = () => (
  <div className="h-screen flex items-center justify-center">
    <Container>
      <div className="text-lg font-bold">OOPS!!! Something went awry!</div>
      <div className="text-right">
        <Link to="/auth">
          to directory
        </Link>
      </div>
    </Container>
  </div>
);
const NoAuthority = () => (
  <div className="h-screen flex items-center justify-center">
    <Container>
      <div className="text-lg font-bold">OOPS!!! You do not have the authority!</div>
      <div className="text-right">
        <Link to="/auth">
          to directory
        </Link>
      </div>
    </Container>
  </div>
);

export default Component => {
  const AmsManager = ({ params = {}, children, showHeaders = true, className, ...props }) => {
    const { action } = params,
      location = useLocation();
  console.log('??', action, props,
    React.Children.toArray(children),
      // .filter(({ props }) => !("amsAction" in props) || (props.amsAction === action)),
    React.Children.toArray(children)
      .filter(({ props }) => !("amsAction" in props) || (props.amsAction === "login"))

  )
    let requiredAuth = -1;

    let Children = React.Children.toArray(children)
      .filter(({ props }) => !("amsAction" in props) || (props.amsAction === action))
      .map(child => {
        requiredAuth = Math.max(requiredAuth, get(child, ["props", "authLevel"], -1));
        return React.cloneElement(child, {
          ...props, ...params,
          location,
          showHeaders: get(child, ["props", "showHeaders"], showHeaders),
          project: Config.PROJECT_NAME
        });
      });
    console.log('children -1', Children)
    if (!action || action === "directory") {
      Children = React.Children.toArray(children)
        .filter(({ props }) => !("amsAction" in props) || (props.amsAction === "directory"))
        .map(child =>
          React.cloneElement(child, {
            ...props, ...params,
            location,
            showHeaders: get(child, ["props", "showHeaders"], showHeaders),
            children,
            project: Config.PROJECT_NAME
          })
        );
      console.log('children 0', Children)
    }
    else if (!props.user.authed && (requiredAuth > -1)) {
      Children = React.Children.toArray(children)
        .filter(({ props }) => !("amsAction" in props) || (props.amsAction === "login"))
        .map(child => React.cloneElement(child, {
          ...props, ...params,
          location,
          showHeaders: get(child, ["props", "showHeaders"], showHeaders),
          project: Config.PROJECT_NAME
        }));
      console.log('children 1', Children)
    }
    else if (props.user.authed && (props.user.authLevel < requiredAuth)) {
      Children = [
        ...React.Children.toArray(children)
          .filter(({ props }) => !("amsAction" in props))
          .map(child => React.cloneElement(child, {
            ...props, ...params,
            location,
            showHeaders: get(child, ["props", "showHeaders"], showHeaders),
            project: Config.PROJECT_NAME
          })),
        <NoAuthority key="no-auth"/>
      ];
      console.log('children 2', Children)
    }

    if (!Children.length) {
      Children = <NoChild />
    }

    return (
      <Component { ...props } { ...params } className={ className }
        showHeaders={ showHeaders } project={ Config.PROJECT_NAME }>
        { Children }requiredAuth
      </Component>);
  }
  return AmsManager;
}
