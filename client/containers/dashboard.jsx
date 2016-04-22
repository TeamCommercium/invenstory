import React from 'react'
import NavbarContainer from '../containers/navbar.jsx'
export default (props) =>
<div>
  <NavbarContainer />
  <div>Dashboard</div>
  {props.children}
</div>
