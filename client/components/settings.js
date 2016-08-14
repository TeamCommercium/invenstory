import React from 'react';
import { Button, Switch, Input } from 'react-toolbox';
import {
  USER_SETTINGS_UPDATE_EMAIL,
  USER_SETTINGS_UPDATE_ZIPCODE,
  USER_SETTINGS_UPDATE_NAME
} from '../actionTypes';

const UserSettingsComponent = ({
  name,
  email,
  zipcode,
  mailNotifications,
  err_email,
  handleInput,
  handleSubmit,
  handleToggle
}) => (
  <div>
    <Input
      type='text'
      label='Name'
      name='name'
      icon='account_box'
      value={name}
      onChange={(val) => handleInput(USER_SETTINGS_UPDATE_NAME, val)}
    />
    <Input
      type='number'
      label='Zipcode'
      name='zipcode'
      icon='place'
      value={zipcode}
      onChange={(val) => handleInput(USER_SETTINGS_UPDATE_ZIPCODE, val)}
    />
    <Input
      type='email'
      label='Email Address'
      name='email'
      value={email}
      error={err_email}
      icon='email'
      onChange={(val) => handleInput(USER_SETTINGS_UPDATE_EMAIL, val)}
    />
    <Switch
      checked={mailNotifications}
      label='Email Notifications'
      onChange={handleToggle}
    />
    <br />
    <Button
      label='Save'
      onMouseUp={() => handleSubmit(name, email, zipcode, mailNotifications)}
      raised floating
    />
  </div>
);

UserSettingsComponent.propTypes = {
  name: React.PropTypes.string,
  email: React.PropTypes.string,
  err_email: React.PropTypes.string,
  zipcode: React.PropTypes.number,
  mailNotifications: React.PropTypes.bool,
  handleSubmit: React.PropTypes.func,
  handleInput: React.PropTypes.func,
  handleToggle: React.PropTypes.func
};

export default UserSettingsComponent;
