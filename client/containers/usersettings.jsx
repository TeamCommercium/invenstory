import React from 'react'
import { Button } from 'react-toolbox'


export default class SettingsContainer extends React.Component{

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