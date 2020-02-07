import React, { Component } from "react";
import {Link} from "react-router-dom";
import logo from '../../logo.svg';
import Row from './TableRow';
import userService from '../../Services/userService';

import Pagination from "react-pagination-library";
import "react-pagination-library/build/css/index.css"; //for css

export default class ListTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loader: <img src={logo} className="App-logo" alt="logo" />,
			allUsers : [],
			users : [],
			hasError : false,
			showPopup : false,
			userSelected : false,
			isLoggedIn: (localStorage.getItem('token') ? true : false),
			parPage : 3,
			currentPage : 1,
			totalPages : 10,
			sortOrder : 1,
			sortBy : 'id',
			searchBy : ''
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
				this.setState({
					allUsers : users,
					users : users,
					totalPages : Math.ceil(users.length / this.state.parPage)
				});
			}else{
				
			}
		});
	}
	refreshGrid = () => {
		userService.list()
		.then(users => {
			//this.setState({users : users});
			if(users){
				let totalPages = Math.ceil(users.length / this.state.parPage);
				let activePage = this.state.currentPage;
				if(activePage > totalPages){
					activePage = activePage -1;
				}
				this.setState({
					users : users,
					totalPages : Math.ceil(users.length / this.state.parPage),
					currentPage : activePage
				});
			}else{
				
			}
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
					let valToReturn;
					if(rowCounter <= (this.state.parPage * this.state.currentPage - this.state.parPage)){
						valToReturn =  false; 
					}else{
						if(rowCounter <= this.state.parPage * this.state.currentPage){
							if(srno === 0){
								srno  = (this.state.parPage * this.state.currentPage) -this.state.parPage + 1;
							}else{
								srno++;
							}
							valToReturn =  <Row user={user} key={rowCounter-1} srno={srno} showDetailPopup={this.showDetailPopup} refreshGrid={this.refreshGrid} />
						}
					}
					return valToReturn;
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


	sortGrid = (e, sortBy) => {
		let order = this.state.sortOrder;
		if(this.state.sortBy !== sortBy){
			order = 1;
		}else{
			order = -(order);
		}
		this.state.users.sort((a, b) => {
			let val1 = a[sortBy];
			let val2 = b[sortBy];
			if(typeof a[sortBy] === 'string'){
				val1 = val1.toUpperCase();
				val2 = val2.toUpperCase();
			}
			let valToReturn;
			if(val1 > val2){
				valToReturn =  1*order;
			}else if(val1 < val2){
				valToReturn =  -1*order;
			}
			return valToReturn;
		});
		this.setState({
			users : this.state.users,
			sortBy : sortBy,
			sortOrder : order
		});
	}
	searchInGrid = (e) => {
		let searchedKey = e.target.value;

		let matchedUsers = this.state.allUsers.filter(user => {
			return (
				user.name.indexOf(searchedKey) !== -1 
				|| user.email.indexOf(searchedKey) !== -1
				|| user.id.toString().indexOf(searchedKey) !== -1 
			)
		});
		let totalPages = Math.ceil(matchedUsers.length / this.state.parPage);
		let activePage = this.state.currentPage;
		if(activePage > totalPages){
			activePage = activePage -1;
		}
		if(totalPages > 0 && activePage === 0){
			activePage = 1;
		}
		this.setState({
			searchBy : searchedKey,
			users : matchedUsers,
			totalPages : Math.ceil(matchedUsers.length / this.state.parPage),
			currentPage : activePage
		});
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
					<div className="float-left">
						<label><b>Search :</b></label>
						<input type="text" value={this.state.searchBy} onChange={(e) => this.searchInGrid(e)}/>
					</div>
					<table border="1" width="100%">
						<thead>
							<tr>
							<th>Sr. No</th>
							<th  onClick={ (e) => this.sortGrid(e, 'id')}>
								Id
								{this.state.sortBy === 'id' ?<div>{this.state.sortOrder}</div> :''}
							</th>
							<th  onClick={ (e) => this.sortGrid(e, 'name')}>
								Name
								{this.state.sortBy === 'name' ?<div>{this.state.sortOrder}</div> :''}
							</th>
							<th  onClick={ (e) => this.sortGrid(e, 'email')}>
								Email
								{this.state.sortBy === 'email' ?<div>{this.state.sortOrder}</div> :''}
							</th>
							<th  onClick={ (e) => this.sortGrid(e, 'status')}>
								Status
								{this.state.sortBy === 'status' ?<div>{this.state.sortOrder}</div> :''}
							</th>
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
