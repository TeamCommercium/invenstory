// import React from 'react'
// import {mount, render, shallow} from 'enzyme'
// import chaiEnzyme from 'chai-enzyme'
// import { expect } from 'chai'
// import { spy } from 'sinon'

// chai.use(chaiEnzyme())

// describe('Client: store/initialState.jsx', function () {
//   it('should export an object', function () {
//     expect(initialState).to.exist;
//     expect(typeof initialState).to.equal("object")
//   });
// });



// class Fixture extends React.Component {
//   render () {
//     return (
//       <div>
//         <input id='checked' defaultChecked />
//         <input id='not' defaultChecked={false} />
//       </div>
//     )
//   }
// }

// const wrapper = mount(<Fixture />) // mount/render/shallow when applicable

// expect(wrapper.find('#checked')).to.be.checked()
// expect(wrapper.find('#not')).to.not.be.checked()