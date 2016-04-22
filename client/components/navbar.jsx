import React from 'react'
import { Link, browserHistory } from 'react-router'
import { AppBar, Button, Navigation } from 'react-toolbox/lib/index.js'

import { hardRedirect, redirect } from '../util/util.jsx'

export default (props) => 
<div>
  <AppBar>
    <Navigation type='horizontal'>
      <Button label='Toolbox' onMouseUp={hardRedirect("http://react-toolbox.com/#/components/navigation")} raised primary />
      <Button label='Home' onMouseUp={redirect('/home')} raised primary />
      <Button label='Dashboard' onMouseUp={redirect('/dashboard')} raised primary />
    </Navigation>
  </AppBar>
</div>

