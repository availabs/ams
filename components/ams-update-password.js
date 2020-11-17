import React from "react"

import { Button, Input } from "@availabs/avl-components"

import Container from "./components/Container"

import wrapper from "../wrappers/ams-update-password"

export default wrapper(({ current, password, verify, update, canSubmit, handleSubmit }) =>
  <Container title="Update Password">
    <form onSubmit={ handleSubmit }>
      <div className="my-2">
        <label htmlFor="current" className="block font-bold">Current Password</label>
        <Input type="password" id="current" value={ current } autoFocus
          onChange={ v => update({ current: v }) }/>
      </div>
      <div className="my-2">
        <label htmlFor="password" className="block font-bold">New Password</label>
        <Input type="password" id="password" value={ password }
          onChange={ v => update({  password: v }) }/>
      </div>
      <div className="my-2">
        <label htmlFor="verify" className="block font-bold">Verify Password</label>
        <Input type="password" id="verify" value={ verify }
          onChange={ v => update({ verify: v }) }/>
      </div>
      <div className="my-2">
        <Button type="submit" buttonTheme="buttonLargePrimaryBlock"
          disabled={ !canSubmit }>
          update
        </Button>
      </div>
    </form>
  </Container>
)
