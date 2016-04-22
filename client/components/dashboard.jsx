import React from 'react'
import { Link, browserHistory } from 'react-router'
import { AppBar, Button, Navigation, Input } from 'react-toolbox/lib/index.js'
import Table from 'react-toolbox/lib/table';
import { redirect } from '../util/util.jsx'

export default (props) =>
<table>
  <tbody>
    <tr>
      <th>one</th>
      <th>two</th>
      <th>three</th>
      <th>four</th>
      <th>five</th>
      <th>six</th>
      <th>seven</th>
    </tr>
   {props.data.map( (cur, ind) =>
    <tr key={ind} className={ind%2===0?'styles__even___2vvjc':'styles__odd___3AkYs'}>
      <td>one</td>
      <td>two</td>
      <td>three</td>
      <td>four</td>
      <td>five</td>
      <td>six</td>
      <td>seven</td>
    </tr>
   )}
  </tbody>
</table>
