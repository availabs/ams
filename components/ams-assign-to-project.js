import React from "react"

import { Button, Input, Select } from "@availabs/avl-components"

import Border from "./components/Border"

import wrapper from "../wrappers/ams-assign-to-project"

export default wrapper(({ groups, user, group, authLevel, update, canSubmit, handleSubmit }) =>
  <Border className="max-w-2xl pb-4">
    <div className="border-b-2 mb-1">
      <div className="grid grid-cols-4 gap-1">
        <div className="col-span-2 font-bold">
          Assign to Project
        </div>
        <div className="col-span-1">
          Authority Level
        </div>
      </div>
    </div>
    <form onSubmit={ handleSubmit }>
      <div className="grid grid-cols-4 gap-1">
        <div className="col-span-2">
          <Select domain={ groups } accessor={ g => g.name } multi={ false }
            value={ group } onChange={ group => update({ group }) }
            placeholder="Select a group..."/>
        </div>
        <div className="col-span-1">
          <Input type="number" min="0" max={ user.authLevel } required
            value={ authLevel } onChange={ v => update({ authLevel: v }) }/>
        </div>
        <div className="col-span-1 flex justify-center">
          <Button type="submit" block disabled={ !canSubmit }>
            assign
          </Button>
        </div>
      </div>
    </form>
  </Border>
)
