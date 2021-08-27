import React, { useState } from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createCategory } from "./apiAdmin";
import Menu from "../core/Menu";

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
      <button className="btn btn-outline-primary">Create Category</button>
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

  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">
        Back to Dashboard
      </Link>
    </div>
  );

  return (
    // <Layout
    //     title="Add a new category."
    //     descripton={`G'DAY ${user.name} , Ready to Add A New Category?`}>
    <>
      <Menu />
      <br />
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h5 className="pl-0 pt-3">
            Good Day {user.name} , Ready to Add A New Category?
          </h5>
          <hr />
          {newCategoryForm()}
          {showSuccess()}
          {showError()}
          {goBack()}
        </div>
      </div>
    </>
    // </Layout>
  );
};

export default AddCategory;
