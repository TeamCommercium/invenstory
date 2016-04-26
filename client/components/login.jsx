import React from 'react'
import { Button, Navigation } from 'react-toolbox'

import { redirect } from '../util/util'       
 
export default (props)=>
<div>
  <img className="styles__titleImage___2BUYF" src="https://i.imgur.com/CQtx1y3.jpg" />
  <Navigation className="styles__loginBox___3xm-6" type='horizontal'>
    <Button label='Sign in' onMouseUp={redirect('/auth/amazon')} raised floating />
  </Navigation>
  {props.children}
</div>