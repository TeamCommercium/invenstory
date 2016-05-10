import React from 'react'
import { Button } from 'react-toolbox'
import Settings from '../components/settings'
import { subscribeTo } from '../util/util'

export default class SettingsContainer extends React.Component{

  constructor(props){
    super(props)
    let userSettings = store.getState().userSettings
    
    
    this.state = {
      name: userSettings[0].name,
      email: userSettings[0].email,
      zipcode: userSettings[0].zipcode,
      mailNotifications: false
    }
    subscribeTo('userSettings', function(newState){

    })
  }

  handleSubmit(){

  }

  handleInput(name, value){
    this.setState({[name]: value});
  }

  handleToggle() {
    this.setState({mailNotifications: !this.state.mailNotifications})
  }

  render() {
    return <div>
      <Settings
        name={this.state.name}
        email={this.state.email}
        zipcode={this.state.zipcode}
        mailNotifications={this.state.mailNotifications} 
        handleInput={this.handleInput.bind(this)}
        handleSubmit={this.handleSubmit.bind(this)}
        handleToggle={this.handleToggle.bind(this)}
      />
    </div>
  }

}