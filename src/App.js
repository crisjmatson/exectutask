import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Button } from "reactstrap";
import PageAccess from "./components/Pageaccess";
import Auth from "./components/Auth";
import APIURL from "./helpers/environment";

function App() {
	//const [sessionToken, setSessionToken] = useState(undefined);
	const [sessionToken, setSessionToken] = useState(
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDksImlhdCI6MTYwMzIxNDc3NiwiZXhwIjoxNjAzMzAxMTc2fQ.35JHrAxGAg2u8Dv6HkPZ00svNCNUGv4P6xoAeVmL8d0"
	);

	function testFetch() {
		fetch(`${APIURL}/user/test`, {
			method: "GET",
			headers: new Headers({
				"Content-Type": "application/json",
			}),
		}).then((response) => console.log(response));
	}

	return (
		<div className="pageaccess-container App">
			{/* <Button onClick={() => testFetch()}>test</Button> */}
			{sessionToken !== undefined ? (
				<PageAccess
					sessionToken={sessionToken}
					setSessionToken={setSessionToken}
				/>
			) : (
				<div className="auth-container">
					<Auth setSessionToken={setSessionToken} sessionToken={sessionToken} />
				</div>
			)}
		</div>
	);
}
export default App;
