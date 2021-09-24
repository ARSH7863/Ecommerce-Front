import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import Menu from "../core/Menu";
import { FiUpload } from "react-icons/fi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { createProduct, getCategories } from "./apiAdmin";
import "../assets/css/AddProduct.css";

const AddProduct = () => {
	const [values, setValues] = useState({
		name: "",
		description: "",
		price: "",
		categories: [],
		category: "",
		shipping: "",
		quantity: "",
		photo: "",
		expectedDeliveryDate: "",
		loading: false,
		error: "",
		createdProduct: "",
		redirectToProfile: false,
		formData: "",
	});

	const { user, token } = isAuthenticated();
	const {
		name,
		description,
		price,
		categories,
		// category,
		// shipping,
		quantity,
		expectedDeliveryDate,
		loading,
		error,
		createdProduct,
		// redirectToProfile,
		formData,
	} = values;

	// load categories and set form data
	const init = () => {
		getCategories().then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({
					...values,
					categories: data,
					formData: new FormData(),
				});
			}
		});
	};

	useEffect(() => {
		init();
	}, []);

	const handleChange = (name) => (event) => {
		const value = name === "photo" ? event.target.files[0] : event.target.value;
		formData.set(name, value);
		setValues({ ...values, [name]: value });
	};

	const clickSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: "", loading: true });

		createProduct(user._id, token, formData).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({
					...values,
					name: "",
					description: "",
					photo: "",
					price: "",
					quantity: "",
					loading: false,
					createdProduct: data.name,
					expectedDeliveryDate: "",
				});
			}
			console.log(values);
		});
	};

	const newPostForm = () => (
		<form className="mb-3" onSubmit={clickSubmit}>
			<div className="form-group">
				<label className="text-muted">Name</label>
				<input
					onChange={handleChange("name")}
					type="text"
					className="form-control"
					value={name}
				/>
			</div>

			<div className="form-group">
				<label className="text-muted">Description</label>
				<textarea
					onChange={handleChange("description")}
					className="form-control"
					value={description}
				/>
			</div>

			<div className="form-group">
				<label className="text-muted">Price</label>
				<input
					onChange={handleChange("price")}
					type="number"
					className="form-control"
					value={price}
				/>
			</div>

			<div className="form-group">
				<label className="text-muted">Category</label>
				<select onChange={handleChange("category")} className="form-control">
					<option>Please select</option>
					{categories &&
						categories.map((c, i) => (
							<option key={i} value={c._id}>
								{c.name}
							</option>
						))}
				</select>
			</div>

			<div className="form-group">
				<label className="text-muted">Shipping</label>
				<select onChange={handleChange("shipping")} className="form-control">
					<option>Please select</option>
					<option value="0">No</option>
					<option value="1">Yes</option>
				</select>
			</div>

			<div className="form-group">
				<label className="text-muted">Quantity</label>
				<input
					onChange={handleChange("quantity")}
					type="number"
					className="form-control"
					value={quantity}
				/>
			</div>

			<div className="form-group">
				<label className="text-muted">Expected Delivery Date</label>
				<input
					onChange={handleChange("expectedDeliveryDate")}
					type="number"
					className="form-control"
					value={expectedDeliveryDate}
				/>
			</div>
			<br />
			<div className="form-group">
				<label className="btn btn-primary ">
					Upload Photo <FiUpload />
					<input
						onChange={handleChange("photo")}
						type="file"
						name="photo"
						accept="image/*"
						hidden
					/>
				</label>
				<p>{values.photo.name}</p>
			</div>
			<br />
			<div className="text-center">
				<button className="btn btn-outline-primary">
					Create Product <AiOutlinePlusCircle size="18" />
				</button>
			</div>
		</form>
	);

	const showError = () => (
		<div
			className="alert alert-danger"
			style={{ display: error ? "" : "none" }}
		>
			{error}
		</div>
	);

	const showSuccess = () => (
		<div
			className="alert alert-info"
			style={{ display: createdProduct ? "" : "none" }}
		>
			<h2>{`${createdProduct}`} is created!</h2>
		</div>
	);

	const showLoading = () =>
		loading && (
			<div className="alert alert-success">
				<h2>Loading...</h2>
			</div>
		);

	return (
		// <>
		// 	{/* <Layout title="Add a new product." descripton={`G'DAY ${user.name} , Ready to Add A New Product?`}> */}
		// 	<Menu />
		// 	<br />

		// 	<div className="row ">
		// 		<div className="col-md-8 offset-md-2">
		// 			<h5 className="pl-0">
		// 				Good Day {user.name} , Ready to Add A New Product?
		// 			</h5>
		// 			<hr />
		// 			{showLoading()}
		// 			{showSuccess()}
		// 			{showError()}
		// 			{newPostForm()}
		// 		</div>
		// 	</div>

		// 	{/* </Layout> */}
		// </>
		<div class="row justify-content-center rowAddProduct">
			<div class="AddProductbox shadowAddProduct p-3">
				<Menu />
				<br />

				<div className="row ">
					<div className="col-md-10 offset-md-1">
						<h5 className="pl-0">Create New Product Here...</h5>
						<br />
						{showLoading()}
						{showSuccess()}
						{showError()}
						{newPostForm()}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddProduct;
