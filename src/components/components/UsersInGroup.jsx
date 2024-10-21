import React from "react"

import { matchSorter } from 'match-sorter'
import { ThemeContext } from "~/modules/avl-components/src";
const UserHeader = ({ value, onChange, ...props }) =>
  <div className="grid grid-cols-9 font-bold gap-3">
    <div className="col-span-4 border-b-2">
      <div>User Email</div>
      <div className="mb-1">
        <input small showClear placeholder="Searh users..."
          value={ value } onChange={ e => onChange(e.target.value) }/>
      </div>
    </div>
    <div className="col-span-3 border-b-2 flex justify-center items-end">
      Remove from Group
    </div>
    <div className="col-span-2 border-b-2 flex justify-center items-end">
      Delete User
    </div>
  </div>

const UserInGroup = ({ group, User, removeFromGroup, deleteUser, ...props }) => {
  const theme = React.useContext(ThemeContext);
  const buttonClass = theme.button({color:"danger", size:"sm"}).button;
  return (
    <div className="grid grid-cols-9 my-1">
      <div className="col-span-4">
        { User.email }
      </div>
      <div className="col-span-3 flex justify-center">
        <button 
          className={buttonClass}
          showConfirm
          onClick={ e => removeFromGroup(User.email, group.name) }>
          remove
        </button>
      </div>
      <div className="col-span-2 flex justify-center">
        <button 
          className={buttonClass}
          showConfirm 
          onClick={ e => deleteUser(User.email) }>
          delete
        </button>
      </div>
    </div>
  )
}
const UserNotInGroup = ({ group, User, assignToGroup, ...props }) => {
  const theme = React.useContext(ThemeContext);
  const addButtonClass = theme.button({color:"primary", size:"sm"}).button;
  return (
    <div className="grid grid-cols-12 mb-1 flex items-center">
      <div className="col-span-8">
        { User.email }
      </div>
      <div className="col-span-4">
        <button className={addButtonClass} onClick={ e => assignToGroup(User.email, group.name) }>
          add to group
        </button>
      </div>
    </div>
  )
}

export default ({ group, users, ...props }) => {

  const [num, setNum] = React.useState(5),
    [userSearch, setUserSearch] = React.useState(""),
    [otherUserSearch, setOtherUserSearch] = React.useState(""),
    [usersInGroup, otherUsers] = users.reduce(([a1, a2], c) => {
      if (c.groups.includes(group.name)) {
        a1.push(c);
      }
      else {
        a2.push(c);
      }
      return [a1, a2];
    }, [[], []]);

  usersInGroup.sort((a, b) => a.email < b.email ? -1 : a.email > b.email ? 1 : 0);

  const otherSearch = matchSorter(otherUsers, otherUserSearch, { keys: ["email"] });

console.log("???", usersInGroup)
  return (
    <div>
      <div className="mb-5 grid grid-cols-3 gap-2">
        <div className="col-span-1 relative">
          <input value={ otherUserSearch } onChange={ e => setOtherUserSearch(e.target.value) }
            placeholder="Search for another user..." showClear/>
          { otherUserSearch && otherSearch.length ?
              <div className="absolute left-0 bottom-0 right-0">
                { otherSearch.length <= 5 ? null :
                  <div className="flex justify-center">
                    <button onClick={ e => setNum(num - 5) }
                      disabled={ num === 5 }
                      className="mx-1">
                      Show Less
                    </button>
                    <button onClick={ e => setNum(num + 5) }
                      disabled={ num > otherSearch.length }
                      className="mx-1">
                      Show More
                    </button>
                  </div>
                }
              </div> : null
          }
        </div>
        <div className="col-span-2">
          { !otherUserSearch ? null :
            <div>
              { otherSearch.length ? null :
                <div className="pt-1">No users found...</div>
              }
              { otherSearch.slice(0, num)
                  .map(u =>
                    <UserNotInGroup { ...props } key={ u.email } group={ group } User={ u }/>
                  )
              }
              { otherSearch.length < num ? null :
                <div>Plus { otherSearch.length - num } others...</div>
              }
            </div>
          }
        </div>
      </div>
      <UserHeader onChange={ setUserSearch } value={ userSearch }/>
      { matchSorter(usersInGroup, userSearch, { keys: ["email"] })
          .map(user =>
            <UserInGroup { ...props } key={ user.email } User={ user }
              group={ group }>
              { user.email }
            </UserInGroup>
          )
      }
    </div>
  )
}
