import React from 'react'
import { Button, Navigation } from 'react-toolbox'      
 
import { redirect } from '../util/util'

/*
  This container is very minimal and there is a case to be made for it being a component.
  The reason it is currently a container is that it requires redirect instead of having it passed in and 
  I don't want the navbar to show when the user sees the login field I am using a separate route for it.
 */

export default () =>
<div>
  <img className="styles__titleImage___2BUYF" src="https://i.imgur.com/CQtx1y3.jpg" />
  <Navigation className="styles__loginBox___3xm-6" type='horizontal'>
    <Button label='Sign in' onMouseUp={redirect('/auth/amazon')} raised floating />
  </Navigation>
</div>
