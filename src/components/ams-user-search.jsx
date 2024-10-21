import React from "react"


import Border from "./components/Border"

import wrapper from "../wrappers/ams-user-search"

import Select from "~/modules/avl-components/src/components/Inputs/select";

const UserInProjectHeader = () =>
  <div className="grid grid-cols-15 py-1 gap-3 font-bold">
    <div className="col-span-5 border-b-2">
      User Email
    </div>
    <div className="col-span-4 text-center border-b-2">
      Add to Group
    </div>
    <div className="col-span-4 text-center border-b-2">
      Remove from Group
    </div>
    <div className="col-span-2 text-center border-b-2">
      Delete User
    </div>
  </div>

const UserInProject = ({ user, groups, assignToGroup, removeFromGroup, deleteUser, ...props }) => {
  const [addTo, setAddTo] = React.useState(""),
    [removeFrom, setRemoveFrom] = React.useState("");

  groups.sort((a, b) => {
    if (a.authLevel === b.authLevel) {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    }
    return a.authLevel - b.authLevel;
  })

  const [userGroups, otherGroups] = groups.reduce(([a1, a2], c) => {
    if (user.groups.includes(c.name)) {
      a1.push(c);
    }
    else {
      a2.push(c);
    }
    return [a1, a2];
  }, [[], []]);

  const assign = React.useCallback(e => {
    assignToGroup(user.email, addTo.name);
    setAddTo("");
  }, [assignToGroup, user, addTo]);

  const remove = React.useCallback(e => {
    removeFromGroup(user.email, removeFrom);
    setRemoveFrom("");
  }, [removeFromGroup, user, removeFrom]);

  return (
    <div className="grid grid-cols-15 py-1 gap-3">
      <div className="col-span-5 whitespace-nowrap overflow-hidden flex items-center">
        { user.email }
      </div>
      <div className="col-span-4 ">
        <div className="grid grid-cols-12 gap-1">
          <div className="col-span-8">
            <Select multi={ false } placeholder="Select a group..."
              options={ otherGroups } accessor={ g => g.name }
              listAccessor={ g => `${ g.name } (auth level ${ g.authLevel })` }
              value={ addTo } onChange={ setAddTo }/>
          </div>
          <div className="col-span-4">
            <button 
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
                bg-blue-300 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              disabled={ !addTo }
              onClick={ assign }>
              add
            </button>
          </div>
        </div>
      </div>
      <div className="col-span-4">
        <div className="grid grid-cols-12 gap-1">
          <div className="col-span-8">
            <Select  placeholder="Select a group..."
              value={ removeFrom } onChange={(val) => setRemoveFrom(val)}
              options={userGroups.map(d => d.name)}
              >
                
            </Select>
          </div>
          <div className="col-span-4">
            <button 
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
                bg-red-300 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              disabled={ !removeFrom }
              onClick={ remove }>
              remove
            </button>
          </div>
        </div>
      </div>
      <div className="col-span-2 flex justify-center">
        <button buttonTheme="buttonDanger" showConfirm
          onClick={ e => deleteUser(user.email) }>
          delete
        </button>
      </div>
    </div>
  )
}

export default wrapper(({ search, setSearch, adjustAmount, matches, remaining, ...props }) =>
  <Border>
    <div className={ `grid grid-cols-2 gap-x-3 gap-y-2` }>
      <div className="col-span-1">
        <input placeholder="Search for a user..." showClear
          value={ search } onChange={ e => setSearch(e.target.value) }/>
      </div>
      <div className="col-span-1">
        { !search ? null :
          <div className="flex justify-center">
            <button className="mx-1"
              disabled={ matches.length <= 5 }
              onClick={ e => adjustAmount(-5) }>
              Show Less
            </button>
            <button className="mx-1"
              disabled={ !remaining }
              onClick={ e => adjustAmount(5) }>
              Show More
            </button>
          </div>
        }
      </div>
        { !search ? null :
          <div className="col-span-2">
            <UserInProjectHeader />
            { matches.map(user =>
                <UserInProject key={ user.email } { ...props } user={ user }/>
              )
            }
          </div>
        }
    </div>
    { !(search && remaining) ? null :
      <div className="py-1">
        Plus { remaining } others...
      </div>
    }
  </Border>
)
