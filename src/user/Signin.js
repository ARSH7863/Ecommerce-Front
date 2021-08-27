import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth";
import Menu from "../core/Menu";
import "../user/Signin.css";
import { FiSend } from "react-icons/fi";

const Signin = () => {
	const [values, setValues] = useState({
		email: "abc@gmail.com",
		password: "abc7863",
		error: "",
		loading: false,
		redirectToReferrer: false,
	});

	const { email, password, loading, error, redirectToReferrer } = values;
	const { user } = isAuthenticated();

	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};

	const clickSubmit = (event) => {
		// console.log(name,email,password);
		event.preventDefault();
		setValues({ ...values, error: false, loading: true });
		signin({ email, password }).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error, loading: false });
			} else {
				authenticate(data, () => {
					setValues({
						...values,
						redirectToReferrer: true,
					});
				});
			}
		});
	};

	const signInForm = () => (
		<>
			<div class="row justify-content-center ">
				<div class="box shadow p-4">
					<h4 className="text-center pt-3">Login</h4>

					<div className="col-sm-12 ml-2 mr-5">
						<form>
							<div className="form-group pt-2">
								<label className="text-muted">Email</label>
								<input
									onChange={handleChange("email")}
									type="email"
									className="form-control"
									value={email}
								/>
							</div>

							<div className="form-group pt-2">
								<label className="text-muted">Password</label>
								<input
									onChange={handleChange("password")}
									type="password"
									className="form-control"
									value={password}
								/>
							</div>

							<div className="text-center pt-2">
								<button
									onClick={clickSubmit}
									className="btn  btn-outline-primary"
								>
									Submit <FiSend />
								</button>
							</div>
							<div className="text-center pl-5 pt-4">
								Don't Have an Account?{" "}
								<Link to="/signup" style={{ textDecoration: "none" }}>
									Sign Up
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);

	const showError = () => (
		<div
			className="alert alert-danger"
			style={{ display: error ? "" : "none" }}
		>
			{error}
		</div>
	);

	const showLoading = () =>
		loading && (
			<div className="alert alert-info">
				<h2>Loading...</h2>
			</div>
		);

	const redirectUser = () => {
		if (redirectToReferrer) {
			if (user && user.role === 1) {
				return <Redirect to="/admin/dashboard" />;
			} else {
				return <Redirect to="/user/dashboard" />;
			}
		}
		if (isAuthenticated()) {
			return <Redirect to="/" />;
		}
	};

	return (
		<>
			<Menu />

			{showLoading()}
			{showError()}
			{signInForm()}
			{redirectUser()}
		</>
	);
};

export default Signin;
