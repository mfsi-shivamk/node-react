import React from 'react';
import { shallow } from 'enzyme';

import Login from '../Component/Auth/Login';

describe('<Login />', () => {
	it('renders without crashing', () => {
		shallow(<Login />);
	});
});
