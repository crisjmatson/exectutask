import React, { useState } from "react";
import Radium from "radium";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import { Button, Nav, NavbarBrand, NavItem } from "reactstrap";
import DeleteProfile from "./de-lete/DeleteProfile";
import EditProfile from "./edit/EditProfile";
import Logout from "./log-out/Logout";
import "./UserSidebar.css";
import ViewProfile from "./view-profile/ViewProfile";

var styles = {
	sidebar: {
		zIndex: "10",
		position: "fixed",
	},
};

const UserSidebar = (props) => {
	const [collapsed, setCollapsed] = useState(true);
	const [closedRoute, setClosedRoute] = useState(false);
	const toggleNavbar = () => setCollapsed(!collapsed);

	return (
		<div className="usersidebarcontainer" style={styles.sidebar}>
			<Nav color="faded">
				{/* <NavbarBrand href="/" className="mr-auto">
					<Link to="/" onClick={() => setCollapsed(true)}>
						<img
							src="https://user-images.githubusercontent.com/68344211/93353776-4f2e0980-f80a-11ea-9f15-d3cdf44cccc5.png"
							alt="everestLogo"
							className="navbar-everest-logo"
						/>
					</Link>
				</NavbarBrand> */}
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
							view profile
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
	return <h2></h2>;
}

export default Radium(UserSidebar);
