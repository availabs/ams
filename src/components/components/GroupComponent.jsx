import React from "react"

import UsersInGroup from "./UsersInGroup"

import get from "lodash/get"
import { useTheme } from '../../theme';

export const GroupHeader = ({ onChange, value }) =>
  <div className="grid grid-cols-12 gap-3 text-center font-bold mb-1">
    <div className="col-span-4 text-left border-b-2 text-xl">
      <div>Groups in Project</div>
      <div className="mb-1">
        <input small showClear placeholder="Search groups..."
          value={ value } onChange={ e => onChange(e.target.value) }/>
      </div>
    </div>
    <div className="col-span-3 border-b-2 flex justify-center items-end">
      Adjust Project Authority
    </div>
    <div className="col-span-3 border-b-2 flex justify-center items-end">
      Remove from Project
    </div>
    <div className="col-span-2 border-b-2 flex justify-center items-end">
      Delete Group
    </div>
  </div>

const verify = (currAL, newAL) =>
  !isNaN(newAL) && (currAL !== newAL) && (newAL >= 0) && (newAL <= 10);

export default ({ group, project, adjustAuthLevel, deleteGroup, removeFromProject, ...props }) => {
  const [opened, setOpened] = React.useState(false),
    toggle = React.useCallback(() => setOpened(!opened), [opened]),
    Project = group.projects.reduce((a, c) => c.project_name === project ? c : a, {}),
    [authLevel, setAuthLevel] = React.useState(get(Project, "auth_level", -1));

  const submit = React.useCallback(e => {
    e.preventDefault();
    adjustAuthLevel(group.name, authLevel);
  }, [adjustAuthLevel, group.name, authLevel]);

  const theme = useTheme();

  return (
    <div className={ `
        mb-1 py-1 px-2 rounded ${ opened ? theme.accent1 : "" }`
      }>

      <div className="grid grid-cols-12 gap-3">

        <div className="col-span-4 flex items-center">
          <div className={ `
              px-2 py-1 mr-1 cursor-pointer rounded flex justify-center
              hover:${ theme.accent2 } ${ theme.transition }
            ` } onClick={ toggle }>
            { opened ?
              <span className="fa fa-minus"/> :
              <span className="fa fa-plus"/>
            }
          </div>
          <div className="flex-1">{ group.name }</div>
        </div>

        <div className="col-span-3">
          <form onSubmit={ submit }>
            <div className="grid grid-cols-12 gap-1 flex items-center">
              <div className="col-span-6">
                <input type="number" min="0" max="10" required
                  value={ authLevel } onChange={ e => setAuthLevel(e.target.value) }/>
              </div>
              <div className="col-span-6">
                <button type="submit"
                  disabled={ !verify(+Project.auth_level, +authLevel) }>
                  adjust
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="col-span-3 flex justify-center">
          <button showConfirm
            onClick={ e => removeFromProject(group.name) }>
            remove
          </button>
        </div>

        <div className="col-span-2 flex justify-center">
          <button  showConfirm
            onClick={ e => deleteGroup(group.name) }>
            delete
          </button>
        </div>

      </div>
      { !opened ? null :
        <div className="mx-10 mt-2">
          <UsersInGroup group={ group } { ...props }/>
        </div>
      }
    </div>
  )
}
