import React from 'react'
import { mount, render, shallow } from 'enzyme'
import chaiEnzyme from 'chai-enzyme'
import chai, { expect } from 'chai'
import { spy } from 'sinon'

import NavbarContainer from '../../containers/navbar.jsx'
import Navbar from '../../components/navbar'

chai.use(chaiEnzyme())

const wrapper = shallow(<NavbarContainer />) // mount/render/shallow when applicable
console.log(Object.keys(wrapper), "node stuff", wrapper.nodes[0].props)
describe('Client: containers/navbarSpec.jsx', function () {
  it('Should contain the Navbar component', function () {
    expect(wrapper).to.contain(<Navbar/>)
  });
});
