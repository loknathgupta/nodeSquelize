import React, { Component } from "react";
import {Link} from "react-router-dom";
import logo from '../../logo.svg';
import Row from './TableRow';
import userService from '../../Services/userService';

import Pagination from "react-pagination-library";
import "react-pagination-library/build/css/index.css"; //for css

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
			parPage : 3,
			currentPage : 1,
			totalPages : 10
		}
		this.refreshGrid = this.refreshGrid.bind(this);
		this.showDetailPopup = this.showDetailPopup.bind(this);
		this.hideDetailPopup = this.hideDetailPopup.bind(this);

		this.changeCurrentPage = this.changeCurrentPage.bind(this);
	}

	changeCurrentPage = (numPage) => {
		this.setState({ currentPage: numPage });
		//fetch a data
		//or update a query to get data
	  };
	

	componentDidMount() {
		console.log('List Did Mount');		
		userService.list()
		.then(users => {
			if(users){
				this.setState({users : users});
				this.setState({totalPages : Math.ceil(users.length / this.state.parPage)});
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
				let rowCounter = 0;
				let srno = 0;
				return this.state.users.map((user, i) => {
					rowCounter++;
					if(rowCounter <= (this.state.parPage * this.state.currentPage - this.state.parPage)){
						return false; 
					}
					if(rowCounter <= this.state.parPage * this.state.currentPage){
						if(srno === 0){
							srno  = (this.state.parPage * this.state.currentPage) -this.state.parPage + 1;
						}else{
							srno++;
						}
						return <Row user={user} key={rowCounter-1} srno={srno} showDetailPopup={this.showDetailPopup} refreshGrid={this.refreshGrid} />
					}
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
				<div>
					<Pagination
					currentPage={this.state.currentPage}
					totalPages={this.state.totalPages}
					changeCurrentPage={this.changeCurrentPage}
					theme="bottom-border"
					/>
					<h2>current Page:{this.state.currentPage}</h2>
				</div>
			</div>
		);
	}
}
