import React, { useState } from "react";
import Radium from "radium";
import {
	ListGroup,
	ListGroupItem,
	ListGroupItemHeading,
	ListGroupItemText,
	Badge,
	Input,
	Button,
} from "reactstrap";
import APIURL from "../../helpers/environment";
import { FiPenTool } from "react-icons/fi";
import Create from "./Create";

var styles = {
	createIconItem: {
		textAlign: "center",
	},
	createIcon: {
		width: "auto",
		height: "100px",
	},
};

const Display = (props) => {
	const [showCreate, setShowCreate] = useState(false);
	const createToggle = () => {
		setShowCreate(!showCreate);
	};
	function updateCompletion(id, status) {
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
			} else alert("task not updated");
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
				alert("task deleted");
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
						<Button onClick={() => createToggle()}>
							{" "}
							<FiPenTool style={styles.createIcon} />{" "}
						</Button>
					)}
				</ListGroupItem>
				{props.tasks.map((task) => {
					return (
						<ListGroupItem key={task.id} active={task.complete}>
							<ListGroupItemHeading>
								{task.title}
								{"     			"}
								<Badge href="#" color="secondary">
									{task.time_estimate}
								</Badge>
							</ListGroupItemHeading>
							<ListGroupItemText>
								{task.description}
								{" ---- 		"}
								<Input
									type="checkbox"
									name="completeTask"
									checked={task.complete}
									onChange={() => updateCompletion(task.id, task.complete)}
								/>
							</ListGroupItemText>
							<ListGroupItemText>
								<Button onClick={() => deleteTask(task.id)}>XXX</Button>
							</ListGroupItemText>
						</ListGroupItem>
					);
				})}
			</ListGroup>
		</span>
	);
};

export default Radium(Display);
