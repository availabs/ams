import React from "react"

import { PROJECT_NAME } from "config"

import { Link, useLocation, useParams, useRouteMatch } from "react-router-dom"

import Header from "components/avl-components/components/Header/HeaderComponent"
import { useTheme } from "components/avl-components/wrappers/with-theme"

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

    let requiredAuth = -1;

    let Children = React.Children.toArray(children)
      .filter(({ props }) => !("amsAction" in props) || (props.amsAction === action))
      .map(child => {
        requiredAuth = Math.max(requiredAuth, get(child, ["props", "authLevel"], -1));
        return React.cloneElement(child, { ...props, ...params, location, showHeaders, project: PROJECT_NAME });
      });

    if (!action || action === "directory") {
      Children = React.Children.toArray(children)
        .filter(({ props }) => !("amsAction" in props) || (props.amsAction === "directory"))
        .map(child =>
          React.cloneElement(child, {
            ...props, ...params,
            location,
            showHeaders,
            children,
            project: PROJECT_NAME
          })
        );
    }
    else if (!props.user.authed && (requiredAuth > -1)) {
      Children = React.Children.toArray(children)
        .filter(({ props }) => !("amsAction" in props) || (props.amsAction === "login"))
        .map(child => React.cloneElement(child, { ...props, ...params, location, showHeaders, project: PROJECT_NAME }));
    }
    else if (props.user.authed && (props.user.authLevel < requiredAuth)) {
      Children = [
        ...React.Children.toArray(children)
          .filter(({ props }) => !("amsAction" in props))
          .map(child => React.cloneElement(child, { ...props, ...params, location, showHeaders, project: PROJECT_NAME })),
        <NoAuthority key="no-auth"/>
      ];
    }

    if (!Children.length) {
      Children = <NoChild />
    }

    return (
      <Component { ...props } { ...params } className={ className }
        showHeaders={ showHeaders } project={ PROJECT_NAME }>
        { Children }
      </Component>);
  }
  return AmsManager;
}
