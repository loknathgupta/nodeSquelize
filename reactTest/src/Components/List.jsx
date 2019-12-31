import React, { Component } from "react";
import logo from '../logo.svg';
import {config, axiosInstance} from '../config/config';
// import Axios from 'axios';
import Row from './TableRow';
import {Link} from "react-router-dom";

export default class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loader: <img src={logo} className="App-logo" alt="logo" />,
			users : []
		}
		this.handleAddNew = this.handleAddNew.bind(this);
		this.refreshGrid = this.refreshGrid.bind(this);
	}

	handleAddNew = () => {
		window.location.replace('/add');
	}

	componentDidMount() {
		axiosInstance().get(config.endpoint + '/user/list')
		.then(response => {
			this.setState({users : response.data})				
		});
	}
	refreshGrid = () => {
		axiosInstance().get(config.endpoint + '/user/list')
		.then(response => {
			this.setState({users : response.data})				
		});
	}

	loadContent = ()=>{
		if(this.state.users.count < 1) {
			return <tr><td colSpan="5">{this.state.loader}</td></tr>;
		}else{
			return this.state.users.map((user, i) => {
				return <Row user={user} key={i} srno={i+1} refreshGrid={this.refreshGrid}/>
			});
		}
	}



	render() {
		return (
			<div>
				<div>
					<Link to="/add">
						<button > Add User</button>
					</Link>
					
				</div>
				<div>
					<table border="1" width="100%">
						<thead>
							<tr>
							<th>Sr. No</th>
							<th>Id</th>
							<th>Name</th>
							<th>Email</th>
							<th>Status</th>
							<th>DP</th>
							<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{this.loadContent()}
						</tbody>
						
					</table>
					
				</div>
				
			</div>
		);
	}
}
