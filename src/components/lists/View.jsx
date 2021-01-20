import React, { useState, useEffect } from "react";
import Radium from "radium";
import { Container, Button, ListGroupItem } from "reactstrap";
import APIURL from "../../helpers/environment";
import Display from "./Display.jsx";
import CreateList from "./CreateList";

var styles = {
	view: {
		paddingTop: "10vh",
	},
};

const View = (props) => {
	const [listModal, setListModal] = useState(false);

	useEffect(() => {
		findDefaultList();
	}, []);

	/* 	useEffect(() => {
		getSelectedList(props.currentList.id);
	}, [props.currentList]); */

	/* 	const findLists = () => {
		fetch(`${APIURL}/list/yours`, {
			method: "GET",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: props.sessionToken,
			}),
		})
			.then((response) => response.json())
			.then((json) => {
				props.setLists(json.lists);
				findDefaultList();
			});
		//findDefaultList();
	}; */
	const findDefaultList = () => {
		for (let i = 0; i < props.lists.length; i++) {
			if (props.lists[i].title === "general") {
				props.setCurrentList(props.lists[i]);
				getSelectedList(props.lists[i].id);
				//console.log("default list found: ", props.lists[i]);
			}
		}
	};
	const getSelectedList = (listId) => {
		// pulls tasks in selected list
		fetch(`${APIURL}/list/${listId}`, {
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
			})
			.then((final) => {
				//console.log("setting current tasks as: ", final.tasks);
				props.setTasks(final.tasks);
			});
		return;
	};

	const toggleNewListModal = () => {
		let current = listModal;
		setListModal(!current);
	};

	return (
		<Container style={styles.view}>
			<CreateList
				toggleNewListModal={toggleNewListModal}
				listModal={listModal}
				sessionToken={props.sessionToken}
				getSelectedList={getSelectedList}
			/>
			<ListGroupItem>
				{" "}
				select list:{" "}
				{props.lists.map((list) => {
					return (
						<span>
							<Button
								key={list.id}
								onClick={() => {
									//console.log("set list: ", list);
									//props.setCurrentList(list);
									getSelectedList(list.id);
								}}
							>
								{list.title}
							</Button>{" "}
						</span>
					);
				})}{" "}
				<Button onClick={() => toggleNewListModal()}>+</Button>
			</ListGroupItem>
			<Display
				tasks={props.tasks}
				sessionToken={props.sessionToken}
				lists={props.lists}
				setLists={props.setLists}
				profileFetch={props.profileFetch}
				profile={props.profile}
				currentList={props.currentList}
			/>
		</Container>
	);
};

export default Radium(View);
