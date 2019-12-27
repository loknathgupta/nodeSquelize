import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
// import logo from './logo.svg';
import './App.css';
import Hello from './Components/Hello';
import UserList from './Components/List';
import UserAdd from './Components/Add';
import UserView from './Components/View';

function Dashboard() {
	return (
		<div>
			<h2>Dashboard</h2>
		</div>
	);
}



function App() {
	return (
		<div className="App">			
			<Router>
				<div>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/about">About</Link>
						</li>
						<li>
							<Link to="/dashboard">Dashboard</Link>
						</li>						
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
						<Route exact path="/" component={ UserList } />							
						<Route path="/about" component={ Hello } />
						<Route path="/dashboard" component={ Dashboard } />
												
						<Route path="/list">
							<UserList />
						</Route>

						<Route path="/add/:id?" component={ UserAdd } />
						<Route path="/view/:id?" component={ UserView } />
					</Switch>
				</div>
			</Router>

		</div>
	);
}

export default App;
