import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { listOrders, getStatusValues, updateOrderStatus } from "./apiAdmin";
import moment from "moment";
import Menu from "../core/Menu";
import "../assets/css/Orders.css";

const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [statusValues, setStatusValues] = useState([]);

	const { user, token } = isAuthenticated();

	const loadOrders = () => {
		listOrders(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setOrders(data);
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

	useEffect(() => {
		loadOrders();
		loadStatusValues();
	}, []);

	const showOrdersLength = () => {
		if (orders.length > 0) {
			return (
				<h5 className="text-danger text-center">
					Total orders: {orders.length}
				</h5>
			);
		} else {
			return <h5 className="text-danger text-center">No orders</h5>;
		}
	};

	const showInput = (key, value) => (
		<div className="input-group mb-2 mr-sm-2">
			<div className="input-group-prepend">
				<div className="input-group-text">{key}</div>
			</div>
			<input type="text" value={value} className="form-control" readOnly />
		</div>
	);

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
			<h3 className="mark mb-4">Status: {o.status}</h3>
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
	);

	return (
		// <Layout
		//   title="Orders"
		//   descripton={`G'day ${user.name}, you can manage all the orders here`}
		//   className="container-fluid"
		// >
		<>
			<Menu />
			<div class="row justify-content-center rowOrders">
				<div class="shadowOrders Ordersbox p-3">
					<br />
					<div className="row">
						<div className="col-md-12 ">
							{showOrdersLength()}
							<hr />

							<div class="table-responsive">
								<table class="table  table-hover">
									<thead className="table-primary">
										<tr>
											<th>Id</th>
											<th>Order On</th>
											<th>Ordered By</th>
											<th>Status</th>
											<th>Total Products</th>
										</tr>
									</thead>
									<tbody>
										{orders.map((o, oIndex) => (
											<tr>
												<td key={oIndex}>
													<span className="font-weight-normal">{o._id}</span>
												</td>
												<td>
													<span className="font-weight-normal">
														{moment(o.createdAt).fromNow()}
													</span>
												</td>
												<td>
													<span className="font-weight-normal">
														{o.user.name}
													</span>
												</td>
												<td>
													{o.status === "Update Status" ? (
														<span className="font-weight-normal">Not set</span>
													) : (
														<span className="font-weight-normal">
															{o.status}
														</span>
													)}
												</td>
												<td>
													<span className="font-weight-normal text-success ml-5">
														{o.products.length}
													</span>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
							{orders.map((o, oIndex) => {
								return (
									<div
										className="mt-5"
										key={oIndex}
										style={{ borderBottom: "5px solid indigo" }}
									>
										<h6 className="text-center">
											<span className="text-secondary">Order ID: {o._id}</span>
										</h6>

										<ul className="list-group mb-2">
											<li className="list-group-item">{showStatus(o)}</li>
											<li className="list-group-item">
												Transaction ID: {o.transaction_id}
											</li>
											<li className="list-group-item">Amount: ${o.amount}</li>
											<li className="list-group-item">
												Ordered by: {o.user.name}
											</li>
											<li className="list-group-item">
												Ordered on: {moment(o.createdAt).fromNow()}
											</li>
											<li className="list-group-item">
												Delivery address: {o.address}
											</li>
										</ul>

										<h3 className="mt-4 mb-4 font-italic">
											Total products in the order: {o.products.length}
										</h3>

										{o.products.map((p, pIndex) => (
											<div
												className="mb-4"
												key={pIndex}
												style={{
													padding: "20px",
													border: "1px solid indigo",
												}}
											>
												{showInput("Product name", p.name)}
												{showInput("Product price", p.price)}
												{showInput("Product total", p.count)}
												{showInput("Product Id", p._id)}
											</div>
										))}
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</>
		// </Layout>
	);
};

export default Orders;
