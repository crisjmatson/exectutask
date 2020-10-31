import React, { useEffect } from "react";
import { Button, Card, ListGroup } from "reactstrap";
import "./ViewProfile.css";

const ViewProfile = (props) => {
	useEffect(() => {
		if (props.profile !== null) {
			let listName = document.getElementById("username");
			let listMail = document.getElementById("email");
			let listDate = document.getElementById("dateJoined");
			let listCount = document.getElementById("count");
			let dateStr = `${props.profile.createdAt}`;
			let styledDate = `${dateStr.slice(5, 7)} / ${dateStr.slice(
				8,
				10
			)} / ${dateStr.slice(2, 4)}`;

			listName.textContent = props.profile.username;
			listMail.textContent = props.profile.email;
			listDate.textContent = styledDate;
			listCount.textContent = props.profile.taskCount;
		}
	}, [props.profile]);
	return (
		<div className="viewprofilebody">
			<Card
				body
				inverse
				style={{ backgroundColor: "#21292f8c", borderColor: "#21292f8c" }}
			>
				{" "}
				<h3>profile: </h3>
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
