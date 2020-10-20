import React from "react";
import { Button, Card } from "reactstrap";
import APIURL from "../../../helpers/environment";
import "./DeleteProfile.css";

const DeleteProfile = (props) => {
	let closeSession = props.setSessionToken;

	const fetchDelete = () => {
		console.log("delete started");
		fetch(`${APIURL}/user/delete`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: props.sessionToken,
			},
		}).then((res) => {
			alert("profile deleted");
			closeSession(undefined);
		});
	};

	return (
		<div className="delete-submodal-div">
			<Card
				body
				inverse
				style={{ backgroundColor: "#21292f8c", borderColor: "#21292f8c" }}
			>
				<h3 className="delete-submodal-text">
					remove your username & email from everest?
				</h3>
				<br />
				<Button className="user-nav-button" onClick={() => fetchDelete()}>
					DELETE
				</Button>
				<br />
				<Button onClick={() => props.setClosedRoute(true)}>cancel</Button>
				<br />
			</Card>
		</div>
	);
};

export default DeleteProfile;
