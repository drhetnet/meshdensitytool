import React from 'react'
import ReactDOM from 'react-dom'
import { shallow, mount, render } from 'enzyme';
import AppUI from './AppUI'

it('renders without crashing', () => {
  const wrapper = shallow((
    <div>
      <canvas id='canvas'></canvas>
      <AppUI />
    </div>
  ))

  expect(wrapper.contains("<canvas id='canvas'></canvas>"));
})
