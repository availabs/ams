import amsManager from "./ams-manager"
import amsRedux from "./ams-redux"
import amsRouter from "./ams-router"
import amsLogin from "./ams-login"
import amsLogout from "./ams-logout"
import amsSignup from "./ams-signup"
import amsProjectManagement from "./ams-project-management"
import amsResetPassword from "./ams-reset-password"
import amsVerifyRequest from "./ams-verify-request"
import amsProfile from "./ams-profile"
import amsSetPassword from "./ams-set-password"
import amsVerifyEmail from "./ams-verify-email"
import amsAcceptInvite from "./ams-accept-invite"
import amsDirectory from "./ams-directory"
import amsUpdatePassword from "./ams-update-password"
import amsRequests from "./ams-requests"
import amsSendInvite from "./ams-send-invite"
import amsAssignToProject from "./ams-assign-to-project"
import amsCreateGroup from "./ams-create-group"

import withAmsApi from "./with-ams-api"

export { default as enableAuth } from "./enable-auth"
export { amsManager }

export default {
  "ams-manager": amsManager,
  "ams-redux": amsRedux,
  "ams-router": amsRouter,
  "ams-login": amsLogin,
  "ams-logout": amsLogout,
  "ams-signup": amsSignup,
  "ams-project-management": amsProjectManagement,
  "ams-reset-password": amsResetPassword,
  "ams-verify-request": amsVerifyRequest,
  "ams-profile": amsProfile,
  "ams-set-password": amsSetPassword,
  "ams-verify-email": amsVerifyEmail,
  "ams-accept-invite": amsAcceptInvite,
  "ams-directory": amsDirectory,
  "ams-update-password": amsUpdatePassword,
  "ams-requests": amsRequests,
  "ams-send-invite": amsSendInvite,
  "ams-assign-to-project": amsAssignToProject,
  "ams-create-group": amsCreateGroup,

  "with-ams-api": withAmsApi
}
