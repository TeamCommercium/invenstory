import React from 'react';
import { Button } from 'react-toolbox';

import { redirect } from '../util/util';


const LoginComponent = () => (
  <div>
    <div className='styles__loginHeader___1efee'>
      <div className='styles__titleLogo___2hClh'>
        <img
          alt='lego_logo'
          className='styles__logoImgTitle___tQotd'
          src='./assets/lego_logo.png' />
        InvenStory
      </div>
      <div className='styles__loginBox___3xm-6'>
        <Button
          className='styles__loginButton___2G3Fy styles__neutral___3J4KA'
          label='Sign in' onMouseUp={redirect('/auth/amazon')}
          raised floating
        />
      </div>
    </div>

    <div className='container'>
      <div className='row text-center'>
        <h2> Track Your Amazon Inventory </h2>
        <div className='col-md-6 styles__productsTableCont___6ouhs'>
          <p>Up-to-date Amazon prices to help you decide when to list your products</p>
          <div className=''>
            <img
              alt='products_table'
              className='styles__productsTable___QHKgG img-responsive center-block styles__boxShadow___g0vg-'
              src='./assets/products_table.png'
            />
            <img
              alt='products_history'
              className='img-responsive center-block styles__boxShadow___g0vg-'
              src='./assets/products_history.png'
            />
          </div>
        </div>
        <div className='col-md-6'>
          <p>View charts showing current performance and value </p>
          <div className=''>
            <img
              alt='products_charts'
              className='img-responsive center-block styles__boxShadow___g0vg-'
              src='./assets/products_charts.png'
              />
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div className='styles__instructions___2gKDE'>
      <h2>How It Works</h2>
    </div>
    <div className="container">
      <div className="row text-center">
        <div className="col-md-4">
          <div className='col-md-10 col-md-offset-1 col-sm-6 col-sm-offset-3 col-xs-8 col-xs-offset-2'>
            <div className='styles__instructionTitle___2oR7c'>
              Sign In With Your Amazon Account
            </div>
            <a id='amazonButton' href='/auth/amazon'>
              <img
                alt='amazon_logo'
                className='img-responsive center-block styles__amazonPrimeLogo___HELvx'
                src='./assets/amazon_logo.png'
              />
              <img
                alt=''
                className='img-responsive center-block'
                src='https://images-na.ssl-images-amazon.com/images/G/01/lwa/btnLWA_gold_312x64.png'
              />
            </a>
          </div>
        </div>
        <div className="col-md-4">
          <div className='col-md-10 col-md-offset-1 col-xs-8 col-xs-offset-2 styles__addMargin___2E8Ad'>
            <div className='styles__instructionTitle___2oR7c'>
              Add Products to Your Inventory
            </div>
            <img
              alt='add_products'
              className='img-responsive center-block styles__boxShadow___g0vg-'
              src='./assets/add_products.png' />
          </div>
        </div>
        <div className="col-md-4">
          <div className='col-md-10 col-md-offset-1 col-xs-8 col-xs-offset-2 styles__addMargin___2E8Ad'>
            <div className='styles__instructionTitle___2oR7c'>
              Ship Products When Ready To Sell
            </div>
            <img
              alt='ship_products'
              className='img-responsive center-block styles__boxShadow___g0vg-'
              src='./assets/ship_products.png'
            />
          </div>
        </div>
      </div>
    </div>

    <div className="container">
      <div className='row'>
        <div className='col-md-12 styles__footer___LPd_I'>
          <div className='row styles__footerOptions___3a1Gp'>
            <div className='col-md-4 text-center'>
              <a href='https://github.com/TeamCommercium/invenstory'>
                <img
                  alt='GitHub_Logo'
                  className='styles__githubLogo___2ajiE'
                  src='./assets/GitHub_Logo.png'
                />
              </a>
            </div>
            <div className='col-md-4'></div>
            <div className='col-md-4 text-center styles__teamCommercium___1kRdu'>Team Commercium</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default LoginComponent;
