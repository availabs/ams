import React from "react"
import { Config } from "../api/utils"

const nameSorter = (a, b) => (
  a.name.toLowerCase() < b.name.toLowerCase() ? -1 :
  a.name.toLowerCase() > b.name.toLowerCase() ? 1 : 0
);

const amsUsersWrapper = Component =>
  ({ groups = [], users, children, getGroups, getUsers, getRequests, getUsersPreferences,  ...props }) => {
    const project = Config.PROJECT_NAME;
    React.useEffect(() => {
      getGroups();
      getUsers();
      getRequests();
      getUsersPreferences({userEmails:['r.k.dubowsky@gmail.com']});
    }, [getGroups, getUsers, getRequests]);

    const [groupsInProject, otherGroups] = React.useMemo(() => {
      return groups.reduce((a, c) => {
        const authLevel = c.projects.reduce((a, c) => c.project_name === project ? +c.auth_level : a, -1);
        if (authLevel > -1) {
          c.authLevel = authLevel;
          a[0].push(c);
        }
        else {
          a[1].push(c);
        }
        return a;
      }, [[], []]);
    }, [groups, project]);

    groupsInProject.sort(nameSorter);
    otherGroups.sort(nameSorter);

    const [usersInProject, otherUsers] = React.useMemo(() => {
      return users.length > 0 ? users.reduce((a, c) => {
        if (c.projects.reduce((a, c) => a || (c.project_name === project), false)) {
          a[0].push(c);
        }
        else {
          a[1].push(c);
        }
        return a;
      }, [[], []]) : [];
    }, [users, project]);
    return (
      <Component { ...props } project={ project }
        getGroups={ getGroups }
        getUsers={ getUsers }
        getRequests={ getRequests }
        users={ usersInProject }
        otherUsers={ otherUsers }
        groups={ groupsInProject }
        otherGroups={ otherGroups }>
        { React.Children.toArray(children)
            .map(child => React.cloneElement(child, {
              ...props, project,
              getGroups, getUsers, getRequests,
              users: usersInProject, otherUsers,
              groups: groupsInProject, otherGroups
            }))
        }
      </Component>
    )
  }
export default amsUsersWrapper;
