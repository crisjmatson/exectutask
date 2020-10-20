import React, { useState, useEffect } from "react";
import { Button, Modal, ModalFooter, ModalHeader } from "reactstrap";
import APIURL from "../../helpers/environment";
import "./ProfileModal.css";
import DeleteProfile from "./de-lete/DeleteProfile";
import EditProfile from "./edit/EditProfile";
import ViewProfile from "./view-profile/ViewProfile";

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

	const toggle = () => setModal(true);

	const submitProfileEdit = () => {
		console.log("profile edit submit");
	};

	return (
		<div>
			<div>
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
			</div>
			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle}>profile</ModalHeader>
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
				{/* <ListGroup flush className="profileDisplayList">
						<ListGroupItem>
							<ListGroupItemHeading>username</ListGroupItemHeading>
							<ListGroupItemText id="username"></ListGroupItemText>
						</ListGroupItem>
						<ListGroupItem>
							<ListGroupItemHeading>date joined</ListGroupItemHeading>
							<ListGroupItemText id="dateJoined"></ListGroupItemText>
						</ListGroupItem>
						<ListGroupItem>
							<ListGroupItemHeading>email</ListGroupItemHeading>
							<ListGroupItemText id="email"></ListGroupItemText>
						</ListGroupItem>
						<ListGroupItem>
							<ListGroupItemHeading>tasks completed</ListGroupItemHeading>
							<ListGroupItemText id="tasksDone"></ListGroupItemText>
						</ListGroupItem>
					</ListGroup> */}
				{/* EDIT PROFILE SUB-MODAL */}
				{/* <Modal
						isOpen={nestedModal}
						toggle={toggleNested}
						onClosed={closeAll ? toggle : undefined}
					>
						<ModalHeader>edit: options</ModalHeader>
						<ModalBody>
							<EditProfile
								sessionToken={props.sessionToken}
								usernameEdit={user.username}
								emailEdit={user.email}
								passwordEdit={user.password}
								/* username={username}
								email={email}
								password={password} 
							/>
						</ModalBody>
						<ModalFooter>
							<Button color="primary" onClick={submitProfileEdit}>
								submit
							</Button>
							<Button color="secondary" onClick={toggleNested}>
								cancel
							</Button>
						</ModalFooter>
					</Modal> */}
				{/* DELETE SUB-MODAL */}
				{/* <Modal
						isOpen={nestedDeleteModal}
						toggle={toggleNestedDelete}
						onClosed={closeAll ? toggle : undefined}
					>
						<ModalHeader>delete account?</ModalHeader>
						<ModalBody>
							<DeleteProfile
								sessionToken={props.sessionToken}
								setSessionToken={props.setSessionToken}
							/>
						</ModalBody>
						<ModalFooter>
							<Button color="secondary" onClick={toggleNestedDelete}>
								cancel
							</Button>
						</ModalFooter>
					</Modal>
				</ModalBody> */}

				{/* MAIN MODAL BUTTONS- SUB MODAL ACCESS*/}
				<ModalFooter>
					<ul>
						<Button color="secondary">
							<li>
								<Link to="/">view profile</Link>
							</li>
						</Button>
						<Button color="secondary">
							<li>
								<Link to="/edit">edit</Link>
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

export default ProfileModal;
