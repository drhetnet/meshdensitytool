import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import AppStats from './AppStats'

it('renders without crashing', () => {
  const wrapper = shallow((
    <div>
      <AppStats />
    </div>
  ))
})
