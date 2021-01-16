import React, { useRef, useState } from "react";
import Radium from "radium";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import { Button, Nav, NavItem } from "reactstrap";
import useOutsideClick from "../useOutsideClick";
import ViewProfile from "./view-profile/ViewProfile";
import EditProfile from "./edit/EditProfile";
import DeleteProfile from "./de-lete/DeleteProfile";
import Logout from "./log-out/Logout";
import "./UserSidebar.css";

var styles = {
	sidebar: {
		zIndex: "10",
		position: "fixed",
	},
};

const UserSidebar = (props) => {
	const [collapsed, setCollapsed] = useState(true);
	const [profileBtnToggle, setProfileBtnToggle] = useState(true);
	const [closedRoute, setClosedRoute] = useState(false);
	const ref = useRef();

	useOutsideClick(ref, () => {
		console.log("click logged as outside");
		if (profileBtnToggle !== true) {
			setClosedRoute(true);
			setProfileBtnToggle(true);
		}
	});

	const toggleProfileBtn = () => {
		let current = profileBtnToggle;
		setProfileBtnToggle(!current);
	};

	return (
		<div className="usersidebarcontainer" style={styles.sidebar} ref={ref}>
			{profileBtnToggle ? (
				<Button
					style={{ borderRadius: "50%", height: "5em", width: "5em" }}
					onClick={() => toggleProfileBtn()}
				>
					Profile
				</Button>
			) : (
				<div>
					<Nav color="faded">
						<NavItem className="usersidebarNavItem">
							<Button>
								<Link
									to="/viewprofile"
									onClick={() => {
										if (closedRoute === true) {
											setClosedRoute(false);
										}
										setCollapsed(true);
									}}
								>
									view
								</Link>
							</Button>
						</NavItem>
						<NavItem className="usersidebarNavItem">
							<Button>
								<Link
									to="/editprofile"
									onClick={() => {
										if (closedRoute === true) {
											setClosedRoute(false);
										}
										setCollapsed(true);
									}}
								>
									edit
								</Link>
							</Button>
						</NavItem>
						<NavItem className="usersidebarNavItem">
							<Button>
								<Link
									to="/deleteprofile"
									onClick={() => {
										if (closedRoute === true) {
											setClosedRoute(false);
										}
										setCollapsed(true);
									}}
								>
									delete account
								</Link>
							</Button>
						</NavItem>
						<NavItem className="usersidebarNavItem">
							<Button>
								<Link
									to="/logout"
									onClick={() => {
										if (closedRoute === true) {
											setClosedRoute(false);
										}
										setCollapsed(true);
									}}
								>
									logout
								</Link>
							</Button>
						</NavItem>
					</Nav>
				</div>
			)}
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route exact path="/viewprofile">
					{closedRoute ? (
						<Redirect to="/" />
					) : (
						<ViewProfile
							sessionToken={props.sessionToken}
							setCollapsed={setCollapsed}
							setClosedRoute={setClosedRoute}
							profile={props.profile}
							setProfile={props.setProfile}
						/>
					)}
				</Route>
				<Route exact path="/editprofile">
					{closedRoute ? (
						<Redirect to="/" />
					) : (
						<EditProfile
							sessionToken={props.sessionToken}
							setClosedRoute={setClosedRoute}
							Redirect={Redirect}
							sidebarFetch={props.sidebarFetch}
						/>
					)}
				</Route>
				<Route exact path="/deleteprofile">
					{closedRoute ? (
						<Redirect to="/" />
					) : (
						<DeleteProfile
							sessionToken={props.sessionToken}
							setSessionToken={props.setSessionToken}
							setClosedRoute={setClosedRoute}
						/>
					)}
				</Route>
				<Route exact path="/logout">
					{closedRoute ? (
						<Redirect to="/" />
					) : (
						<Logout
							setSessionToken={props.setSessionToken}
							setClosedRoute={setClosedRoute}
						/>
					)}
				</Route>
			</Switch>
		</div>
	);
};

function Home() {
	return <div></div>;
}

export default Radium(UserSidebar);
