import React from "react"

export default Component =>
  class ManagementWrapper extends React.Component {
    static defaultProps = {
      amsAction: "project-management",
      authLevel: 5
    }
    componentDidMount() {
      this.props.getGroups();
      this.props.getUsers();
      this.props.getRequests();
    }
    render() {
      const { groups, project, users, children, ...props } = this.props,
        [groupsInProject, otherGroups] = groups.reduce((a, c) => {
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

      const nameSorter = (a, b) => (
        a.name.toLowerCase() < b.name.toLowerCase() ? -1 :
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : 0
      );
      groupsInProject.sort(nameSorter);
      otherGroups.sort(nameSorter);

      const [usersInProject, otherUsers] = users.reduce((a, c) => {
        if (c.projects.reduce((a, c) => a || (c.project_name === project), false)) {
          a[0].push(c);
        }
        else {
          a[1].push(c);
        }
        return a;
      }, [[], []]);

      return (
        <Component { ...props } project={ project }
          users={ usersInProject }
          otherUsers={ otherUsers }
          groups={ groupsInProject }
          otherGroups={ otherGroups }>
          { React.Children.toArray(children)
              .map(child => React.cloneElement(child, {
                ...props, project,
                users: usersInProject, otherUsers,
                groups: groupsInProject, otherGroups
              }))
          }
        </Component>
      )
    }
  }
