import React from 'react'
import { AppBar, Button, Navigation, Link } from 'react-toolbox/lib/index.js'

export default (props) => {
  return (
    <AppBar fixed flat>
      <Navigation type='vertical'>
        <a href="http://react-toolbox.com/#/components/navigation">
          <Button label='Toolbox docs' raised primary />
        </a>
      </Navigation>
    </AppBar>
  )
}
