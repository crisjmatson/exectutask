import React, { useState } from "react";
import {
	Button,
	Form,
	Input,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	FormText,
} from "reactstrap";
import "./Auth.css";
import APIURL from "../helpers/environment";

const Auth = (props) => {
	const [clickAuth, setClickAuth] = useState(false);
	const [signUp, setSignUp] = useState(false);
	const [accessDenied, setAccessDenied] = useState(false);
	const [username, setUsername] = useState(null);
	const [password, setPassword] = useState(null);
	const [email, setEmail] = useState(null);

	const [emailValidate, setEmailValidate] = useState();

	const newUserForm = () => {
		setAccessDenied(false);
		setSignUp(!signUp);
	};

	const authClick = (e) => {
		e.preventDefault();
		setClickAuth(!clickAuth);
	};

	function authFunction(e) {
		e.preventDefault();
		if (signUp) {
			//regexVerification();
			signupFetch();
		} else {
			//console.log(userBody);
			signInFetch();
		}
	}

	const regexVerification = () => {
		const emailReg = /(?!(\+))(^\S{1,})(\@{1})([a-z0-9\-]{1,})(\.{1})(?:(com|org|edu|co\.uk|fr|.net|bk|ur)$)/gi;
		const usernameReg = /(?!\+|\]|\[|\{|\}|\<|\>)(?=[a-zA-z0-9\-\_])(^\w+)((\w|\-){4,})([a-zA-Z0-9]+$)/gi;
		const passwordReg = /(?!\{|\}\:|\;|\<|\>)([a-z0-9\-\_\@\#\$\%\&\?\!\.\,]{5,})/gi;
		if (
			email.match(emailReg) &&
			username.match(usernameReg) &&
			password.match(passwordReg)
		) {
			signupFetch().catch(() => {
				setAccessDenied(true);
				alert("user input not accepted.");
			});
		} else {
			setAccessDenied(true);
			alert("user input not accepted.");
		}
	};

	const evalEmail = (mail) => {
		console.log("eval call");
		const emailReg = /(?!(\+))(^\S{1,})(\@{1})([a-z0-9\-]{1,})(\.{1})(?:(com|org|edu|co\.uk|fr|.net|bk|ur)$)/gi;
		if (mail !== null && mail.length >= 1) {
			mail.match(emailReg) ? setEmailValidate(true) : setEmailValidate(false);
		}
	};

	const signInFetch = () => {
		let userSubmission = {
			user: {
				name: username,
				pass: password,
			},
		};
		fetch(`${APIURL}/user/signin`, {
			method: "POST",
			headers: new Headers({
				"Content-Type": "application/json",
			}),
			body: JSON.stringify(userSubmission),
		})
			.then((response) => response.json())
			.then((json) => {
				//console.log(json.sessionToken);
				props.setSessionToken(json.sessionToken);
			});
	};

	const signupFetch = async () => {
		let userBody = {
			user: {
				name: username,
				mail: email,
				pass: password,
			},
		};
		let response = await fetch(`${APIURL}/user/signup`, {
			method: "POST",
			headers: new Headers({
				"Content-Type": "application/json",
			}),
			body: JSON.stringify(userBody),
		});
		if (response.ok === true) {
			let json = await response.json();
			return props.setSessionToken(json.sessionToken);
		} else {
			return setAccessDenied(true);
		}
	};

	return (
		<div className="auth-outer-div">
			{clickAuth ? (
				<div className="auth-main-div">
					<div className="auth-form-div">
						<Form onSubmit={authFunction}>
							{signUp ? <h1>Sign Up</h1> : <h1>Log In</h1>}
							{accessDenied ? (
								<h3 className="auth-access-denied">access denied</h3>
							) : (
								<p></p>
							)}
							{signUp ? (
								<span>
									{/* OG EMAIL INPUT */}
									<InputGroup>
										<Input
											bsSize="md"
											type="email"
											size="40"
											placeholder="email"
											onChange={(e) => {
												setEmail(e.target.value);
											}}
											required
										/>
									</InputGroup>
									<br />
									{signUp ? (
										<p className="auth-formtext">please enter a valid email.</p>
									) : (
										<FormText></FormText>
									)}
								</span>
							) : (
								<span></span>
							)}
							<InputGroup>
								<InputGroupAddon addonType="prepend">
									<InputGroupText>@</InputGroupText>
								</InputGroupAddon>
								<Input
									label="username"
									bsSize="md"
									type="text"
									size="40"
									placeholder="username"
									onChange={(e) => setUsername(e.target.value)}
									required
								/>
							</InputGroup>
							<br />
							{signUp ? (
								<p className="auth-formtext">
									username should be at least 4 or more characters and needs to
									include at least one(1) number or special character.
								</p>
							) : (
								<span></span>
							)}
							<InputGroup>
								<InputGroupAddon addonType="prepend">
									<InputGroupText>
										<span role="img" aria-label="lock image">
											&#128274;
										</span>
									</InputGroupText>
								</InputGroupAddon>
								<Input
									type="password"
									size="30"
									placeholder="password"
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</InputGroup>
							<br />
							{signUp ? (
								<p className="auth-formtext">
									password should include 5 or more characters
								</p>
							) : (
								<FormText></FormText>
							)}
							<br />
							<br />
							<Button type="submit">sign in</Button>
							<br />
							<br />
							{signUp ? (
								<span>
									<Button onClick={() => newUserForm()}>back to login</Button>
								</span>
							) : (
								<Button
									className="auth-btn-signup"
									onClick={() => newUserForm()}
								>
									first time user?
								</Button>
							)}
						</Form>
					</div>
				</div>
			) : (
				<div className="auth-landing-logo">
					{/* <img
						className="auth-landing-logo"
						src="https://user-images.githubusercontent.com/68344211/93353776-4f2e0980-f80a-11ea-9f15-d3cdf44cccc5.png"
						alt="EVEREST logo"
					/> */}
					<h1 className="auth-logotext">Executask</h1>
					<Button className="auth-enter-button" onClick={(e) => authClick(e)}>
						LOG IN
					</Button>
				</div>
			)}
		</div>
	);
};

export default Auth;
