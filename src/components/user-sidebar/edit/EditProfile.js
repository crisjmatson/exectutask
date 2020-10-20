import React, { useEffect, useState } from "react";
import {
	Button,
	Card,
	Form,
	FormGroup,
	FormText,
	Input,
	Label,
} from "reactstrap";
import APIURL from "../../../helpers/environment";
import "./EditProfile.css";

const EditProfile = (props) => {
	//let backToProfile = props.backToProfile;
	//let setBackToProfile = props.setBackToProfile;
	const [newEmail, setNewEmail] = useState();
	const [newName, setNewName] = useState();
	const [editSelect, setEditSelect] = useState(); //selects edit name
	const [newValue, setNewValue] = useState(); //sets new edit value

	useEffect(() => {
		editfetch().catch((err) => console.log(err));
		return () => {
			let placeholder = "it-sa me";
		};
	}, [newEmail, newName]);

	const preFetch = (e, selection, editInput) => {
		e.preventDefault();
		const usernameReg = /(?!\+|\]|\[|\{|\}|\<|\>)(?=[a-zA-z0-9\-\_])(^\w+)((\w|\-){4,})([a-zA-Z0-9]+$)/gi;
		const emailReg = /(?!(\+))(^\S{1,})(\@{1})([a-z0-9\-]{1,})(\.{1})(?:(com|org|edu|co\.uk|fr|.net|bk|ur)$)/gi;
		if (selection === "username" && editInput.match(usernameReg)) {
			setNewName(editInput);
		} else if (selection === "email" && editInput.match(emailReg)) {
			setNewEmail(editInput);
		} else {
			alert("request not complete.");
		}
	};

	const editfetch = async () => {
		let response = await fetch(`${APIURL}/user/edit`, {
			method: "PUT",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: props.sessionToken,
			}),
			body: JSON.stringify({ user: { mail: newEmail, name: newName } }),
		});
		let update = await response.json();
		if (update[0] === 1) {
			alert(`user ${editSelect} updated.`);
		}
	};

	return (
		<div className="editprofile-body">
			<Card
				body
				inverse
				style={{ backgroundColor: "#21292f8c", borderColor: "#21292f8c" }}
			>
				<Form onSubmit={(event) => preFetch(event, editSelect, newValue)}>
					<h3>edit profile</h3>
					<FormGroup>
						<Label for="edit select">select edit:</Label>
						<Input
							type="select"
							name="select"
							id="exampleSelect"
							onChange={(e) => setEditSelect(e.target.value)}
						>
							<option> -select- </option>
							<option>username</option>
							<option>email</option>
							{/* <option>password</option> */}
						</Input>
					</FormGroup>
					<FormGroup>
						<Label for="exampleEmail">enter update below: </Label>
						<Input onChange={(e) => setNewValue(e.target.value)} required />
						<FormText className="editprofile-formtext">
							{editSelect === "username" ? (
								<p>
									username should be at least 4 or more characters and needs to
									include at least one(1) number or special character.
								</p>
							) : editSelect === "email" ? (
								<p>please enter a valid email address</p>
							) : (
								<p></p>
							)}
						</FormText>
					</FormGroup>
					<FormGroup>
						<Button type="submit">submit user change</Button>
						<Button
							className="editprofileExitBtn"
							onClick={() => props.setClosedRoute(true)}
						>
							exit
						</Button>
					</FormGroup>
				</Form>
			</Card>
		</div>
	);
};
export default EditProfile;
