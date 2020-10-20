import React, { useState } from "react";
import "./Pageaccess.css";
import { BrowserRouter as Router } from "react-router-dom";
import UserSidebar from "./user-sidebar/UserSidebar";
import Create from "./lists/Create";
import View from "./lists/View";

const ListAccess = (props) => {
	const [tasks, setTasks] = useState([]);
	/* const setTaskArray = () => {

	} */
	return (
		<div className="listaccess-div">
			<Router>
				<UserSidebar
					setSessionToken={props.setSessionToken}
					sessionToken={props.sessionToken}
				/>
			</Router>
			<Create sessionToken={props.sessionToken} />
			<View
				sessionToken={props.sessionToken}
				tasks={tasks}
				setTasks={setTasks}
			/>
		</div>
	);
};

export default ListAccess;
