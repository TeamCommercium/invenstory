import React from 'react'
import { Button, Navigation } from 'react-toolbox'

import { redirect } from '../util/util'

/*
  This container is very minimal and there is a case to be made for it being a component.
  The reason it is currently a container is that it requires redirect instead of having it passed in and
  I don't want the navbar to show when the user sees the login field so I am using a separate route for it.
 */

export default () =><div>
<div className='styles__loginHeader___1efee'>
  <div className='styles__titleLogo___2hClh'>
    <img className='styles__logoImgTitle___tQotd' src='./assets/lego_logo.png'/>
    InvenStory
  </div>
  <div className='styles__loginBox___3xm-6'>
    <Button className='styles__loginButton___2G3Fy styles__neutral___3J4KA' label='Sign in' onMouseUp={redirect('/auth/amazon')} raised floating />
  </div>
</div>
<div className='styles__instructions___2gKDE'>
  <h2>How It Works</h2>
</div>
<div className="container">
  <div className="row text-center">
    <div className="col-md-4">
      Sign In With Your Amazon Account
      <div className='col-md-10 col-md-offset-1'>
        <a id='amazonButton' href='/auth/amazon'>
          <img className='img-responsive center-block' src='https://images-na.ssl-images-amazon.com/images/G/01/lwa/btnLWA_gold_312x64.png' />
        </a>
      </div>
    </div>
    <div className="col-md-4">
      Add Products to Your Inventory
    </div>
    <div className="col-md-4">
    Mark Products as Shipped When Ready To Sell
    </div>
  </div>

</div>
</div>