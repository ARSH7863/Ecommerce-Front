import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { isAuthenticated } from "../auth";
import moment from "moment";
import {
	listOrders,
	getStatusValues,
	updateOrderStatus,
} from "../admin/apiAdmin";
import Loader from "../Loader/Loader";

export default function OrderDetails() {
	const [orders, setOrders] = useState([]);
	const [id, setId] = useState("hii");
	const [loading, setLoading] = useState(true);
	const [statusValues, setStatusValues] = useState([]);
	const location = useLocation();

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
					{orders.map((o, oIndex) => (
						<>
							{id === o._id ? (
								<>
									<div
										className="mt-5 container"
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
								</>
							) : null}
						</>
					))}
				</>
			)}
		</>
	);
}
