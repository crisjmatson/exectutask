import React, { useEffect } from "react";
import Radium from "radium";
import { Container } from "reactstrap";
import APIURL from "../../helpers/environment";
import Display from "./Display.jsx";

var styles = {
	view: {
		paddingTop: "10vh",
	},
};

const View = (props) => {
	useEffect(() => {
		fetchTasks();
		return () => {
			let fact = "egyptian mummies are rare because europeans ATE them";
			return;
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
			.then((json) => {
				let sorted = json.tasks.sort((a, b) => {
					return a.updatedAt - b.updatedAt;
				});
				sorted.reverse();
				let finalSort = sorted.sort((a, b) => {
					return a.complete - b.complete;
				});
				return finalSort;
				/* for (i = 0; i < sorted.length; i++) {
					if (sorted[i].complete) {
						sorted.splice(i, 1);
					}
				} */
			})
			.then((tasks) => {
				props.setTasks(tasks);
			});
	};

	return (
		<Container style={styles.view}>
			<h1>ALL tasks:</h1>
			<Display
				tasks={props.tasks}
				sessionToken={props.sessionToken}
				fetchTasks={fetchTasks}
			/>
		</Container>
	);
};

export default View;
