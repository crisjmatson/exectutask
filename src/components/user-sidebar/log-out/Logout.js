import React from "react";
import { Button, Card, CardTitle } from "reactstrap";
import "./Logout.css";

const Logout = (props) => {
	const logoutAlert = (event) => {
		event.preventDefault();
		props.setSessionToken(undefined);
		alert("Logged out of everest");
	};

	return (
		<div className="logout-body">
			<Card
				body
				inverse
				style={{ backgroundColor: "#21292f8c", borderColor: "#21292f8c" }}
			>
				<CardTitle>are you ready to log out?</CardTitle>
				<div className="logoutbuttondiv">
					<Button className="logout-btns" onClick={(e) => logoutAlert(e)}>
						yes
					</Button>
					<Button
						className="logout-btns"
						onClick={() => props.setClosedRoute(true)}
					>
						not yet
					</Button>
				</div>
			</Card>
		</div>
	);
};
export default Logout;
