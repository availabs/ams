import React from "react";
import { ThemeContext, Button } from "~/modules/avl-components/src";

import wrapper from "../wrappers/ams-send-invite";

import Select from "~/modules/avl-components/src/components/Inputs/select";
export default wrapper(
  ({ email, verify, group, update, canSubmit, handleSubmit, groups }) => {
    const myTheme = React.useContext(ThemeContext);
    const inputClass = myTheme.input().input;
    return (
      <>
        <div className="grid grid-cols-10 gap-1 font-bold mb-1">
          <div className="col-span-3">User Email</div>
          <div className="col-span-3 flex items-end">Verify Email</div>
          <div className="col-span-3 flex items-end">Assign to Group</div>
          <div className="col-span-1 flex items-end"></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-10 gap-1 mb-2">
            <div className="col-span-3">
              <input
                className={`h-full ${inputClass}`}
                placeholder="Enter user email..."
                type="email"
                onChange={(v) => update({ email: v.target.value })}
                value={email}
              />
            </div>
            <div className="col-span-3">
              <input
                className={`h-full ${inputClass}`}
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
            <div className="col-span-1 grid">
              <Button
                themeOptions={{size: "sm"}}
                block
                type="submit"
                disabled={!canSubmit}
              >
                send
              </Button>
            </div>
          </div>
        </form>
      </>
    );
  }
);
