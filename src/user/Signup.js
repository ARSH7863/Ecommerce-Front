import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signup } from "../auth";
import Menu from "../core/Menu";
import { FiSend } from "react-icons/fi";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, success, error } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    console.log(name, email, password);
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
    });
  };

  const signUpForm = () => (
    // <div className="row p-2">
    // 	<div className="col-sm-12 ml-4">
    // 		<form>
    // 			<div className="form-group">
    // 				<label className="text-muted">Name</label>
    // 				<input
    // 					onChange={handleChange("name")}
    // 					type="text"
    // 					className="form-control"
    // 					value={name}
    // 					placeholder="Enter Your Name:"
    // 					required
    // 				/>
    // 			</div>

    // 			<div className="form-group">
    // 				<label className="text-muted">Email</label>
    // 				<input
    // 					onChange={handleChange("email")}
    // 					type="email"
    // 					className="form-control"
    // 					value={email}
    // 					placeholder="Enter Your Email:"
    // 					required
    // 				/>
    // 			</div>

    // 			<div className="form-group">
    // 				<label className="text-muted">Password</label>
    // 				<input
    // 					onChange={handleChange("password")}
    // 					type="password"
    // 					className="form-control"
    // 					value={password}
    // 					placeholder="Enter Your Password:"
    // 					required
    // 				/>
    // 			</div>
    // 			<div className="row">
    // 				<div className="col-5"></div>
    // 				<div className="col-5">
    // 					<button onClick={clickSubmit} className="btn btn-primary">
    // 						Submit
    // 					</button>
    // 				</div>
    // 				<div className="col-2"></div>
    // 			</div>
    // 		</form>
    // 	</div>
    // </div>
    <>
      <div class="row justify-content-center">
        <div class="box shadow p-4">
          <h4 className="text-center pt-3">SignUp</h4>

          <div className="col-sm-12 ml-2 mr-5">
            <form>
              <div className="form-group pt-2">
                <label className="text-muted">Name</label>
                <input
                  onChange={handleChange("name")}
                  type="text"
                  className="form-control"
                  value={name}
                />
              </div>

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
              {/* <div className="text-center pl-5 pt-4">
                Don't Have an Account?{" "}
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  Sign Up
                </Link>
              </div> */}
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

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      New account is created. Please <Link to="/signin">Signin</Link>
    </div>
  );

  return (
    // <Layout
    //   title="Signup"
    //   descripton={`Please SignUp or Register`}
    //   className="container col-md-8 offset-md-2"
    // >
    <>
      <Menu />
      {/* <br />
      <h5 className="pl-1 pt-3">Please SignUp or Register</h5>
      <hr /> */}
      {showSuccess()}
      {showError()}
      {signUpForm()}
    </>
    // </Layout>
  );
};

export default Signup;
