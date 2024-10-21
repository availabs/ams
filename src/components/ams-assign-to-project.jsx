import React from "react";
import { ThemeContext } from "~/modules/avl-components/src";

import Border from "./components/Border";

import wrapper from "../wrappers/ams-assign-to-project";

export default wrapper(
  ({ groups, user, group, authLevel, update, canSubmit, handleSubmit }) => {
    const myTheme = React.useContext(ThemeContext);
    const assignButtonClass = myTheme.button({color:"primary", size:"sm"}).button;
    return (
      <Border className="max-w-2xl pb-4">
        <div className="border-b-2 mb-1">
          <div className="grid grid-cols-4 gap-1">
            <div className="col-span-2 font-bold">Assign to Project</div>
            <div className="col-span-1">Authority Level</div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-4 gap-1">
            <div className="col-span-2">
              <select
                value={group}
                onChange={(e) => update({ group: e.target.value })}
                placeholder="Select a group..."
              >
                {groups.map((d) => (
                  <option value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>
            <div className="col-span-1">
              <input
                type="number"
                min="0"
                max={user.authLevel}
                required
                value={authLevel}
                onChange={(v) => update({ authLevel: v.target.value })}
              />
            </div>
            <div className="col-span-1 flex justify-center">
              <button className={assignButtonClass} type="submit" block disabled={!canSubmit}>
                assign
              </button>
            </div>
          </div>
        </form>
      </Border>
    );
  }
);
