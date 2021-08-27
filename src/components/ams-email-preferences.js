import React from "react"

import { Button, BooleanInput  } from "@availabs/avl-components"

import Container from "./components/Container"

const AmsEmailPreferences = ({ newPreferences,
                                setNewPreferences,
                                updateDisabled,
                                updateEmailPreferences, ...props }) => {
  return (
    <Container Title="Email Preferences">
      <div className="grid grid-cols-1 gap-y-3">

        <div>
          <label className="block font-bold">Send Messages to Email</label>
          <BooleanInput value={ newPreferences.receiveEmail } onChange={ setNewPreferences }/>
        </div>

        <Button buttonTheme="buttonLargePrimaryBlock"
          onClick={ updateEmailPreferences }
          disabled={ updateDisabled }>
          update preferences
        </Button>

      </div>
    </Container>
  )
}
const emailPreferences = {
  type: AmsEmailPreferences,
  wrappers: ["ams-email-preferences"]
}
export default emailPreferences;
