import React, {useEffect} from 'react'
import { useParams } from "react-router-dom";

import AmsManager from './ams-manager'

export default function authFactory (amsConfig,dmsPath='/')  {

  function AMS() {
    const params = useParams();
    return (
      <AmsManager 
        path={ `/${params['*'] || ''}` }
        urlArg={params['*']?.split('/')?.[1] || ''}
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

  return {
    path: `${dmsPath}*`,
    element: (props) =>  <AMS {...props} />
  }
}

