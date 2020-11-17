import React from "react"

import { Button, Input } from "@availabs/avl-components"

import Border from "./components/Border"

import wrapper from "../wrappers/ams-create-group"

export default wrapper(({ user, group, authLevel, update, canSubmit, handleSubmit }) =>
  <Border className="max-w-2xl pb-4">
    <div className="border-b-2 mb-1">
      <div className="grid grid-cols-4 gap-1">
        <div className="col-span-2 font-bold">
          Create Group
        </div>
        <div className="col-span-1">
          Authority Level
        </div>
      </div>
    </div>
    <form onSubmit={ handleSubmit }>
      <div className="grid grid-cols-4 gap-1">
        <div className="col-span-2">
        <Input placeholder="Enter group name..." required showClear
          value={ group } onChange={ group => update({ group }) }/>
        </div>
        <div className="col-span-1">
          <Input type="number" min="0" max={ user.authLevel } required
            value={ authLevel } onChange={ v => update({ authLevel: v }) }/>
        </div>
        <div className="col-span-1 flex justify-center">
          <Button type="submit" block disabled={ !canSubmit }>
            create
          </Button>
        </div>
      </div>
    </form>
  </Border>
)
