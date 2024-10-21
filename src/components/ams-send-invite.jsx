import React from "react";
import { ThemeContext } from "~/modules/avl-components/src";
import Border from "./components/Border";

import wrapper from "../wrappers/ams-send-invite";

import Select from "~/modules/avl-components/src/components/Inputs/select";
export default wrapper(
  ({ email, verify, group, update, canSubmit, handleSubmit, groups }) => {
    const myTheme = React.useContext(ThemeContext);
    const sendButtonClass = myTheme.button({color:"primary", size:"sm"}).button;
    
    return (
      <Border>
        <div className="grid grid-cols-10 gap-1 font-bold border-b-2 mb-1">
          <div className="col-span-3 text-xl">Send Invite</div>
          <div className="col-span-3 flex items-end">Verify Email</div>
          <div className="col-span-3 flex items-end">Assign to Group</div>
          <div className="col-span-1 flex items-end"></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-10 gap-1 mb-2">
            <div className="col-span-3">
              <input
                placeholder="Enter user email..."
                type="email"
                onChange={(v) => update({ email: v.target.value })}
                value={email}
              />
            </div>
            <div className="col-span-3">
              <input
                placeholder="Verify user email..."
                type="email"
                onChange={(v) => update({ verify: v.target.value })}
                value={verify}
              />
            </div>
            <div className="col-span-3">
              <Select
                domain={groups}
                multi={false}
                accessor={(g) => g.name}
                placeholder="Select a group..."
                listAccessor={(g) => `${g.name} (auth level ${g.authLevel})`}
                onChange={(v) => update({ group: v })}
                value={group}
              />
            </div>
            <div className="col-span-1">
              <button className={sendButtonClass} block type="submit" disabled={!canSubmit}>
                send
              </button>
            </div>
          </div>
        </form>
      </Border>
    );
  }
);
