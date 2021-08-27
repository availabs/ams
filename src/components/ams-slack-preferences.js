import React from "react"

import { Button, Input, BooleanInput  } from "@availabs/avl-components"

import Container from "./components/Container"

const SlackPreferences = props => {

  const {
    newPreferences, setNewPreferences,
    slackEmail, setSlackEmail,
    getSlackUserFromEmail,
    updateSlackPreferences,
    updateDisabled,
    preferences
  } = props;

  return (
    <Container Title="Slack Preferences">
      <div className="grid grid-cols-1 gap-y-3">

        <div className="grid grid-cols-1 gap-y-3">

          <div>
            <label className="block font-bold">Send Messages to Slack</label>
            <BooleanInput value={ newPreferences.receiveSlack } onChange={ setNewPreferences }/>
          </div>

          { !newPreferences.receiveSlack ? null :
            <>
              <div>
                <label htmlFor="slackEmail" className="block font-bold">Slack Email</label>
                <Input type="email" id="slackEmail"
                  placeholder="Enter your slack email..."
                  onChange={ setSlackEmail }
                  value={ slackEmail }/>
              </div>

              <Button buttonTheme="buttonLargeInfoBlock"
                onClick={ getSlackUserFromEmail }
                disabled={ !slackEmail }>
                check slack email
              </Button>

            </>
          }

        </div>

        { !(preferences.slackUserId && newPreferences.receiveSlack) ? null :
          <div>
            <label className="block font-bold">Slack User ID</label>
            <Input readOnly value={ preferences.slackUserId }/>
          </div>
        }

        <Button buttonTheme="buttonLargePrimaryBlock"
          onClick={ updateSlackPreferences }
          disabled={ updateDisabled }>
          update preferences
        </Button>

      </div>
    </Container>
  )
}
const slackPreferences = {
  type: SlackPreferences,
  wrappers: ["show-loading", "ams-slack-preferences"]
}
export default slackPreferences;
