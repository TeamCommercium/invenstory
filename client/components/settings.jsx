import React from 'react'
import { Button, AutoComplete, Switch, Input } from 'react-toolbox'


export default (props) => <div>
  <Input 
    type='text' 
    label='Name' name='name'
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
    name='email' value={props.email}
    error={props.err_email}
    icon='email'
    onChange={props.handleInput.bind(this, 'email')} 
  />
  {
  /*
  <Switch 
    checked={props.mailNotifications}
    label='Email Notifications'
    onChange={props.handleToggle}
  />
  */
  }
  <br></br>
  <Button
    className=""
    label='Save' raised floating
    onMouseUp={props.handleSubmit.bind(this)}
  />
  </div>