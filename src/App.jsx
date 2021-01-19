import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import PageAccess from "./components/Pageaccess";
import Auth from "./components/Auth";

function App() {
	const [sessionToken, setSessionToken] = useState(undefined);
	return (
		<div className="pageaccess-container App">
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
