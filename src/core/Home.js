import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import CardDetails from "./CardDetails";
import Search from "./Search";
import Loader from "../Loader/Loader";

const Home = () => {
	const [productsBySell, setProductsBySell] = useState([]);
	const [productsByArrival, setProductsByArrival] = useState([]);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [loading2, setLoading2] = useState(false);

	const loadProductsBySell = () => {
		setLoading(true);
		getProducts("sold").then((data) => {
			if (data.error) {
				setError(data.error);
				setLoading(false);
			} else {
				setProductsBySell(data);
				setLoading(false);
			}
		});
	};

	const loadProductsByArrival = () => {
		setLoading2(true);
		getProducts("createdAt").then((data) => {
			console.log(data);
			if (data.error) {
				setError(data.error);
				setLoading2(false);
			} else {
				setProductsByArrival(data);
				setLoading2(false);
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
		>
			<Search />
			<h5 className="mb-4 text-center">New Arrivals</h5>
			{loading2 ? (
				<Loader />
			) : (
				<div className="container-fluid">
					<div className="row">
						{productsByArrival.map((product, i) => (
							<div key={i} className="col-md-3 col-12 mb-3">
								<CardDetails product={product} />
							</div>
						))}
					</div>
				</div>
			)}

			<h5 className="mb-4 text-center">Best Sellers</h5>
			{loading ? (
				<Loader />
			) : (
				<div className="container-fluid">
					<div className="row">
						{productsBySell.map((product, i) => (
							<div key={i} className="col-md-3 col-12 mb-3">
								<CardDetails product={product} />
							</div>
						))}
					</div>
				</div>
			)}
		</Layout>
	);
};

export default Home;
