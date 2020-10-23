import React, { useEffect, useState } from "react";
import {
	Button,
	Card,
	CardText,
	ListGroup,
	ListGroupItemHeading,
} from "reactstrap";
import APIURL from "../../../helpers/environment";
import "./ViewProfile.css";

const ViewProfile = (props) => {
	const [fetchUser, setFetchUser] = useState(null);

	useEffect(() => {
		sidebarFetch().catch(() => console.log("fetch failed"));
		return () => {
			let placeholder = "maaaario";
		};
	}, []);

	useEffect(() => {
		if (fetchUser !== null) {
			let listName = document.getElementById("username");
			let listMail = document.getElementById("email");
			let listDate = document.getElementById("dateJoined");
			let listCount = document.getElementById("count");
			let dateStr = `${fetchUser.createdAt}`;
			let styledDate = `${dateStr.slice(5, 7)} / ${dateStr.slice(
				8,
				10
			)} / ${dateStr.slice(2, 4)}`;

			listName.textContent = fetchUser.username;
			listMail.textContent = fetchUser.email;
			listDate.textContent = styledDate;
			listCount.textContent = fetchUser.taskCount;
		}
	}, [fetchUser]);

	const sidebarFetch = async () => {
		const response = await fetch(`${APIURL}/user/profile`, {
			method: "GET",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: props.sessionToken,
			}),
		});
		const profile = await response.json();
		return setFetchUser(profile.user);
	};

	const [modal, setModal] = useState(false);

	const toggle = () => setModal(!modal);

	return (
		<div className="viewprofilebody">
			<Card
				body
				inverse
				style={{ backgroundColor: "#21292f8c", borderColor: "#21292f8c" }}
			>
				<ListGroup>
					<span className="viewProfileItemHeading">username:</span>
					<span id="username" className="viewProfileItemText"></span>
					<br />
					<span className="viewProfileItemHeading">email</span>
					<span id="email" className="viewProfileItemText"></span>
					<br />
					<span className="viewProfileItemHeading">date joined</span>
					<span id="dateJoined" className="viewProfileItemText"></span>
					<br />
					<span className="viewProfileItemHeading">
						tasks completed to date
					</span>
					<span id="count" className="viewProfileItemText">
						tasks completed
					</span>
				</ListGroup>

				<Button onClick={() => props.setClosedRoute(true)}>
					close profile
				</Button>
			</Card>
		</div>
	);
};
export default ViewProfile;
