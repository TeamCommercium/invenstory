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

<div className='container'>
  <div className='row text-center'>
    <h2> </h2>
  </div>
</div>

<hr />

<div className='styles__instructions___2gKDE'>
  <h2>How It Works</h2>
</div>
<div className="container">
  <div className="row text-center">
    <div className="col-md-4">
      <div className='styles__instructionTitle___2oR7c'>
        Sign In With Your Amazon Account
      </div>
      <div className='col-md-10 col-md-offset-1'>
        <a id='amazonButton' href='/auth/amazon'>
          <img className='img-responsive center-block styles__amazonPrimeLogo___HELvx' src='./assets/amazon_logo.png' />
          <img className='img-responsive center-block' src='https://images-na.ssl-images-amazon.com/images/G/01/lwa/btnLWA_gold_312x64.png' />
        </a>
      </div>
    </div>
    <div className="col-md-4">
      <div className='styles__instructionTitle___2oR7c'>
        Add Products to Your Inventory
      </div>
      <div className='col-md-10 col-md-offset-1'>
        <img className='img-responsive center-block styles__boxShadow___g0vg-' src='./assets/add_products.png' />
      </div>
    </div>
    <div className="col-md-4">
      <div className='styles__instructionTitle___2oR7c'>
        Mark Products as Shipped When Ready To Sell
      </div>
      <div className='col-md-10 col-md-offset-1'>
        <img className='img-responsive center-block styles__boxShadow___g0vg-' src='./assets/ship_products.png' />
      </div>
    </div>
  </div>
</div>

<div className="container">
  <div className='row'>
    <div className='col-md-12 styles__footer___LPd_I'>
      <div className='row styles__footerOptions___3a1Gp'>
        <div className='text-right'>Team Commercium</div>
      </div>
    </div>
  </div>
</div>
</div>


