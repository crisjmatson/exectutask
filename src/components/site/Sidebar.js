import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import Auth from "../../user-auth-access/Auth";
/* NOT BEING USED */
const Sidebar = () => {
	return (
		<div className="sidebar">
			<div className="sidebar-list-styling">
				<ul className="sidebar-list list-unstyled">
					<li>
						<Link to="/Auth">AUTH</Link>
					</li>
				</ul>
			</div>
			<div className="sidebar-route">
				<Switch>
					<Route exact path="/auth">
						<Auth />
					</Route>
				</Switch>
			</div>
		</div>
	);
};

export default Sidebar;
