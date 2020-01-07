import React, { Component } from "react";
import {Link} from "react-router-dom";
import logo from '../../logo.svg';
import Row from './TableRow';
import UserDeatils from '../UserDeatils';
import userService from '../../Services/userService';

export default class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loader: <img src={logo} className="App-logo" alt="logo" />,
			users : [],
			hasError : false,
			showPopup : false,
			userSelected : false,
			isLoggedIn: (localStorage.getItem('token') ? true : false),
		}
		this.refreshGrid = this.refreshGrid.bind(this);
		this.showDetailPopup = this.showDetailPopup.bind(this);
		this.hideDetailPopup = this.hideDetailPopup.bind(this);
	}

	

	componentDidMount() {
		console.log('List Did Mount');		
		userService.list()
		.then(users => {
			if(users){
				this.setState({users : users});
			}else{
				
			}
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
					return <Row user={user} key={i} srno={i+1} showDetailPopup={this.showDetailPopup} refreshGrid={this.refreshGrid}/>
				});
			}
		}
	}

	showDetailPopup = (userId = false) => {
		this.setState({
			showPopup:true,
			userSelected : userId
		});
	}
	hideDetailPopup = () => {
		this.setState({
			showPopup:false
		});
	}

	componentDidCatch(error, info) {
		// Display fallback UI
		this.setState({ hasError: true });
		// You can also log the error to an error reporting service
		//logErrorToMyService(error, info);
		this.props.history.push('/login');
	  }
	 



	render() {
		return (
			<div className="card card-plain">
				<div >
				{this.state.isLoggedIn &&
					<Link className="float-right" to="/add">
						<button className="btn btn-info"> Add User</button>
					</Link>
				}
					
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
				<UserDeatils  show={this.state.showPopup} userSelected={this.state.userSelected} hideDetailPopup = {this.hideDetailPopup}/>		
			</div>
		);
	}
}
