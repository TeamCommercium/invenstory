import React from 'react'
import { AppBar, Button, Navigation } from 'react-toolbox/lib/index.js'

export default (props) => {
  return (
    <AppBar fixed flat>
      <Navigation type='vertical'>
        <Button label='Toolbox docs' href="http://react-toolbox.com/#/components/navigation" raised primary />
        <Button label='Home' onMouseUp={props.redirect} raised primary />
      </Navigation>
    </AppBar>
  )
}
