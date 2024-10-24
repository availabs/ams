import AmsLogin from "./ams-login"
import AmsLogout from "./ams-logout"
import AmsProjectManagement from "./ams-project-management"
import AmsSignup from "./ams-signup"
import AmsResetPassword from "./ams-reset-password"
import AmsVerifyRequest from "./ams-verify-request"
import AmsProfile from "./ams-profile"
import AmsVerifyEmail from "./ams-verify-email"
import AmsSetPassword from "./ams-set-password"
import AmsAcceptInvite from "./ams-accept-invite"
import AmsDirectory from "./ams-directory"
import AmsUpdatePassword from "./ams-update-password"
import AmsRequests from "./ams-requests"
import AmsSendInvite from "./ams-send-invite"
import AmsUserSearch from "./ams-user-search"
import AmsAssignToProject from "./ams-assign-to-project"
import AmsCreateGroup from "./ams-create-group"
import AmsGroupsInProject from "./ams-groups-in-project"
import AmsUserPreferences from "./ams-user-preferences"
import AmsSlackPreferences from "./ams-slack-preferences"
import AmsMessages from "./ams-messages"
import AmsEmailPreferences from "./ams-email-preferences"
import AmsUsers from "./ams-users";
import AmsDefault from './ams-default'

function InvalidConfig ({config}) {
  return (
    <div> Invalid DMS Config : 
      <pre style={{background: '#dedede'}}>
        {JSON.stringify(config,null,3)} 
      </pre>
    </div>
  )
}

function NoRouteMatch ({path}) {
  return (
    <div> These aren't the droids you are looking for 
      <div className='text-5xl'>
        404
      </div>
      <div>/{path}</div>
    </div>
  )
}


export default {
  "ams-login": AmsLogin,
  "ams-logout": AmsLogout,
  "ams-project-management": AmsProjectManagement,
  "ams-signup": AmsSignup,
  "ams-reset-password": AmsResetPassword,
  "ams-verify-request": AmsVerifyRequest,
  "ams-profile": AmsProfile,
  "ams-verify-email": AmsVerifyEmail,
  "ams-set-password": AmsSetPassword,
  "ams-accept-invite": AmsAcceptInvite,
  "ams-directory": AmsDirectory,
  "ams-update-password": AmsUpdatePassword,
  "ams-requests": AmsRequests,
  "ams-send-invite": AmsSendInvite,
  "ams-user-search": AmsUserSearch,
  "ams-assign-to-project": AmsAssignToProject,
  "ams-create-group": AmsCreateGroup,
  "ams-groups-in-project": AmsGroupsInProject,
  "ams-user-preferences": AmsUserPreferences,
  "ams-slack-preferences": AmsSlackPreferences,
  "ams-messages": AmsMessages,
  "ams-email-preferences": AmsEmailPreferences,
  "ams-users": AmsUsers,
  "ams-default": AmsDefault,
  InvalidConfig,
  NoRouteMatch 
}
