import React from 'react'
import { mount, render, shallow } from 'enzyme'
import chaiEnzyme from 'chai-enzyme'
import chai, { expect } from 'chai'
import { spy } from 'sinon'
import { List } from 'react-toolbox'
import {LineChart} from 'rd3'

import HomeContainer from '../../containers/home.jsx'
import NavbarContainer from '../../containers/navbar.jsx'
import Home from '../../components/navbar'

chai.use(chaiEnzyme())

const wrapper = shallow(<HomeContainer />) // mount/render/shallow when applicable
console.log(Object.keys(wrapper), "node stuff", wrapper.nodes[0].props)
describe('Client: containers/navbarSpec.jsx', function () {
  it('Should contain the Navbar component', function () {
    expect(wrapper).to.contain(<NavbarContainer/>)
  });
  // it('Should contain the LineChart component', function () {
  //   expect(wrapper).to.contain(<LineChart/>)
  // });
  // it('Should contain the List component', function () {
  //   expect(wrapper).to.contain(<List/>)
  // });
});
