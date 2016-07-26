import React from 'react';
import { Button, Switch, Input } from 'react-toolbox';

const UserSettingsComponent = (props) => (
  <div>
    <Input
      type='text'
      label='Name'
      name='name'
      icon='account_box'
      value={props.name}
      onChange={props.handleInput.bind(this, 'name')}
    />
    <Input
      type='text'
      label='Zipcode'
      name='zipcode'
      icon='place'
      value={props.zipcode}
      onChange={props.handleInput.bind(this, 'zipcode')}
    />
    <Input
      type='email'
      label='Email Address'
      name='email'
      value={props.email}
      error={props.err_email}
      icon='email'
      onChange={props.handleInput.bind(this, 'email')}
    />
    <Switch
      checked={props.mailNotifications}
      label='Email Notifications'
      onChange={props.handleToggle}
    />
    <br />
    <Button
      label='Save'
      onMouseUp={props.handleSubmit.bind(this)}
      raised floating
    />
  </div>
);

UserSettingsComponent.propTypes = {
  name: React.PropTypes.string,
  email: React.PropTypes.string,
  err_email: React.PropTypes.string,
  zipcode: React.PropTypes.string,
  mailNotifications: React.PropTypes.bool,
  handleSubmit: React.PropTypes.func,
  handleInput: React.PropTypes.func,
  handleToggle: React.PropTypes.func
};

export default UserSettingsComponent;
