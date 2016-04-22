import React from 'react'
import { Link, browserHistory } from 'react-router'
import { AppBar, Button, Navigation, Input } from 'react-toolbox/lib/index.js'

import { redirect } from '../util/util.jsx'

export default (props) =>
<div>
  <Navigation className="loginBox" type='horizontal'>
    <Button label='Sign in with Amazon' onMouseUp={redirect('/home')} raised floating />
  </Navigation>
</div>

