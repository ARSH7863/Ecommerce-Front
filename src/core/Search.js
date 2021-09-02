import React, { useState, useEffect } from "react";
import { getCategories, list } from "./apiCore";
import CardDetails from "./CardDetails";
import Loader from "../Loader/Loader";

const Search = () => {
	const [data, setData] = useState({
		categories: [],
		category: "",
		search: "",
		results: [],
		searched: false,
	});
	const [loading, setLoading] = useState(false);

	const { categories, category, search, results, searched } = data;

	const loadCategories = () => {
		getCategories().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setData({ ...data, categories: data });
			}
		});
	};

	useEffect(() => {
		loadCategories();
	}, []);

	const searchData = () => {
		// console.log(search, category);

		if (search) {
			setLoading(true);
			list({ search: search || undefined, category: category }).then(
				(response) => {
					if (response.error) {
						console.log(response.error);
						setLoading(false);
					} else {
						setData({ ...data, results: response, searched: true });
						setLoading(false);
					}
				}
			);
		}
	};

	const searchSubmit = (e) => {
		e.preventDefault();
		searchData();
	};

	const handleChange = (name) => (event) => {
		setData({ ...data, [name]: event.target.value, searched: false });
	};

	const searchMessage = (searched, results) => {
		if (searched && results.length > 0) {
			return `Found ${results.length} products`;
		}
		if (searched && results.length < 1) {
			return `No products found`;
		}
	};

	const searchedProducts = (results = []) => {
		return (
			<div>
				<h2 className="mt-4 mb-4">{searchMessage(searched, results)}</h2>

				<div className="row">
					{results.map((product, i) => (
						<div className="col-md-3 col-12 mb-3">
							<CardDetails key={i} product={product} />
						</div>
					))}
				</div>
			</div>
		);
	};

	const searchForm = () => (
		<form onSubmit={searchSubmit}>
			<div className="row">
				<div className="col-md-2 d-none d-sm-block">
					<select
						className="btn btn-outline-secondary"
						onChange={handleChange("category")}
					>
						<option value="All">All</option>
						{categories.map((c, i) => (
							<option key={i} value={c._id}>
								{c.name}
							</option>
						))}
					</select>
				</div>
				<div className="col-md-9 col-8">
					<input
						type="search"
						className="form-control"
						onChange={handleChange("search")}
						placeholder="Search by name"
					/>
				</div>
				<div className="col-md-1 col-3">
					<div className="" style={{ border: "none" }}>
						<button className="btn">Search</button>
					</div>
				</div>
			</div>
		</form>
	);

	return (
		<>
			{loading ? (
				<>
					<Loader />
				</>
			) : (
				<>
					<div className="row pt-5">
						<div className="container-fluid mb-3 text-center">
							{searchForm()}

							{searchedProducts(results)}
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Search;
