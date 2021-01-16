import React, { useState, useEffect } from "react";
import { Button, Modal, ModalFooter, ModalHeader } from "reactstrap";
import APIURL from "../../helpers/environment";
import "./ProfileModal.css";
import DeleteProfile from "./de-lete/DeleteProfile";
import EditProfile from "./edit/EditProfile";
import ViewProfile from "./view-profile/ViewProfile";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const ProfileModal = (props) => {
	const [showProfile, setShowProfile] = useState(false);
	const [modal, setModal] = useState(false);
	const [user, setUser] = useState({});

	const profileFetch = () => {
		fetch(`${APIURL}/user/profile`, {
			method: "GET",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: props.sessionToken,
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				editUserValue(json.user);
			})
			.then(setShowProfile(!showProfile))
			.catch((err) => console.log(err));
	};

	const editUserValue = (please) => {
		setUser(please);
	};

	const toggle = () => {
		let current = modal;
		setModal(!current);
	};

	const submitProfileEdit = () => {
		console.log("profile edit submit");
	};

	return (
		<div>
			{/* <div>
				<input
					className="viewprofile-opentopmodal-button"
					type="image"
					src="https://user-images.githubusercontent.com/68344211/93155416-0a07bb80-f6d4-11ea-99a0-59527da7352a.png"
					alt="view-profile"
					onClick={() => {
						profileFetch();
						toggle();
					}}
				/>
			</div> */}
			<Modal isOpen={modal} toggle={toggle}>
				<div>
					<Switch>
						<Route exact path="/viewprofile">
							<ViewProfile
								username={user.username}
								email={user.email}
								dateJoined={user.createdAt}
								tasks={user.taskCount}
							/>
						</Route>
						<Route exact path="/editprofile">
							<EditProfile
								sessionToken={props.sessionToken}
								usernameEdit={user.username}
								emailEdit={user.email}
								passwordEdit={user.password}
							/>
							<Button color="primary" onClick={submitProfileEdit}>
								submit
							</Button>
						</Route>
						<Route exact path="/deleteprofile">
							<DeleteProfile
								sessionToken={props.sessionToken}
								setSessionToken={props.setSessionToken}
							/>
						</Route>
					</Switch>
				</div>
				<hr />
				{/* MAIN MODAL BUTTONS- SUB MODAL ACCESS*/}
				<ModalFooter>
					<ul>
						<Button color="primary" onClick={() => alert("heckkkk")}>
							<li>
								<Link to="/">view profile</Link>
							</li>
						</Button>
						<Button color="secondary">
							<li>
								<Link to="/edit">ediiit</Link>
							</li>
						</Button>
						<Button color="secondary">
							<li>
								<Link to="/delete">delete account</Link>
							</li>
						</Button>
						<Button color="secondary" onClick={toggle()}>
							close profile
						</Button>
					</ul>
				</ModalFooter>
			</Modal>
		</div>
	);
};

//export default ProfileModal;
