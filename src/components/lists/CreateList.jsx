import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap";
import APIURL from "../../helpers/environment";

function CreateList(props) {
	const [newListName, setNewListName] = useState("");

	useEffect(() => {
		console.log(newListName);
	}, [newListName]);

	const listCreateFetch = () => {
		fetch(`${APIURL}/list`, {
			method: "POST",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: props.sessionToken,
			}),
			body: JSON.stringify({ list: { title: newListName } }),
		}).then((response) => {
			if (response.ok === true) {
				//console//.log("list created!");
				props.listFetch();
				props.toggleNewListModal();
			} else {
				console.log("create first list failed");
			}
		});
	};

	return (
		<div>
			<Modal isOpen={props.listModal} toggle={props.toggleNewListModal}>
				<ModalHeader>enter list name</ModalHeader>
				<ModalFooter>
					<input
						type="text"
						placeholder="executask..."
						onChange={(e) => setNewListName(e.target.value)}
					></input>
					<Button color="primary" onClick={() => listCreateFetch()}>
						create new list
					</Button>
					{"             "}
					<Button color="secondary" onClick={props.toggleNewListModal}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
}

export default CreateList;
