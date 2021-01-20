import React, { useRef, useState } from "react";
import Radium from "radium";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import { Button, Nav, NavItem } from "reactstrap";
import { FaUserCircle } from "react-icons/fa";
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
		margin: "15px",
	},
};

const UserSidebar = (props) => {
	const [collapsed, setCollapsed] = useState(true);
	const [profileBtnToggle, setProfileBtnToggle] = useState(true);
	const [closedRoute, setClosedRoute] = useState(false);
	const ref = useRef();

	useOutsideClick(ref, () => {
		//console.log("click logged as outside");
		if (profileBtnToggle !== true) {
			setClosedRoute(true);
			setCollapsed(true);
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
					style={{
						borderRadius: "50%",
						padding: "10px",
					}}
					onClick={() => toggleProfileBtn()}
				>
					<FaUserCircle style={{ fontSize: "50px" }} />
				</Button>
			) : (
				<div>
					<Nav color="faded">
						<NavItem className="usersidebarNavItem">
							<Link
								to="/viewprofile"
								onClick={() => {
									if (closedRoute === true) {
										setClosedRoute(false);
									}
									/* setCollapsed(true) */
								}}
							>
								<Button> view </Button>
							</Link>
						</NavItem>
						<NavItem className="usersidebarNavItem">
							<Link
								to="/editprofile"
								onClick={() => {
									if (closedRoute === true) {
										setClosedRoute(false);
									}
									/* setCollapsed(true) */
								}}
							>
								<Button> edit </Button>
							</Link>
						</NavItem>
						<NavItem className="usersidebarNavItem">
							<Link
								to="/deleteprofile"
								onClick={() => {
									if (closedRoute === true) {
										setClosedRoute(false);
									}
									/* setCollapsed(true) */
								}}
							>
								<Button>delete account</Button>
							</Link>
						</NavItem>
						<NavItem className="usersidebarNavItem">
							<Link
								to="/logout"
								onClick={() => {
									if (closedRoute === true) {
										setClosedRoute(false);
									}
									/* setCollapsed(true) */
								}}
							>
								<Button>logout</Button>
							</Link>
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
