import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth";
import Menu from "../core/Menu";
import Loader from "../Loader/Loader";
import "../assets/css/Signin.css";
import { FiSend } from "react-icons/fi";
import showPwdImg from "../assets/img/Password/red-eye.png";
import hidePwdImg from "../assets/img/Password/hide.png";

const Signin = ({ location }) => {
	const [values, setValues] = useState({
		email: "abcd@gmail.com",
		password: "abcd7863",
		error: "",
		loading: false,
		redirectToReferrer: false,
	});

	const [message, setMessage] = useState("");
	const [isRevealPwd, setIsRevealPwd] = useState(false);

	useEffect(() => {
		if (location.state && location.state.message) {
			setMessage(location.state.message);
		}
	}, [location.state]);

	const { email, password, loading, error, redirectToReferrer } = values;
	const { user } = isAuthenticated();

	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};

	const clickSubmit = (event) => {
		// console.log(name,email,password);
		event.preventDefault();

		setMessage("");
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
			{loading ? (
				<>
					<Loader />
				</>
			) : (
				<div class="row justify-content-center rowSignin">
					<div class="Signinbox shadowSignin p-4">
						<h4 className="text-center pt-3">Login</h4>

						<div className="col-sm-12 ml-2 mr-5">
							<form>
								{showError()}
								{message && (
									<div className="alert alert-info text-center">
										<img
											src="https://img.icons8.com/ios/24/000000/ok--v1.png"
											alt="success"
										/>
										&nbsp; {message}
									</div>
								)}
								<div className="form-group pt-2">
									<label className="text-muted">Email</label>
									<input
										required
										onChange={handleChange("email")}
										type="email"
										className="form-control"
										value={email}
									/>
								</div>

								<div className="form-group pt-2 pwd-container">
									<label className="text-muted">Password</label>
									<input
										required
										onChange={handleChange("password")}
										type={isRevealPwd ? "text" : "password"}
										className="form-control"
										value={password}
									/>
									<img
										height="20px"
										width="20px"
										title={isRevealPwd ? "Hide password" : "Show password"}
										src={isRevealPwd ? hidePwdImg : showPwdImg}
										onClick={() => setIsRevealPwd((prevState) => !prevState)}
										id="input_img"
										alt="eyes"
									/>
								</div>

								<div className="text-center pt-2">
									<button
										type="submit"
										onClick={clickSubmit}
										className="btn  btn-outline-primary"
									>
										Submit <FiSend />
									</button>
								</div>
								<div className="text-center pl-md-5 pt-4">
									Don't Have an Account?{" "}
									<Link to="/signup" style={{ textDecoration: "none" }}>
										Sign Up
									</Link>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}
		</>
	);

	const showError = () => (
		<div
			className="alert alert-danger text-center"
			style={{ display: error ? "" : "none" }}
		>
			<img
				src="https://img.icons8.com/office/23/000000/error.png"
				className="mb-1"
				alt="error"
			/>
			&nbsp;
			{error}
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

			{signInForm()}
			{redirectUser()}
		</>
	);
};

export default Signin;
