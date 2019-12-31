import React, { Component } from 'react';
import {config, axiosInstance} from '../config/config';
import {Link} from "react-router-dom";
// import Axios from "axios";

class TableRow extends Component {
	
	constructor(props) {
		super(props);	
		console.log(props);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleDelete = () => {
		axiosInstance().post(config.endpoint+'/user/delete', {id:this.props.user.id})
		.then(response=>{
			console.log(response.data);
			this.props.refreshGrid();
		})
		.catch(err => console.log(err))
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
					<Link to={'/view/'+ this.props.user.id} className="btn btn-info" >View</Link>
					|
					<Link to={'/add/' + this.props.user.id}  className="btn btn-primary" >Edit</Link>
					|
					<button onClick={this.handleDelete} className="btn btn-danger">Delete</button>
				</td>
			</tr>
		);
	}
}

export default TableRow;