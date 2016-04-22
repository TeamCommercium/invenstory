import React from 'react'
import NavbarContainer from './navbar.jsx'
import InvenTable from '../components/dashboard.jsx'
export default (props) =>
<div>
  <NavbarContainer />
  <div>Dashboard</div>
  <InvenTable data={[1,2,3,4,5,6,7,8,9,10]}/>
  {props.children}
</div>