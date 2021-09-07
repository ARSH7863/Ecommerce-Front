import React from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import Menu from "../core/Menu";

const AdminDashboard = () => {
	const {
		user: { _id, name, email, role },
	} = isAuthenticated();

	const adminLinks = () => {
		return (
			<div className="card pt-5">
				<h4 className="card-header">Admin Links</h4>
				<ul className="list-group">
					<li className="list-group-item">
						{" "}
						<Link className="nav-link" to="/create/category">
							Create Category
						</Link>{" "}
					</li>
					<li className="list-group-item">
						{" "}
						<Link className="nav-link" to="/create/product">
							Create Product
						</Link>{" "}
					</li>
					<li className="list-group-item">
						{" "}
						<Link className="nav-link" to="/admin/orders">
							View Orders
						</Link>{" "}
					</li>
					<li className="list-group-item">
						{" "}
						<Link className="nav-link" to="/admin/products">
							Manage Products
						</Link>{" "}
					</li>
				</ul>
			</div>
		);
	};

	const adminInfo = () => {
		return (
			<div className="card mb-5 pt-5">
				<h3 className="card-header">Admin Information</h3>
				<ul className="list-group">
					<li className="list-group-item"> {name} </li>
					<li className="list-group-item"> {email} </li>
					<li className="list-group-item">
						{" "}
						{role === 1 ? "Admin" : "Registered User"}{" "}
					</li>
				</ul>
			</div>
		);
	};

	return (
		<>
			<Menu />
			<br />
			<div className="row">
				<div className="col-3">{adminLinks()}</div>
				<div className="col-9">{adminInfo()}</div>
			</div>
		</>
	);
};

export default AdminDashboard;
