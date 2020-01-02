import React, { Component } from "react";
import {Link} from "react-router-dom";
import logo from '../logo.svg';
import Row from './TableRow';
import userService from '../Services/userService';

export default class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loader: <img src={logo} className="App-logo" alt="logo" />,
			users : []
		}
		this.refreshGrid = this.refreshGrid.bind(this);
	}

	

	componentDidMount() {		
		userService.list()
		.then(users => {
			this.setState({users : users});
		});
	}
	refreshGrid = () => {
		userService.list()
		.then(users => {
			this.setState({users : users});
		});	
	}

	loadContent = ()=>{
		if(this.state.users){
			if(this.state.users.count < 1) {
				return <tr><td colSpan="5">{this.state.loader}</td></tr>;
			}else{
				return this.state.users.map((user, i) => {
					return <Row user={user} key={i} srno={i+1} refreshGrid={this.refreshGrid}/>
				});
			}
		}
	}



	render() {
		return (
			<div className="col-12">
				<div className="">
					<Link to="/add">
						<button className="btn btn-info"> Add User</button>
					</Link>
					
				</div>
				<div >
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
