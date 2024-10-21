import React from "react";
import { ThemeContext } from "~/modules/avl-components/src";
import Border from "./components/Border";

import wrapper from "../wrappers/ams-create-group";

export default wrapper(
  ({ user, group, authLevel, update, canSubmit, handleSubmit }) => {
    const myTheme = React.useContext(ThemeContext);
    const createButtonClass = myTheme.button({color:"primary", size:"sm"}).button;
    return (
      <Border className="max-w-2xl pb-4">
        <div className="border-b-2 mb-1">
          <div className="grid grid-cols-4 gap-1">
            <div className="col-span-2 font-bold">Create Group</div>
            <div className="col-span-1">Authority Level</div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-4 gap-1">
            <div className="col-span-2">
              <input
                placeholder="Enter group name..."
                required
                showClear
                value={group}
                onChange={(e) => {
                  update({ group: e.target.value });
                }}
              />
            </div>
            <div className="col-span-1">
              <input
                type="number"
                min="0"
                max={user.authLevel}
                required
                value={authLevel}
                onChange={(e) => update({ authLevel: e.target.value })}
              />
            </div>
            <div className="col-span-1 flex justify-center">
              <button className={createButtonClass} type="submit" block disabled={!canSubmit}>
                create
              </button>
            </div>
          </div>
        </form>
      </Border>
    );
  }
);
