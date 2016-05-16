import React from 'react'
import Settings from '../components/settings'
import { subscribeTo, simpleValidateEmail } from '../util/util'
import { getUserInfo, updateUserInfo } from '../util/requests'
import { store } from '../store/initStore'

let mounted = false;

 let backlog = {
   userSettings: {
     pending: false,
     payload: {}
   }
};

export default class SettingsContainer extends React.Component{

  constructor(props){
    super(props)

    this.state = {
      name: '',
      email: '',
      zipcode: '',
      mailNotifications: false,
      err_email: ''
    }
  }

  componentDidMount(){
    let that = this
    getUserInfo()
      .then(function(response){
        that.setState({ "name": response[0].amzn_username })
        that.setState({ "email": response[0].amzn_email })
        that.setState({ "zipcode": response[0].amzn_zip })
        if(!!response[0].emailNotify)
          that.setState({ "mailNotifications": true})
      })

  }


  handleSubmit(){
    let settingError = 0
    if(!simpleValidateEmail(this.state.email)) {
      this.setState({err_email: "Must be valid email address"});
      settingError++
    }

    if (!settingError) {
      let userInfo = {}
      userInfo.amzn_username = this.state.name
      userInfo.amzn_email = this.state.email
      userInfo.amzn_zip = this.state.zipcode
      userInfo.emailNotify = this.state.mailNotifications
      updateUserInfo(userInfo)
    }
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
        err_email={this.state.err_email}
      />
    </div>
  }

}