import React, { Component } from "react";
import {config, axiosInstance} from '../config/config';
// import Axios from 'axios';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';


export default class List extends Component {
	constructor(props) {
		super(props);
		//console.log(props);
		this.state = {
			email:'',
			password : null
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		//this.changeName = this.changeName.bind(this);
	}

	handleSubmit = (event, err, values) => {
		if(err.length > 0){		
			return false;
		}
		console.log(values)
		//let formData = new FormData(document.getElementById('loginForm'));
		axiosInstance().post(config.endpoint+'/user/login', values)
		.then(response => {
			console.log(response.data)
			localStorage.setItem('token', response.data.token);
			//this.props.history.push('/list');
		});
	}
	
	componentDidMount() {
		// console.log(props);
	}

	render() {		
		return (
			<div>
				<AvForm onSubmit={this.handleSubmit} id="loginForm">

					<div className="form-group">
						<label >Email-Id</label>
						<AvField id="email" name="email" type="text" value={this.state.email}  validate={{required : {value:true}}}/>
					</div>
					<div className="form-group">
						<label >Password</label>
						<AvField id="password" name="password" type="text" value={this.state.password}  validate={{required : {value:true}}}/>
					</div>										
					
					<div className="form-group">
						<Button color="primary">Login</Button>
					</div>
				</AvForm>
			</div>
		);
	}
}
