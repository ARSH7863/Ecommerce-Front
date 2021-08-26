import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import CardDetails from "./CardDetails";
import Search from "./Search";

const Home = () => {
	const [productsBySell, setProductsBySell] = useState([]);
	const [productsByArrival, setProductsByArrival] = useState([]);
	const [error, setError] = useState(false);

	const loadProductsBySell = () => {
		getProducts("sold").then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setProductsBySell(data);
			}
		});
	};

	const loadProductsByArrival = () => {
		getProducts("createdAt").then((data) => {
			console.log(data);
			if (data.error) {
				setError(data.error);
			} else {
				setProductsByArrival(data);
			}
		});
	};

	useEffect(() => {
		loadProductsByArrival();
		loadProductsBySell();
	}, []);

	return (
		<Layout
			title="FullStack React Node MongoDB Ecommerce App"
			descripton={`Node React Ecommerce App .`}
			className="container-fluid"
		>
			<Search />
			<h2 className="mb-4">New Arrivals</h2>
			<div className="container-fluid">
				<div className="row">
					{productsByArrival.map((product, i) => (
						<div key={i} className="col-md-3 col-12 mb-3">
							<CardDetails product={product} />
						</div>
					))}
				</div>
			</div>

			<h2 className="mb-4">Best Sellers</h2>
			<div className="container-fluid">
				<div className="row">
					{productsBySell.map((product, i) => (
						<div key={i} className="col-md-3 col-12 mb-3">
							<CardDetails product={product} />
						</div>
					))}
				</div>
			</div>
		</Layout>
	);
};

export default Home;
