import React, { useEffect } from "react";
import { Container } from "reactstrap";
import APIURL from "../../helpers/environment";
import Display from "./Display.jsx";

const View = (props) => {
	useEffect(() => {
		fetchTasks();
		return () => {
			console.log("egyptian mummies are rare because europeans ATE them");
		};
	}, []);

	const fetchTasks = () => {
		fetch(`${APIURL}/task/yours`, {
			method: "GET",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: props.sessionToken,
			}),
		})
			.then((response) => response.json())
			.then((json) => props.setTasks(json.tasks));
	};

	return (
		<Container>
			<br />
			<br />
			<h1>ALL tasks:</h1>
			<Display tasks={props.tasks} />
		</Container>
	);
};

export default View;
