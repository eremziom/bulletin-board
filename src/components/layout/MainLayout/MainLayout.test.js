import React from 'react';
import {shallow} from 'enzyme';
import {MainLayoutComponent} from './MainLayout';

describe('Component Mainlayout', () => {
  it('should render without crashing', () => {
    const component = shallow(<MainLayoutComponent />);
    expect(component).toBeTruthy();
  });
});
