import React from "react"

import Container from "./components/Container"

import wrapper from "../wrappers/ams-accept-invite"

export default wrapper(({ password, verify, update, canSubmit, handleSubmit }) =>
  <div className="h-full flex-1 flex items-center justify-center">
    <Container Title="Accept Invite">
      <form onSubmit={ handleSubmit }>
        <div className="my-2">
          <label htmlFor="password" className="block font-bold">Password</label>
          <input type="password" id="password" value={ password } autoFocus
            onChange={ v => update({ password: v.target.value }) }/>
        </div>
        <div className="my-2">
          <label htmlFor="verify" className="block font-bold">Verify Password</label>
          <input type="password" id="verify" value={ verify }
            onChange={ v => update({ verify: v.target.value }) }/>
        </div>
        <div className="my-2">
          <button type="submit" buttonTheme="buttonLargePrimaryBlock"
            disabled={ !canSubmit }>
            accept
          </button>
        </div>
      </form>
    </Container>
  </div>
)
