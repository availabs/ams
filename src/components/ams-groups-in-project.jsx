import React from "react"

import GroupComponent, { GroupHeader } from "./components/GroupComponent"
import Border from "./components/Border"

import wrapper from "../wrappers/ams-groups-in-project"

export default wrapper(({ groups, groupSearch, setGroupSearch, ...props }) =>
  <Border>
    <GroupHeader value={ groupSearch } onChange={ setGroupSearch }/>
    { groups.map(group =>
        <GroupComponent key={ group.name } { ...props }
          group={ group }/>
      )
    }
  </Border>
)
