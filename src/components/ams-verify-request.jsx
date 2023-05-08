import React from "react"


import Container from "./components/Container"

import wrapper from "../wrappers/ams-verify-request"

export default wrapper(({ password, verify, update, canSubmit, handleSubmit, ...props }) =>
  <div className="h-full flex-1 flex items-center justify-center">
    <Container Title="Verify Request">
      <form onSubmit={ handleSubmit }>
        <div className="my-2">
          <label htmlFor="password" className="block font-bold">Password</label>
          <input type="password" id="password" required autoFocus value={ password }
            onChange={ v => update({ password: v.target.value }) }/>
        </div>
        <div className="my-2">
          <label htmlFor="verify" className="block font-bold">Verify Password</label>
          <input type="password" id="verify" required value={ verify }
            onChange={ v => update({ verify: v.target.value }) }/>
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
