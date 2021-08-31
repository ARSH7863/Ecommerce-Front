import React, { useState, useEffect } from "react";
import CardDetails from "./CardDetails.js";
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import { prices } from "./fixedPrices";
import RadioBox from "./Radiobox";
import Menu from "./Menu";
import "../assets/css/shop.css";
import Loader from "../Loader/Loader.js";

const Shop = () => {
	const [myFilters, setMyFilters] = useState({
		filters: { category: [], price: [] },
	});

	const [categories, setCategories] = useState([]);
	const [error, setError] = useState(false);
	const [limit, setLimit] = useState(0);
	const [skip, setSkip] = useState(0);
	const [size, setSize] = useState(0);
	const [filteredResults, setFilteredResults] = useState([]);
	const [loading, setLoading] = useState(false);

	// load categories and set form data
	const init = () => {
		setLoading(true);
		getCategories().then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setCategories(data);
			}
		});
		setLoading(false);
	};

	const loadFilteredResults = (newFilters) => {
		console.log(newFilters);
		const limit = 6;
		getFilteredProducts(skip, limit, newFilters).then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setFilteredResults(data.data);
				setSize(data.size);
				setSkip(0);
			}
		});
	};

	const loadMore = () => {
		let toSkip = skip + limit;
		// console.log(newFilters);
		setLoading(true);
		getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
			if (data.error) {
				setError(data.error);
				setLoading(false);
			} else {
				setFilteredResults([...filteredResults, ...data.data]);
				setSize(data.size);
				setSkip(toSkip);
				setLoading(false);
			}
		});
	};

	const loadMoreButton = () => {
		return (
			size > 0 &&
			size >= limit && (
				<button
					onClick={loadMore}
					className="btn btn-warning btn-lg mb-5 buttonLoad"
				>
					<span>Load more </span>
				</button>
			)
		);
	};

	useEffect(() => {
		setLoading(true);
		init();
		loadFilteredResults(skip, limit, myFilters.filters);
		setLoading(false);
	}, []);

	const handleFilters = (filters, filterBy) => {
		setLoading(true);
		console.log("SHOP", filters, filterBy);
		const newFilters = { ...myFilters };
		newFilters.filters[filterBy] = filters;

		if (filterBy === "price") {
			let priceValues = handlePrice(filters);
			newFilters.filters[filterBy] = priceValues;
		}
		loadFilteredResults(myFilters.filters);
		setMyFilters(newFilters);
		setLoading(false);
	};

	const handlePrice = (value) => {
		const data = prices;
		let array = [];

		for (let key in data) {
			if (data[key]._id === parseInt(value)) {
				array = data[key].array;
			}
		}
		return array;
	};

	return (
		// <Layout
		//   title="Shop Page"
		//   descripton="Search & Find Products of your Choice."
		//   className="container-fluid"
		// >
		<>
			<Menu />

			<h5 className="pl-3 pt-3">Search & Find Products of your Choice.</h5>
			<small className="pl-3">
				Our most popular products based on sales. Updated hourly.
			</small>
			<hr />
			<div className="row">
				<div className="col-md-4 col-12">
					<h4>Filter By Category</h4>
					<ul>
						<Checkbox
							categories={categories}
							handleFilters={(filters) => handleFilters(filters, "category")}
						/>
					</ul>
					<h4>Filter by price range</h4>
					<div>
						<RadioBox
							prices={prices}
							handleFilters={(filters) => handleFilters(filters, "price")}
						/>
					</div>
				</div>

				<div className="col-md-8 col-12">
					<h2 className="mb-4">Products</h2>
					{loading ? (
						<Loader />
					) : (
						<>
							<div className="row">
								{filteredResults.map((product, i) => (
									<div key={i} className="col-md-4 col-12 mb-3">
										<CardDetails product={product} />
									</div>
								))}
							</div>
						</>
					)}
					<hr />
					{loadMoreButton()}
				</div>
			</div>
		</>
		// </Layout>
	);
};

export default Shop;
