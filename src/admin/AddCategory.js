import React, { useState } from "react";
import { isAuthenticated } from "../auth";
import { createCategory } from "./apiAdmin";
import Menu from "../core/Menu";
import { AiOutlinePlusCircle } from "react-icons/ai";
import "../assets/css/AddCategory.css";

const AddCategory = () => {
	const [name, setName] = useState("");
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);

	//destructure user and token from localStorage
	const { user, token } = isAuthenticated();

	const handleChange = (e) => {
		setError("");
		setName(e.target.value);
	};

	const clickSubmit = (e) => {
		e.preventDefault();
		setError("");
		setSuccess(false);
		//make request to api to create Category
		createCategory(user._id, token, { name }).then((data) => {
			if (data.error) {
				setError(true);
			} else {
				setError("");
				setSuccess(true);
			}
		});
	};

	const newCategoryForm = () => (
		<form onSubmit={clickSubmit}>
			<div className="form-group">
				<label className="text-muted">Name</label>
				<input
					type="text"
					className="form-control"
					onChange={handleChange}
					value={name}
					autoFocus
					required
				/>
			</div>
			<br />
			<div className="text-center">
				<button className="btn btn-outline-primary">
					<span>Create Category &nbsp;</span>
					<AiOutlinePlusCircle size="18" />
				</button>
			</div>
		</form>
	);

	const showSuccess = () => {
		if (success) {
			return <h3 className="text-success"> {name} is created </h3>;
		}
	};
	const showError = () => {
		if (error) {
			return <h3 className="text-danger"> Category should be unique. </h3>;
		}
	};

	return (
		// <Layout
		//     title="Add a new category."
		//     descripton={`G'DAY ${user.name} , Ready to Add A New Category?`}>
		// <>
		// 	<Menu />
		// 	<br />
		// 	<div className="row">
		// 		<div className="col-md-8 offset-md-2">
		// 			<h5 className="pl-0">
		// 				Good Day {user.name} , Ready to Add A New Category?
		// 			</h5>
		// 			<hr />
		// 			{newCategoryForm()}
		// 			{showSuccess()}
		// 			{showError()}
		// 			{goBack()}
		// 		</div>
		// 	</div>
		// </>
		// </Layout>

		<div class="row justify-content-center rowAddCategory">
			<div class="AddCategorybox shadowAddCategory p-3">
				<Menu />
				<br />
				<div className="row">
					<div className="col-md-10 offset-md-1">
						<h5 className="pl-0">Create New Category Here...</h5>
						<br />
						{newCategoryForm()}
						{showSuccess()}
						{showError()}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddCategory;
