import React from 'react'
import { Button } from 'react-toolbox'
import { subscribeTo } from '../util/util'

export default class SettingsContainer extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      userSettings: store.getState().userSettings
    }
    subscribeTo('userSettings', function(newState){

    })
  }

  render() {
    return <div>
      <Button
        className=""
        label='Save' raised floating
      />
      <Button
        className=""
        label='Cancel' raised floating
      />
    </div>
  }

}