import React from "react"

import { Button, Input } from "@availabs/avl-components"

import Container from "./components/Container"

import wrapper from "../wrappers/ams-verify-request"

export default wrapper(({ password, verify, update, canSubmit, handleSubmit, ...props }) =>
  <div className="h-full flex-1 flex items-center justify-center">
    <Container title="Verify Request">
      <form onSubmit={ handleSubmit }>
        <div className="my-2">
          <label htmlFor="password" className="block font-bold">Password</label>
          <Input type="password" id="password" required autoFocus value={ password }
            onChange={ v => update({ password: v }) }/>
        </div>
        <div className="my-2">
          <label htmlFor="verify" className="block font-bold">Verify Password</label>
          <Input type="password" id="verify" required value={ verify }
            onChange={ v => update({ verify: v }) }/>
        </div>
        <div className="my-2">
          <Button disabled={ !canSubmit } type="submit"
            buttonTheme="buttonPrimaryLargeBlock">
            verify
          </Button>
        </div>
      </form>
    </Container>
  </div>
)
