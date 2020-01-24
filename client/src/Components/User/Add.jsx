import React, { Component } from "react";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import _debounce from 'lodash.debounce';
//import { Button } from 'reactstrap';
import config  from '../../config/config';
import logo from '../../logo.svg';
import userService from '../../Services/userService';
import loginService from '../../Services/loginService';


export default class List extends Component {
	constructor(props) {
		super(props);
		//console.log(props);
		this.state = {
			id : '',
			name:'',
			email:'',
			password : null,
			password_confirm : null,
			dp:logo,
			errorMessage : false,
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.confirmPassword = this.confirmPassword.bind(this);
		loginService.authorize();
	}

	handleSubmit = (event, err, values) => {
		console.log(values); 
		if(values.password !== values.password_confirm){
			alert('Password are not same.');
			alert(document.getElementById('password_confirm').className);
			return false;
		}
		if(err.length > 0){		
			return false;
		}
		let formData = new FormData(document.getElementById('addForm'));
		userService.add(formData)
		.then(data => {
			if(data.errors){
				this.setState({errorMessage : data.errors[0].message});
			}else{
				this.props.history.push('/list');
			}
		})
		.catch(err => {
			console.log(err);
		});
	}

	handleChange = (event) => {
		this.setState({
			dp: URL.createObjectURL(event.target.files[0])
		})
	}

	componentDidMount() {
		// console.log(props);
		let userId = this.props.match.params.id;
		if(userId >= 1){
			userService.list(userId)
			.then(users => {
				let userDetails = users[0];
				//console.log('userDetails', userDetails);
				this.setState({
					id : userDetails.id,
					name : userDetails.name,
					email : userDetails.email,
					password : userDetails.password,
					dp : config.endpoint+'/'+userDetails.dp
				});
			});
		}
		
	}

	// debounce to not pound the 'server'
	confirmPassword = _debounce((value, ctx, input, cb) => {
		// cancel pending 'network call'
		// 	clearTimeout(this.timeout);
		
		// 	// simulate network call
		// 	this.timeout = setTimeout(() => {
		// 	  cb(value === 'valid' || value === '');
		// 	}, 500);
		
		//   }, 300);
		let password = document.getElementById('password').value;
		cb((value === password || value === '')?true : 'Password does not match.');
	});

	render() {		
		return (
			<div className="card card-plain">
				{this.state.errorMessage &&
					<div className="error">{this.state.errorMessage}</div>
				}
				<AvForm onSubmit={this.handleSubmit} id="addForm">
					<div className="form-group">
						<label >Username</label>
						<AvField id="username" name="username" type="text" value={this.state.name}  validate={{required : {value:true}}}/>
					</div>

					<div className="form-group">
						<label >User Email-Id</label>
						<AvField id="email" name="email" type="text" value={this.state.email}  validate={{required : {value:true}, email:{value:true, errorMessage :'Not a valid email-id.'}}}/>
					</div>
					{ this.state.password === null &&
						<div className="form-group">
							<label >Password</label>
							<AvField id="password" name="password" type="password" value={this.state.password}  validate={{required : {value:true}}}/>
						</div>
					}

					{ this.state.password === null &&
						<div className="form-group">
							<label >Confirm Password</label>
							<AvField id="password_confirm" name="password_confirm" type="password" value={this.state.password_confirm} validate={{async: this.confirmPassword}} />
						</div>
					}
										
					<div className="form-group">
						<label >Profile Picture</label>
						<AvField id="dp" name="dp" type="file" onChange={this.handleChange} validate={{required : {value: this.state.dp !== logo ? false :true}}}/>
						<img src={this.state.dp} width="30px" alt="Profile"/>
					</div>
					<div className="form-group">
						<AvField type="hidden" name="id" value={this.state.id} />
						<button className="btn btn-primary">Save!</button>
						{/* <Button color="primary">Submit</Button> */}
					</div>
				</AvForm>
			</div>
		);
	}
}
