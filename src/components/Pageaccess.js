import React, { useState, useEffect } from "react";
import "./Pageaccess.css";
import { BrowserRouter as Router } from "react-router-dom";
import UserSidebar from "./user-sidebar/UserSidebar";
import View from "./lists/View";
import APIURL from "../helpers/environment";

const ListAccess = (props) => {
	const [tasks, setTasks] = useState([]);
	const [profile, setProfile] = useState(null);

	useEffect(() => {
		sidebarFetch().catch(() => console.log("fetch failed"));
		return () => {
			let placeholder = "maaaario";
		};
	}, []);

	const sidebarFetch = async () => {
		const response = await fetch(`${APIURL}/user/profile`, {
			method: "GET",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: props.sessionToken,
			}),
		});
		const profile = await response.json();
		return setProfile(profile.user);
	};

	return (
		<div className="listaccess-div">
			<Router>
				<UserSidebar
					setSessionToken={props.setSessionToken}
					sessionToken={props.sessionToken}
					profile={profile}
					setProfile={setProfile}
					sidebarFetch={sidebarFetch}
				/>
			</Router>

			<View
				sessionToken={props.sessionToken}
				tasks={tasks}
				setTasks={setTasks}
				sidebarFetch={sidebarFetch}
				profile={profile}
			/>
		</div>
	);
};

export default ListAccess;
