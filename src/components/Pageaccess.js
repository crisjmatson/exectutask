import React from "react";
import "./Pageaccess.css";
import { BrowserRouter as Router } from "react-router-dom";
import UserSidebar from "./user-sidebar/UserSidebar";
import Create from "./lists/Create";

const ListAccess = (props) => {
	return (
		<div className="listaccess-div">
			<Router>
				<UserSidebar
					setSessionToken={props.setSessionToken}
					sessionToken={props.sessionToken}
				/>
			</Router>
			<Create sessionToken={props.sessionToken} />
		</div>
	);
};

export default ListAccess;
