import React, { Component } from "react";
import config from '../config/config';
import logo from '../logo.svg';
import Axios from 'axios';


export default class List extends Component {
	constructor(props) {
		super(props);
		console.log(props);
		this.state = {
			id : '',
			name:'',
			dp:logo
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.changeName = this.changeName.bind(this);
	}

	handleSubmit = (event) => {
		event.preventDefault();
		let formData = new FormData(event.target);
		Axios.post(config.endpoint+'/user/add', formData)
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

	changeName = (event) => {
		this.setState({
			name : event.target.value
		});
	}

	componentDidMount() {
		// console.log(props);
		let userId = this.props.match.params.id;
		if(userId >= 1){
			Axios.get(config.endpoint+'/user/list/'+userId)
			.then(response => {
				let userDetails = response.data[0];
				this.setState({
					id : userDetails.id,
					name : userDetails.name,
					dp : config.endpoint+'/'+userDetails.dp
				});
			});
		}
		
	}

	render() {		
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label >Username</label>
						<input id="username" name="username" type="text" value={this.state.name} onChange={this.changeName}/>
					</div>					
					<div className="form-group">
						<label >Profile Picture</label>
						<input id="dp" name="dp" type="file" onChange={this.handleChange} />
						<img src={this.state.dp} width="30px" alt="Profile"/>
					</div>
					<div className="form-group">
						<input type="hidden" name="id" value={this.state.id} />
						<button className="btn btn-primary">Save!</button>
					</div>
				</form>
			</div>
		);
	}
}
