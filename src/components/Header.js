import { Component } from 'react';

export default class Header extends Component {
	static navigationOptions = {
		header : () => {
			false;
		}
	}
}