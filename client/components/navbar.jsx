import React from 'react'
import { AppBar, Button, Navigation, Link } from 'react-toolbox/lib/index.js'

export default class App extends React.Component{
  render(){
    return (
      <AppBar fixed flat>
        <a href="http://react-toolbox.com/#/components/navigation">React Toolbox Docs</a>
        <Navigation type='vertical'>
          <Button icon='bookmark' label='Bookmark' raised primary />
        </Navigation>
      </AppBar>
    )
  }
}
