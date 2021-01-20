import React, {
	useState,
	useEffect,
	memo,
	createContext,
	useContext,
} from "react";
import "./Pageaccess.css";
import { Button } from "reactstrap";
import { BrowserRouter as Router } from "react-router-dom";
import UserSidebar from "./user-sidebar/UserSidebar";
import View from "./lists/View.jsx";
import APIURL from "../helpers/environment";

export default function ListAccess(props) {
	const [tasks, setTasks] = useState([]);
	const [lists, setLists] = useState([]);
	const [currentList, setCurrentList] = useState(undefined);
	const [profile, setProfile] = useState(null);

	useEffect(() => {
		profileFetch().then(() => listFetch());
		//findDefaultList();
	}, []);

	const profileFetch = async () => {
		const response = await fetch(`${APIURL}/user/profile`, {
			method: "GET",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: props.sessionToken,
			}),
		});
		const profile = await response.json();
		setProfile(profile.user);
	};
	const listFetch = async () => {
		const response = await fetch(`${APIURL}/list/yours`, {
			method: "GET",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: props.sessionToken,
			}),
		});
		const userLists = await response.json();
		if (userLists.lists.length === (0 || undefined)) {
			fetch(`${APIURL}/list`, {
				method: "POST",
				headers: new Headers({
					"Content-Type": "application/json",
					Authorization: props.sessionToken,
				}),
				body: JSON.stringify({ list: { title: "general" } }),
			}).then((response) => {
				if (response.ok === true) {
					listFetch();
				} else {
					console.log("create first list failed");
				}
			});
		} else {
			return setLists(userLists.lists);
		}
		//console.log("current userLists: ", userLists);
	};

	/* const getSelectedList = (listId) => {
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
				props.setTasks(final.tasks);
			});
		return;
	}; */

	return (
		<ExecuProvider>
			<div className="listaccess-div">
				<Router>
					<UserSidebar
						setSessionToken={props.setSessionToken}
						sessionToken={props.sessionToken}
						profile={profile}
						setProfile={setProfile}
						sidebarFetch={profileFetch}
					/>
				</Router>

				<View
					sessionToken={props.sessionToken}
					tasks={tasks}
					setTasks={setTasks}
					lists={lists}
					setLists={setLists}
					currentList={currentList}
					setCurrentList={setCurrentList}
					profileFetch={profileFetch}
					profile={profile}
				/>
				<br />
			</div>
		</ExecuProvider>
	);
}

const ExecuContext = createContext();

function ExecuProvider({ children }) {
	
}