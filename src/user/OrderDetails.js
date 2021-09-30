import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link, useHistory } from "react-router-dom";
import { isAuthenticated } from "../auth";
import moment from "moment";
import "../assets/css/OrderDetails.css";
import {
	listOrders,
	getStatusValues,
	updateOrderStatus,
} from "../admin/apiAdmin";
import Loader from "../Loader/Loader";

export default function OrderDetails() {
	const [orders, setOrders] = useState([]);
	const [id, setId] = useState("hii");
	const [loading, setLoading] = useState(false);
	const [statusValues, setStatusValues] = useState([]);
	const location = useLocation();
	const history = useHistory();

	const { user, token } = isAuthenticated();

	const loadOrders = () => {
		setLoading(true);
		listOrders(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
				setLoading(false);
			} else {
				setOrders(data);
				setLoading(false);
			}
		});
	};

	const loadStatusValues = () => {
		getStatusValues(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setStatusValues(data);
			}
		});
	};

	const showProduct = (product) => {
		history.push(`/product/${product}`);
	};
	const handleStatusChange = (e, orderId) => {
		updateOrderStatus(user._id, token, orderId, e.target.value).then((data) => {
			if (data.error) {
				console.log("Status update failed");
			} else {
				loadOrders();
			}
		});
	};

	const showStatus = (o) => (
		<div className="form-group">
			<h5 className=" mb-4">
				Status:
				{o.status === "Not processed" ? (
					<span className="text-danger"> {o.status}</span>
				) : null}
				{o.status === "Processing" ? (
					<span className="text-info"> {o.status}</span>
				) : null}
				{o.status === "Shipped" ? (
					<span className="text-info"> {o.status}</span>
				) : null}
				{o.status === "Delivered" ? (
					<span className=" text-success"> {o.status}</span>
				) : null}
				{o.status === "Cancelled" ? (
					<span className=" text-danger"> {o.status}</span>
				) : null}
			</h5>
			<div className="row">
				<div className="col-md-8">
					<select
						className="form-control"
						onChange={(e) => handleStatusChange(e, o._id)}
					>
						<option>Update Status</option>
						{statusValues.map((status, index) => (
							<option key={index} value={status}>
								{status}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);

	useEffect(() => {
		if (location.state && location.state.id) {
			setId(location.state.id);
			console.log(location.state.id);
		}

		loadOrders();
		loadStatusValues();
	}, [location.state]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<div class="row justify-content-center rowOrderDetails">
						<div class="shadowOrderDetails OrderDetailsbox p-3">
							{orders.map((o, oIndex) => (
								<>
									{id === o._id ? (
										<>
											<div className="mt-3 mb-3 container" key={oIndex}>
												<div className="row">
													<div className="col-md-8 col-12">
														<h5 className="ml-md-4 text-break">
															<i className="">Order ID: {o._id}</i>
														</h5>
														<hr />
														<div className="ml-md-4">{showStatus(o)}</div>
														<hr />
														<div className="ml-md-4 mb-sm-2">
															<span className="text-secondary">Address:</span>{" "}
															<br /> {o.address}
														</div>
													</div>
													<div className="col-md-4 col-12">
														<ul className="list-group mb-2">
															<h5 className="list-group-item text-center pt-3 pb-3 bg-primary text-white">
																Order Status
															</h5>

															<li className="list-group-item list-group-item-action">
																<span className="text-secondary">
																	Transaction ID: &nbsp;
																</span>
																{o.transaction_id}
															</li>

															<li className="list-group-item list-group-item-action">
																<span className="text-secondary">
																	Ordered by: &nbsp;
																</span>
																{o.user.name}
															</li>
															<li className="list-group-item list-group-item-action">
																<span className="text-secondary">
																	Ordered on: &nbsp;
																</span>
																{moment(o.createdAt).fromNow()}
															</li>
															<li className="list-group-item list-group-item-action">
																<span className="text-secondary">
																	Total Amount: &nbsp;
																</span>
																${o.amount}
															</li>
														</ul>
													</div>
												</div>

												<div className="row">
													<div className="col-md-1"></div>
													<div className="col-md-10">
														<hr />
														<h5 className="mt-4 text-center mb-4 font-italic">
															Total products in the order: {o.products.length}
														</h5>
														<ul className="list-group  list-unstyled ml-md-4">
															{o.products.map((p, pIndex) => (
																<li className="list-group-item list-group-item-action list-group-item-light">
																	<div className="" key={pIndex}>
																		<div className="row">
																			<div className="col-md-10 col-6">
																				<Link
																					className="productLink"
																					onClick={() => showProduct(p._id)}
																					style={{ textDecoration: "none" }}
																				>
																					<span className="font-weight-normal">
																						{pIndex + 1}. {p.name}
																					</span>
																				</Link>
																			</div>
																			<div className="col-md-2 col-6 font-weight-normal">
																				{p.count} x {p.price} =
																				{p.count * p.price}
																			</div>
																		</div>
																	</div>
																</li>
															))}
														</ul>

														<div className="float-right mr-4">
															<span className="font-italic mr-4">
																Total Amount:
															</span>
															${o.amount}
														</div>
													</div>
													<div className="col-md-1"></div>
												</div>
											</div>
										</>
									) : null}
								</>
							))}
						</div>
					</div>
				</>
			)}
		</>
	);
}
