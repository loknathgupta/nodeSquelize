import React, { Component } from "react";
import config, {axiosInstance} from '../../config/config';
import logo from '../../logo.svg';
// import Axios from 'axios';


export default class View extends Component {
	constructor(props) {
		super(props);
		console.log(props);
		this.state = {
			id : '',
			name:'',
			dp:logo
		}
		this.gotoList = this.gotoList.bind(this);
	}

	gotoList = () => {
		this.props.history.push('/list');
	}
	componentDidMount() {
		//console.log(this.props);
		let userId = this.props.match.params.id;
		if(userId >= 1){
			axiosInstance().get(config.endpoint+'/user/list/'+userId)
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
				<div className="form-group">
					<label >Username : </label>
					{this.state.name} 
				</div>					
				<div className="form-group">
					<label >Profile Picture : </label>
					<img src={this.state.dp} width="60px" alt="Profile"/>
				</div>
				<button onClick={this.gotoList} className="btn btn-info">View List</button>
			</div>
		);
	}
}
