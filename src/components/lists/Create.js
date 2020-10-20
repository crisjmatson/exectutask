import React from "react";
import { Formik } from "formik";
import { Button, Form, Input, FormGroup, Label, Container } from "reactstrap";

function Create() {
	return (
		<Container>
			<Formik
				initialValues={{
					title: "",
					description: "",
					time_est: null,
					due: null,
				}}
				onSubmit={(values, actions) => {
					setTimeout(() => {
						alert(JSON.stringify(values, null, 2));
						actions.setSubmitting(false);
					}, 1000);
				}}
			>
				{(props) => (
					<Form onSubmit={props.handleSubmit}>
						<FormGroup>
							<Label for="title">Title</Label>
							<Input
								type="text"
								name="title"
								id="create-title"
								placeholder="task title"
								onChange={props.handleChange}
								onBlur={props.handleBlur}
								value={props.values.title}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="description">description (optional)</Label>
							<Input
								type="text"
								name="description"
								id="create-description"
								placeholder="task description"
								onChange={props.handleChange}
								onBlur={props.handleBlur}
								value={props.values.description}
							/>
						</FormGroup>

						<FormGroup>
							<Label for="time_est">
								time estimate (optional: answer in minutes)
							</Label>
							<Input
								type="number"
								name="time_est"
								id="create-time_est"
								placeholder="task time_est"
								onChange={props.handleChange}
								onBlur={props.handleBlur}
								value={props.values.time_est}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="time_est">due date (optional)</Label>
							<Input
								type="datetime-local"
								name="due"
								id="create-due"
								placeholder="task due"
								onChange={props.handleChange}
								onBlur={props.handleBlur}
								value={props.values.due}
							/>
						</FormGroup>

						{props.errors.name && <div id="feedback">{props.errors.name}</div>}
						<Button type="submit">Submit</Button>
					</Form>
				)}
			</Formik>
		</Container>
	);
}

export default Create;
