import React, { useState } from "react";
import Radium from "radium";
import {
	ListGroup,
	ListGroupItem,
	ListGroupItemHeading,
	ListGroupItemText,
	Badge,
	Button,
} from "reactstrap";
import APIURL from "../../helpers/environment";
import { FiCheckCircle, FiPenTool, FiXCircle } from "react-icons/fi";
import { GiCardRandom } from "react-icons/gi";
import Create from "./Create";

var styles = {
	createIconItem: {
		textAlign: "center",
	},
	createIcon: {
		width: "auto",
		height: "100px",
	},
	deleteTaskButton: {
		padding: 0,
	},
	timeBadge: {
		padding: 13,
	},
};

const Display = (props) => {
	const [showCreate, setShowCreate] = useState(false);
	const [showRandom, setShowRandom] = useState(false);
	const createToggle = () => {
		let current = showCreate;
		setShowCreate(!current);
	};
	const randomToggle = () => {
		setShowRandom(!showRandom);
	};

	function updateCompletion(id, status) {
		if (status === false) {
			let updateTask = {
				task: {
					complete: !status,
				},
			};
			fetch(`${APIURL}/task/update/${id}`, {
				method: "PUT",
				headers: new Headers({
					"Content-Type": "application/json",
					Authorization: props.sessionToken,
				}),
				body: JSON.stringify(updateTask),
			}).then((response) => {
				if (response.ok) {
					props.fetchTasks();
					updateUserTaskCount();
				} else alert("task not updated");
			});
		}
	}
	function updateUserTaskCount() {
		let update = {
			user: {
				count: props.profile.taskCount + 1,
			},
		};
		fetch(`${APIURL}/user/edit`, {
			method: "PUT",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: props.sessionToken,
			}),
			body: JSON.stringify(update),
		}).then((response) => {
			if (response.ok) {
				props.sidebarFetch();
			} else alert("user task count not updated", response);
		});
	}
	function deleteTask(id) {
		fetch(`${APIURL}/task/delete/${id}`, {
			method: "DELETE",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: props.sessionToken,
			}),
		}).then((response) => {
			if (response.ok) {
				props.fetchTasks();
			} else alert("task not updated");
		});
	}

	return (
		<span>
			<ListGroup>
				<ListGroupItem key="create" style={styles.createIconItem}>
					{showCreate ? (
						<div>
							<Create
								sessionToken={props.sessionToken}
								createToggle={createToggle}
								fetchTasks={props.fetchTasks}
							/>
						</div>
					) : (
						<span>
							<Button onClick={() => createToggle()}>
								{" "}
								<FiPenTool style={styles.createIcon} />{" "}
							</Button>
							{/* <Button onClick={() => randomToggle()}>
								{" "}
								<GiCardRandom style={styles.createIcon} />{" "}
							</Button> */}
						</span>
					)}
				</ListGroupItem>
				{props.tasks.map((task) => {
					return (
						<ListGroupItem key={task.id} active={task.complete}>
							{task.complete ? (
								<strike>
									<ListGroupItemHeading>
										{task.title}
										{"     			"}
									</ListGroupItemHeading>
								</strike>
							) : (
								<ListGroupItemHeading>
									{task.title}
									{"     			"}
								</ListGroupItemHeading>
							)}
							<ListGroupItemText>
								{task.description}
								<br />
								{task.due !== null ? (
									<span>due: {task.due}</span>
								) : (
									<span></span>
								)}
							</ListGroupItemText>
							<ListGroupItemText>
								<Badge style={styles.timeBadge} href="#" color="secondary">
									{task.time_estimate}
								</Badge>
								{"    "}
								{task.complete ? (
									<span></span>
								) : (
									<Button
										onClick={() => updateCompletion(task.id, task.complete)}
									>
										{" "}
										finished? <FiCheckCircle style={styles.deleteTaskButton} />
									</Button>
								)}
								{"    "}
								<Button onClick={() => deleteTask(task.id)}>
									<FiXCircle style={styles.deleteTaskButton} />
								</Button>
							</ListGroupItemText>
						</ListGroupItem>
					);
				})}
			</ListGroup>
		</span>
	);
};

export default Radium(Display);
