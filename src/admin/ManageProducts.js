import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { Link, useHistory } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";
import moment from "moment";
import Menu from "../core/Menu";
import "../assets/css/ManageProduct.css";

const ManageProducts = () => {
	const [products, setProducts] = useState([]);
	const history = useHistory();
	const { user, token } = isAuthenticated();

	const loadProducts = () => {
		getProducts().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setProducts(data);
			}
		});
	};

	const destroy = (productId) => {
		deleteProduct(productId, user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				loadProducts();
			}
		});
	};

	const showProduct = (product) => {
		history.push(`/product/${product}`);
	};

	useEffect(() => {
		loadProducts();
	}, []);

	return (
		// <Layout
		//   title="Manage Products"
		//   descripton={`Perform CRUD on products`}
		//   className="container-fluid"
		// >
		<>
			<Menu />

			<div class="row justify-content-center rowManageProduct">
				<div class="ManageProductbox shadowManageProduct p-3">
					<div className="row">
						<div className="col-12">
							<h5 className=" ml-2">Manage Products ({products.length})</h5>
							<br />
							{/* {products.map((p, i) => {
								const data = {
									columns: [
										{
											label: "Name",
											field: "name",
											sort: "asc",
											width: 150,
										},
										{
											label: "Position",
											field: "position",
											sort: "asc",
											width: 270,
										},
										{
											label: "Office",
											field: "office",
											sort: "asc",
											width: 200,
										},
										{
											label: "Age",
											field: "age",
											sort: "asc",
											width: 100,
										},
										{
											label: "Start date",
											field: "date",
											sort: "asc",
											width: 150,
										},
										{
											label: "Salary",
											field: "salary",
											sort: "asc",
											width: 100,
										},
									],
									rows: [
										{
											name: "Tiger Nixon",
											position: "System Architect",
											office: "Edinburgh",
											age: "61",
											date: "2011/04/25",
											salary: "$320",
										},
									],
								};
							})}
							<MDBDataTable striped responsive bordered small data={} /> */}
							<div class="table-responsive">
								<table class="table  table-hover">
									<thead className="table-primary">
										<tr>
											<th>Name</th>
											<th>Creation Date</th>
											<th>Update</th>
											<th>Delete</th>
										</tr>
									</thead>

									<tbody>
										{products.map((p, i) => (
											<tr>
												<td key={i}>
													<Link
														className="productLink"
														onClick={() => showProduct(p._id)}
														style={{ textDecoration: "none" }}
													>
														<span className="font-weight-normal ">
															{p.name}
														</span>
													</Link>
												</td>
												<td>{moment(p.createdAt).format("MMMM Do YYYY")}</td>
												<td>
													<Link to={`/admin/product/update/${p._id}`}>
														<button className="btn btn-sm btn-outline-warning btnSm pl-3 pr-3">
															Update
														</button>
													</Link>
												</td>

												<td>
													<button
														className="btn btn-sm btn-outline-danger btnSm pl-3 pr-3"
														onClick={() => destroy(p._id)}
													>
														Delete
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
							<br />
						</div>
					</div>
				</div>
			</div>
		</>
		// </Layout>
	);
};

export default ManageProducts;
