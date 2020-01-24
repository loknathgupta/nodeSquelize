import React, { Component } from 'react';
import config from '../../config/config';
import {Link} from "react-router-dom";
import UserDeatils from './UserDeatils';
import UserComments from './UserComments';
import userService from '../../Services/userService';

class TableRow extends Component {
	
	constructor(props) {
		super(props);	
		console.log('props', props);
		this.handleDelete = this.handleDelete.bind(this);
		this.state = {
			isLoggedIn: (localStorage.getItem('token') ? true : false),
		}
	}

	handleDelete = () => {
		userService.delete(this.props.user.id)
		.then(data => {
			this.props.refreshGrid();
		})
		.catch(err => {
			console.log(err);
		});
	}

	handleView = () => {
		console.log('View');
		this.props.showDetailPopup(this.props.user.id);
	}

	render() {
		return (
			<tr>
				<td>
					{this.props.srno}
				</td>
				<td>
					{this.props.user.id}
				</td>
				<td>
					{this.props.user.name}
				</td>
				<td>
					{this.props.user.email}
				</td>
				<td>
					{this.props.user.status === 'E' ? 'Enabled' : (this.props.user.status === 'B' ? 'Blocked' : 'Disabled')}
				</td>
				<td>
					<img height="30px" src={config.endpoint + '/' + this.props.user.dp} alt={this.props.user.name + ' Profile Picture'}></img>
				</td>
				<td>
					{/* <Link to={'/view/'+ this.props.user.id} className="btn btn-info" >View</Link> */}
					<UserDeatils  userId={this.props.user.id} />		
					<UserComments  comments={this.props.user.comments}   />		

					
					{this.state.isLoggedIn &&
						<div className="float-left"><Link to={'/add/' + this.props.user.id}  className="btn btn-primary" >Edit</Link></div>
					}
					
					{this.state.isLoggedIn &&
						<button onClick={this.handleDelete} className="btn btn-danger float-left">Delete</button>
					}
				</td>

			</tr>
		);
	}
}

export default TableRow;