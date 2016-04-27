import React from 'react'
import { AppBar, Button, IconButton, Navigation } from 'react-toolbox'

import { redirect, logout } from '../util/util'

export default (props) => 
<div>
  <AppBar>
    <Navigation className='styles__navbar___VdiD-' type='horizontal'>
      <Button label='Home' onMouseUp={redirect('/#/home')} raised primary />
      <Button label='Dashboard' onMouseUp={redirect('/#/dashboard')} raised primary />
      <IconButton className='styles__settingButton___MrjY-' primary><img style={{width: 35, height: 35}} src="http://i.imgur.com/pVDjxpB.png" /></IconButton>
      <Button className='styles__logout___3o2E6' label='Logout' onMouseUp={logout} raised primary />
    </Navigation>
  </AppBar>
</div>
