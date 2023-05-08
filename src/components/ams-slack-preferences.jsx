import React from "react"

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
            <div>todo fix</div>
            {/*<BooleanInput value={ newPreferences.receiveSlack } onChange={ setNewPreferences }/>*/}
          </div>

          { !newPreferences.receiveSlack ? null :
            <>
              <div>
                <label htmlFor="slackEmail" className="block font-bold">Slack Email</label>
                <input type="email" id="slackEmail"
                  placeholder="Enter your slack email..."
                  onChange={ e => setSlackEmail(e.target.value) }
                  value={ slackEmail }/>
              </div>

              <button 
                onClick={ getSlackUserFromEmail }
                disabled={ !slackEmail }>
                check slack email
              </button>

            </>
          }

        </div>

        { !(preferences.slackUserId && newPreferences.receiveSlack) ? null :
          <div>
            <label className="block font-bold">Slack User ID</label>
            <input readOnly value={ preferences.slackUserId }/>
          </div>
        }

        <button
          onClick={ updateSlackPreferences }
          disabled={ updateDisabled }>
          update preferences
        </button>

      </div>
    </Container>
  )
}
const slackPreferences = {
  type: SlackPreferences,
  wrappers: ["show-loading", "ams-slack-preferences"]
}
export default slackPreferences;
