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
// import Hello from './Components/Hello';
// import UserList from './Components/User/List';
// import UserAdd from './Components/User/Add';
// import UserView from './Components/User/View';
// import UserLogin from './Components/Login/Login';
// import UserLogout from './Components/Login/Logout';
import Menus from './Components/Menus';

function App() {
	return (
		<div className="App" >
			
			<Menus />

		</div>
	);
}

export default App;
