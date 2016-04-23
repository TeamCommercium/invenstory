import React from 'react'
import { AppBar, Button, Navigation, Input } from 'react-toolbox'

import { redirect } from '../util/util'

export default (props) =>
<div>
  <img className="styles__titleImage___2BUYF" src="https://i.imgur.com/CQtx1y3.jpg" />
  <Navigation className="styles__loginBox___3xm-6" type='horizontal'>
    <Button label='Sign in' onMouseUp={redirect('/home')} raised floating />
  </Navigation>
</div>
