import React, { Component } from 'react';
import config from '../../config/config';
import {Link} from "react-router-dom";
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
					<button onClick={this.handleView} className="btn btn-danger">View</button>
					
					{this.state.isLoggedIn &&
						<Link to={'/add/' + this.props.user.id}  className="btn btn-primary" >Edit</Link>
					}
					
					{this.state.isLoggedIn &&
						<button onClick={this.handleDelete} className="btn btn-danger">Delete</button>
					}
				</td>
			</tr>
		);
	}
}

export default TableRow;