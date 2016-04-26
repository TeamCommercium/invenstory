import React from 'react'
import { AppBar, Button, IconButton, Navigation } from 'react-toolbox'

import { redirect, logout } from '../util/util'

export default (props) => 
<div>
  <AppBar>
    <Navigation type='horizontal'>
      <Button label='Home' onMouseUp={redirect('/#/home')} raised primary />
      <Button label='Dashboard' onMouseUp={redirect('/#/dashboard')} raised primary />
      <Button label='Logout' onMouseUp={logout} raised primary />
      <IconButton className='stupidButton' primary><img style={{width: 35, height: 35}} src="http://i.imgur.com/pVDjxpB.png" /></IconButton>
    </Navigation>
  </AppBar>
</div>
