import React, { Component } from "react";
import {config, axiosInstance} from '../config/config';
import logo from '../logo.svg';
// import Axios from 'axios';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';


export default class List extends Component {
	constructor(props) {
		super(props);
		console.log(props);
		this.state = {
			id : '',
			name:'',
			email:'',
			password : null,
			dp:logo
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		//this.changeName = this.changeName.bind(this);
	}

	handleSubmit = (event, err, values) => {
		//event.preventDefault();
		// console.log(values);
		if(err.length > 0){		
			return false;
		}
		let formData = new FormData(document.getElementById('addForm'));
		axiosInstance().post(config.endpoint+'/user/add', formData)
		.then(response => {
			console.log(response.data)
			this.props.history.push('/list');
		});
	}

	handleChange = (event) => {
		this.setState({
			dp: URL.createObjectURL(event.target.files[0])
		})
	}

	// changeName = (event) => {
	// 	this.setState({
	// 		name : event.target.value
	// 	});
	// }

	componentDidMount() {
		// console.log(props);
		let userId = this.props.match.params.id;
		if(userId >= 1){
			axiosInstance().get(config.endpoint+'/user/list/'+userId)
			.then(response => {
				let userDetails = response.data[0];
				console.log('userDetails', userDetails);
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

	render() {		
		return (
			<div>
				<AvForm onSubmit={this.handleSubmit} id="addForm">
					<div className="form-group">
						<label >Username</label>
						<AvField id="username" name="username" type="text" value={this.state.name}  validate={{required : {value:true}}}/>
					</div>

					<div className="form-group">
						<label >User Email-Id</label>
						<AvField id="email" name="email" type="text" value={this.state.email}  validate={{required : {value:true}}}/>
					</div>
					{ this.state.password === null &&
						<div className="form-group">
							<label >Password</label>
							<AvField id="password" name="password" type="text" value={this.state.password}  validate={{required : {value:true}}}/>
						</div>
					}
										
					<div className="form-group">
						<label >Profile Picture</label>
						<AvField id="dp" name="dp" type="file" onChange={this.handleChange} validate={{required : {value: this.state.dp!== '' ? false :true}}}/>
						<img src={this.state.dp} width="30px" alt="Profile"/>
					</div>
					<div className="form-group">
						<AvField type="hidden" name="id" value={this.state.id} />
						{/* <button className="btn btn-primary">Save!</button> */}
						<Button color="primary">Submit</Button>
					</div>
				</AvForm>
			</div>
		);
	}
}
