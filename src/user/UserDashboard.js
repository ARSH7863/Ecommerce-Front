import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { getPurchaseHistory } from "./apiUser";
import moment from "moment";
import Menu from "../core/Menu";
import colors from "../constants/colors";
import "../assets/css/UserDashboard.css";

const Dashboard = () => {
	const [history, setHistory] = useState([]);

	const {
		user: { _id, name, role },
	} = isAuthenticated();
	const token = isAuthenticated().token;

	const init = (userId, token) => {
		getPurchaseHistory(userId, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setHistory(data);
			}
		});
	};

	useEffect(() => {
		init(_id, token);
	}, []);

	// const userLinks = () => {
	// 	return (
	// 		<div className="card">
	// 			<h4 className="card-header">User Links</h4>
	// 			<ul className="list-group">
	// 				<li className="list-group-item">
	// 					<Link className="nav-link" to="/cart">
	// 						My Cart
	// 					</Link>
	// 				</li>
	// 				<li className="list-group-item">
	// 					<Link className="nav-link" to={`/profile/${_id}`}>
	// 						Update Profile
	// 					</Link>
	// 				</li>
	// 			</ul>
	// 		</div>
	// 	);
	// };

	// const userInfo = () => {
	// 	return (
	// 		<div className="card mb-5">
	// 			<h3 className="card-header">User Information</h3>
	// 			<ul className="list-group">
	// 				<li className="list-group-item">{name}</li>
	// 				<li className="list-group-item">{email}</li>
	// 				<li className="list-group-item">
	// 					{role === 1 ? "Admin" : "Registered User"}
	// 				</li>
	// 			</ul>
	// 		</div>
	// 	);
	// };

	const purchaseHistory = (history) => {
		console.log(history);
		return (
			<div className="card mb-5">
				<h3 className="card-header">Purchase history</h3>
				<ul className="list-group">
					<li className="list-group-item">
						{history.map((h, i) => {
							return (
								<div>
									<hr />
									{h.products.map((p, i) => {
										return (
											<div key={i}>
												<h6>Product name: {p.name}</h6>
												<h6>Product price: ${p.price}</h6>
											</div>
										);
									})}
									<h6>Purchased date: {moment(h.createdAt).fromNow()}</h6>
								</div>
							);
						})}
						{/* {JSON.stringify(history)} */}
					</li>
				</ul>
			</div>
		);
	};
	const firstLetter = name.charAt(0).toUpperCase();
	// description={`G'day ${name}!`}
	return (
		// <Layout
		//   title="Dashboard"
		//   descripton={`G'day ${name}!`}
		//   className="container-fluid"
		// >
		<>
			<Menu />
			<br />
			<div class="row justify-content-center rowUser">
				<div class="Userbox shadowUser p-4">
					<div className="row">
						<div className="col-md-11 col-9">
							<h5 className="">Hello, {name}</h5>
							<small> {role === 1 ? "Admin" : "Registered User"}</small>
						</div>
						<div className="col-md-1 col-3">
							<Link to={`/profile/${_id}`}>
								<OverlayTrigger
									overlay={<Tooltip id="tooltip-disabled">Profile</Tooltip>}
									placement="bottom"
								>
									<span className="d-inline-block">
										<button
											className="btn rounded-circle"
											style={{
												backgroundColor: colors[firstLetter],
												color: "white",
											}}
										>
											{firstLetter}
										</button>
									</span>
								</OverlayTrigger>
							</Link>
						</div>
					</div>

					<hr />
					<div className="container">
						<div className="row">
							<div className="col-md-5 col-12">
								<button
									className="btn"
									style={{
										margin: "4px 0px",
										borderRadius: "16px",
										padding: "10px 20px",
									}}
								>
									Your Orders
								</button>
							</div>
							<div className="col-md-5 col-12">
								<button
									className="btn"
									style={{
										margin: "4px 0px",
										borderRadius: "16px",
										padding: "10px 20px",
									}}
								>
									Update Profile
								</button>
							</div>
							<div className="col-md-2 col-12">
								<button
									className="btn"
									style={{
										margin: "4px 0px",
										borderRadius: "16px",
										padding: "10px 20px",
									}}
								>
									Your Account
								</button>
							</div>

							<div className="col-12">
								<hr />
								{purchaseHistory(history)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
		// </Layout>
	);
};

export default Dashboard;
