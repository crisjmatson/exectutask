import React from "react";

const Display = (props) => {
	return (
		<div>
			{props.tasks.map((task) => {
				return (
					<ul key={task.id}>
						<li>{task.title}</li>
						<li>{task.description}</li>
						<li>{task.time_estimate}</li>
						<li>
							finished? {task.complete == "" ? <p>false</p> : <p>true</p>}
						</li>
						<hr />
					</ul>
				);
			})}
		</div>
	);
};

export default Display;
