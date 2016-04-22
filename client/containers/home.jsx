import React from 'react'
import NavbarContainer from '../containers/navbar.jsx'
export default (props) =>
<div>
  <NavbarContainer />
  {props.children}
  <h1> D3 things </h1>
  <h1>Notification things </h1>
</div>