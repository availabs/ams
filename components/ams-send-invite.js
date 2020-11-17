import React from "react"

import { Button, Input, Select } from "@availabs/avl-components"

import Border from "./components/Border"

import wrapper from "../wrappers/ams-send-invite"

export default wrapper(({ email, verify, group, update, canSubmit, handleSubmit, groups }) =>
  <Border>
    <div className="grid grid-cols-10 gap-1 font-bold border-b-2 mb-1">
      <div className="col-span-3 text-xl">
        Send Invite
      </div>
      <div className="col-span-3 flex items-end">
        Verify Email
      </div>
      <div className="col-span-3 flex items-end">
        Assign to Group
      </div>
      <div className="col-span-1 flex items-end">
      </div>
    </div>
    <form onSubmit={ handleSubmit }>
      <div className="grid grid-cols-10 gap-1 mb-2">
        <div className="col-span-3">
          <Input placeholder="Enter user email..." type="email"
            onChange={ v => update({ email: v }) } value={ email }/>
        </div>
        <div className="col-span-3">
          <Input placeholder="Verify user email..." type="email"
            onChange={ v => update({ verify: v }) } value={ verify }/>
        </div>
        <div className="col-span-3">
          <Select domain={ groups } multi={ false }
            accessor={ g => g.name } placeholder="Select a group..."
            listAccessor={ g => `${g.name} (auth level ${ g.authLevel })` }
            onChange={ v => update({ group: v }) } value={ group }/>
        </div>
        <div className="col-span-1">
          <Button block type="submit" disabled={ !canSubmit }>
            send
          </Button>
        </div>
      </div>
    </form>
  </Border>
)
