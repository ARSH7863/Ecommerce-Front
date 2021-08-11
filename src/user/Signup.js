import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signup } from "../auth";

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
    <div className="row p-2">
      <div className="col-sm-12 ml-4">
        <form>
          <div className="form-group">
            <label className="text-muted">Name</label>
            <input
              onChange={handleChange("name")}
              type="text"
              className="form-control"
              value={name}
              placeholder="Enter Your Name:"
              required
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Email</label>
            <input
              onChange={handleChange("email")}
              type="email"
              className="form-control"
              value={email}
              placeholder="Enter Your Email:"
              required
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Password</label>
            <input
              onChange={handleChange("password")}
              type="password"
              className="form-control"
              value={password}
              placeholder="Enter Your Password:"
              required
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

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      New account is created. Please <Link to="/signin">Signin</Link>
    </div>
  );

  return (
    <Layout
      title="Signup"
      descripton={`Please SignUp or Register`}
      className="container col-md-8 offset-md-2"
    >
      {showSuccess()}
      {showError()}
      {signUpForm()}
    </Layout>
  );
};

export default Signup;
