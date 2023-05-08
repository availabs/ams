import React from "react"

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
          {/*<BooleanInput value={ newPreferences.receiveEmail } onChange={ setNewPreferences }/>*/}
        </div>

        <button
          onClick={ updateEmailPreferences }
          disabled={ updateDisabled }>
          update preferences
        </button>

      </div>
    </Container>
  )
}
const emailPreferences = {
  type: AmsEmailPreferences,
  wrappers: ["ams-email-preferences"]
}
export default emailPreferences;