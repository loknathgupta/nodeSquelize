import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
// import logo from './logo.svg';
import '../App.css';
import Hello from './Hello';
import UserList from './User/List';
import UserAdd from './User/Add';
import UserView from './User/View';
import UserLogin from './Login/Login';
import UserLogout from './Login/Logout';

import loginService from '../Services/loginService';

function Dashboard() {
	return (
		<div>
			<h2>Dashboard</h2>
		</div>
	);
}
export default class Menus extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: (localStorage.getItem('token') ? true : false)
		};
		this.updateLoginState = this.updateLoginState.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}

	updateLoginState = (status = 'fail') => {
		if (status === 'success') {
			this.setState({ isLoggedIn: true });
		} else {
			this.setState({ isLoggedIn: false });
		}

	}

	handleLogout = () => {
		loginService.logout();
	}

	render() {
		return (
			<div >
				<Router>
					<div>
						<ul className="menuLinks">
							{this.state.isLoggedIn === true &&
								<li>
									<Link to="/list" className="btn btn-info">Home</Link>
								</li>
							}
							{this.state.isLoggedIn === true &&
								<li>
									<Link to="/about" className="btn btn-info">About</Link>
								</li>
							}
							{this.state.isLoggedIn === true &&
								<li>
									<Link to="/dashboard" className="btn btn-info">Dashboard</Link>
								</li>
							}
							{this.state.isLoggedIn !== true &&
								<li>
									<Link to={{ pathname: "/login" }} className="btn btn-info">Login</Link>
								</li>
							}

							{this.state.isLoggedIn === true &&
								<li>
									{/* <Link to="/logout" className="btn btn-info">Logout</Link> */}
									<button onClick={this.handleLogout} className="btn btn-info"> Logout</button>
								</li>
							}

						</ul>

						<hr />

						{/*
						A <Switch> looks through all its children <Route>
						elements and renders the first one whose path
						matches the current URL. Use a <Switch> any time
						you have multiple routes, but you want only one
						of them to render at a time
					*/}
						<Switch>
							<Route exact path="/" component={UserList} />
							<Route path="/about" component={Hello} />
							<Route path="/dashboard" component={Dashboard} />

							<Route path="/list">
								<UserList />
							</Route>

							<Route path="/add/:id?" component={UserAdd} />
							<Route path="/view/:id?" component={UserView} />
							<Route path="/login" component={UserLogin} />
							<Route path="/logout" component={UserLogout} />
						</Switch>
					</div>
				</Router>
			</div>
		);
	}
}