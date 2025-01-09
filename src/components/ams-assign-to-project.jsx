import React from "react";
import wrapper from "../wrappers/ams-assign-to-project";
import { Input, Button, Select } from "../ui_components";

export default wrapper(
  ({ groups, user, group, authLevel, update, canSubmit, handleSubmit }) => {
    return (
      <>
        <div className=" mb-1">
          <div className="grid grid-cols-4 gap-1">
            <div className="col-span-2 font-bold">Group</div>
            <div className="col-span-1">Authority Level</div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-4 gap-1">
            <div className="col-span-2">
              <Select
                domain={groups}
                accessor={(g) => g.name}
                value={group}
                onChange={(e) => update({ group: e })}
                placeholder="Select a group..."
              />

            </div>
            <div className="col-span-1">
              <Input
                className="h-full px-1"
                type="number"
                min="0"
                max={user.authLevel}
                required
                value={authLevel}
                onChange={(v) => update({ authLevel: v })}
              />
            </div>
            <div className="col-span-1 grid">
              <Button 
                themeOptions={{size:"sm"}}
                type="submit"
                block
                disabled={!canSubmit}
              >
                assign
              </Button>
            </div>
          </div>
        </form>
      </>
    );
  }
);
