import React, { useContext } from "react";
import profileWrapper from "../wrappers/ams-profile";

import updatePasswordWrapper from "../wrappers/ams-update-password"

import {
  ThemeContext,
} from "~/modules/avl-components/src";

export default profileWrapper((props) => {
  return <DefaultProfileComponent {...props} />;
});

const newPassWrap = updatePasswordWrapper((props) => {
  return <SetPasswordForm
    {...props}
  />
})

const DefaultProfileComponent = (props) => {
  const { user } = props;
  const myTheme = useContext(ThemeContext);

  return (
    <div className={`${myTheme.background ?? 'bg-grey-100'} h-full flex flex-wrap py-12 sm:px-6 lg:px-8 gap-3`}>
      <div className="w-full">
        <h2 className="text-xl font-medium text-gray-900">Welcome</h2>
        <p className="text-lg font-thin text-gray-600">
          <span
            href="#"
            className="font-thin text-blue-400 hover:text-blue-500"
          >
            Hello {user.email}!
          </span>
        </p>
      </div>
      <ProfileTile title="Personal Info" tileWidth="sm:max-w-lg"></ProfileTile>
      <ProfileTile title="Update Password" tileWidth="sm:max-w-lg">
        {newPassWrap(props)}
      </ProfileTile>
    </div>
  );
};

const ProfileTile = ({ children, title = "", tileWidth = "sm:max-w-md" }) => {
  const myTheme = useContext(ThemeContext);
  
  return (
  <div className={`mt-8 sm:w-full ${tileWidth}`}>
    <div className={`${myTheme.tile ?? 'bg-white py-8 px-4 shadow-lg sm:rounded-md sm:px-10'}  h-[400px]`}>
      <div className="sm:w-full sm:max-w-md  border-gray-200">
        <h2 className="text-xl font-medium text-gray-900 mb-2">{title}</h2>
        {children}
      </div>
    </div>
  </div>
)};

const SetPasswordForm = ({
  handleSubmit,
  update,
  canSubmit,
  password,
  verify,
  current
}) =>  {
  const myTheme = useContext(ThemeContext);
  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="pt-4">
        <label htmlFor="email" className="block text-sm font-thin text-gray-700">
          Current Password
        </label>
        <div className="mt-1">
          <input
            id="current"
            name="current"
            type="password"
            value={current}
            onChange={(e) => update({ current: e.target.value })}
            autoComplete="Current password"
            placeholder="Enter your current password"
            required
            className="appearance-none block w-full px-3 py-2 border-b border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-thin text-gray-700"
        >
          New Password
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => update({ password: e.target.value })}
            autoComplete="New password"
            placeholder="New password"
            required
            className="appearance-none block w-full px-3 py-2 border-b border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="verify"
          className="block text-sm font-thin text-gray-700"
        >
          Confirm New Password
        </label>
        <div className="mt-1">
          <input
            id="verify"
            name="verify"
            type="password"
            value={verify}
            onChange={(e) => update({ verify: e.target.value })}
            autoComplete="Confirm new password"
            placeholder="Confirm new password"
            required
            className="appearance-none block w-full px-3 py-2 border-b border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
      <div>
        <button
          type="submit"
          disabled={!canSubmit}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            !canSubmit
              ? `${myTheme.button.default ?? 'bg-blue-100'} hover:bg-blue-200`
              : `${myTheme.button.default ?? 'bg-blue-600'}  hover:bg-blue-700`
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        >
          Set Password
        </button>
      </div>
    </form>
  )
};

// export default ({
//   type: AmsProfile,
//   props: { amsAction: "profile", authLevel: 0 },
//   wrappers: ["ams-profile"],
//   // children: [
//   //   { type: "ams-update-password" },
//   //   { type: "ams-messages" }
//   // ]
// })
