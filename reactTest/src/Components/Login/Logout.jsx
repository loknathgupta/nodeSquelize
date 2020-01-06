import React, { Component } from "react";
import loginService from '../../Services/loginService';

export default class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message:'You will be logged out.'
		}
	}

	
	
	componentDidMount() {
		loginService.logout();
		this.props.history.push('/login');
		// console.log(props);
	}

	render() {		
		return (
			<div className="col-5">
				{this.state.message}
			</div>
		);
	}
}
