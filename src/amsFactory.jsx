import React, {useEffect} from 'react'
import { useParams } from "react-router";

import AmsManager from './ams-manager'

export default function authFactory (amsConfig,amsPath='/')  {

  function AMS() {
    const params = useParams();
    return (
      <AmsManager
        path={ params.action }
        urlArg={ params.urlArg }
        config={amsConfig}
      />
    )
  }

  function ErrorBoundary({ error }) {
    return (
      <div>
        <h1>AUTH ErrorBoundary</h1>
        <pre>{JSON.stringify(error,null,3)}</pre>
      </div>
    );
  }

  return [
    { path: `${ amsPath }/:action`,
      element: (props) =>  <AMS { ...props } />
    },
    { path: `${ amsPath }/:action/:urlArg`,
      element: (props) =>  <AMS { ...props } />
    }
  ]
}
