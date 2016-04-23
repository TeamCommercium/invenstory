import React from 'react'
import { Link, browserHistory } from 'react-router'
import { AppBar, Button, IconButton, Navigation } from 'react-toolbox'

import { hardRedirect, redirect } from '../util/util.jsx'

export default (props) => 
<div>
  <AppBar>
    <Navigation type='horizontal'>
      <Button label='Toolbox' onMouseUp={hardRedirect("http://react-toolbox.com/#/components/navigation")} raised primary />
      <Button label='Home' onMouseUp={redirect('/home')} raised primary />
      <Button label='Dashboard' onMouseUp={redirect('/dashboard')} raised primary />
      <IconButton primary><img style={{width: 30, height: 30}}src="https://cdn3.iconfinder.com/data/icons/fez/512/FEZ-04-128.png" /></IconButton>
    </Navigation>
  </AppBar>
</div>
