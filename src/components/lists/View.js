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
				console.log("task fetch: ", json); // ALWAYS RETURNS ERROR
				let sorted = json.tasks.sort((a, b) => {
					return a.updatedAt - b.updatedAt;
				});
				sorted.reverse();
				let finalSort = sorted.sort((a, b) => {
					return a.complete - b.complete;
				});
				return finalSort;
			})
			.then((tasks) => {
				props.setTasks(tasks);
			});
	};

	return (
		<Container style={styles.view}>
			<Display
				tasks={props.tasks}
				sessionToken={props.sessionToken}
				fetchTasks={fetchTasks}
				sidebarFetch={props.sidebarFetch}
				profile={props.profile}
			/>
		</Container>
	);
};

export default Radium(View);
