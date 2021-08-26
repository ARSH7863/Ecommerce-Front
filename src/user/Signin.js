import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth";
import Menu from "../core/Menu";

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
		<div className="row p-2">
			<div className="col-sm-12 ml-4">
				<form>
					<div className="form-group">
						<label className="text-muted">Email</label>
						<input
							onChange={handleChange("email")}
							type="email"
							className="form-control"
							value={email}
						/>
					</div>

					<div className="form-group">
						<label className="text-muted">Password</label>
						<input
							onChange={handleChange("password")}
							type="password"
							className="form-control"
							value={password}
						/>
					</div>
					<div className="row">
						<div className="col-5"></div>
						<div className="col-5">
							<button onClick={clickSubmit} className="btn btn-primary">
								Submit
							</button>
						</div>
						<div className="col-2"></div>
					</div>
				</form>
			</div>
		</div>
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
