import React, { useContext } from "react";
import profileWrapper from "../wrappers/ams-profile";

import updatePasswordWrapper from "../wrappers/ams-update-password"
import userPreferencesWrapper from "../wrappers/ams-user-preferences"
import { Button, Input } from '~/modules/avl-components/src'

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

const userPreferencesWrap = userPreferencesWrapper((props) => {
  return <UserPreferencesForm
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
      <ProfileTile title="Personal Info" tileWidth="sm:max-w-lg">
        {userPreferencesWrap(props)}
      </ProfileTile>
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
    <div className={`${myTheme.tile ?? 'bg-white py-8 px-4 shadow-lg sm:rounded-md sm:px-10'}  min-height-[400px]`}>
      <div className="sm:w-full sm:max-w-md  border-gray-200">
        <h2 className="text-xl font-medium text-gray-900 mb-2">{title}</h2>
        {children}
      </div>
    </div>
  </div>
)};

const UserPreferencesForm = (props) => {
  const { preferences, setNewPreferences, updateDisabled, updatePreferences } =
    props;

  const PREFERENCES_CONFIG = {
    display_name: {
      name: "Display Name:",
      type: 'text'
    },
    phone: {
      name: "Phone:",
      type: 'text'
    },
    maxRecent: {
      name: "Max # of recent activities on Dashboard:",
      type: 'number'
    },
    maxExpanded: {
      name: "Max # of recent activities when expanded",
      type: 'number'
    },
    maxSnapshots: {
      name: "Max # of snapshots on Dashboard",
      type: 'number'
    },
  };

  return (
    <div className="space-y-6">
      {Object.keys(PREFERENCES_CONFIG).map((preferenceKey) => {
        const preferenceConfg = PREFERENCES_CONFIG[preferenceKey];
        return (
          <InputContainer
            key={`${preferenceKey}_preferences_form`}
            header={preferenceConfg.name}
            input={
              <Input
                type={preferenceConfg.type}
                value={preferences[preferenceKey]}
                placeholder=""
                onChange={(e) =>
                  setNewPreferences({ ...preferences, [preferenceKey]: e })
                }
              />
            }
          />
        );
      })}
      <div>
        <Button
          type="submit"
          disabled={updateDisabled}
          themeOptions={{ width: "full" }}
          onClick={updatePreferences}
        >
          Save changes
        </Button>
      </div>
    </div>
  );
};

const SetPasswordForm = ({
  handleSubmit,
  update,
  canSubmit,
  password,
  verify,
  current
}) =>  {
  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className="block text-xs text-gray-700">
          Current Password
        </label>
        <div className="mt-1 grid">
          <Input
            id="current"
            name="current"
            type="password"
            value={current}
            onChange={(e) => update({ current: e.target.value })}
            autoComplete="Current password"
            placeholder="Enter your current password"
            required
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-xs text-gray-700"
        >
          New Password
        </label>
        <div className="mt-1 grid">
          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => update({ password: e.target.value })}
            autoComplete="New password"
            placeholder="New password"
            required
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="verify"
          className="block text-xs text-gray-700"
        >
          Confirm New Password
        </label>
        <div className="mt-1 grid">
          <Input
            id="verify"
            name="verify"
            type="password"
            value={verify}
            onChange={(e) => update({ verify: e.target.value })}
            autoComplete="Confirm new password"
            placeholder="Confirm new password"
            required
          />
        </div>
      </div>
      <div>
        <Button
          type="submit"
          disabled={!canSubmit}
          themeOptions={{width:'full'}}
        >
          Set Password
        </Button>
      </div>
    </form>
  )
};

const InputContainer = ({header, input}) => (
    <div className="flex flex-col">
      <div className="flex px-2 pb-1 text-xs text-gray-700 capitalize">
        {header}
      </div>
      <div className="grid pl-1">
        {input}
      </div>
    </div>
);
