import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";
import Menu from "../core/Menu";

const ManageProducts = () => {
	const [products, setProducts] = useState([]);

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
			<br />
			<div class="row justify-content-center rowAddProduct">
				<div class="AddProductbox shadowAddProduct p-3">
					<div className="row">
						<div className="col-12">
							<h5 className="">
								Good Day {user.name}, You can Manage Your Products Here
							</h5>
							<hr />
							<h2 className="text-center">Total {products.length} products</h2>
							<hr />
							<ul className="list-group">
								{products.map((p, i) => (
									<li
										key={i}
										className="list-group-item d-flex justify-content-between align-items-center"
									>
										<strong>{p.name}</strong>
										<Link to={`/admin/product/update/${p._id}`}>
											<span className="badge badge-warning badge-pill">
												Update
											</span>
										</Link>
										<span
											onClick={() => destroy(p._id)}
											className="badge badge-danger badge-pill"
										>
											Delete
										</span>
									</li>
								))}
							</ul>
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
