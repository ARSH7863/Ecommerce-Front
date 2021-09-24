import React, { useState, useEffect } from "react";
import { getCategories, list } from "./apiCore";
import CardDetails from "./CardDetails";
import Loader from "../Loader/Loader";
import "../assets/css/search.css";

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
				<h5 className="mt-4 mb-4 text-center">
					{searchMessage(searched, results)}
				</h5>
				<div className="container-fluid">
					<div className="row">
						{results.map((product, i) => (
							<div className="col-md-3 col-12">
								<CardDetails key={i} product={product} />
							</div>
						))}
					</div>
				</div>
			</div>
		);
	};

	const searchForm = () => (
		<form onSubmit={searchSubmit}>
			<h5 className="mb-4 text-center">Search Products Here!!!</h5>
			{/* <div className="d-flex justify-content-center input-group">
				<div className="ml-5 d-none d-sm-block">
					<select
						className="btn btnSelect default"
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

				<div className="ml-1">
					<input
						type="search"
						className="form-control"
						onChange={handleChange("search")}
						placeholder="Search by name"
					/>

					<div class="input-group-append">
						<span class="input-group-text">.00</span>
					</div>
				</div> */}
			<div className="container">
				<div class="input-group mb-3">
					<select
						className="btn btnSelect default  bg-light"
						onChange={handleChange("category")}
					>
						<option value="All">All</option>
						{categories.map((c, i) => (
							<option key={i} value={c._id}>
								{c.name}
							</option>
						))}
					</select>
					<input
						type="search"
						className="form-control"
						onChange={handleChange("search")}
						placeholder="Search by name"
					/>
					<div class="input-group-append">
						<span class="input-group-text bg-light">
							{/* <img src="https://img.icons8.com/color/24/000000/search--v3.png" /> */}
							<button
								className="btn px-3 py-1 input-group-text bg-light"
								style={{ borderRadius: "58%" }}
							>
								<img
									src="https://img.icons8.com/color/24/000000/search--v3.png"
									alt="search"
								/>
							</button>
						</span>
					</div>
				</div>
			</div>

			{/* <div className="col-md-1 col-3 ">
					<div style={{ border: "none" }}>
						<button
							className="btn px-3 py-1"
							style={{ borderRadius: "58%", marginRight: "70px" }}
						>
							<img src="https://img.icons8.com/color/24/000000/search--v3.png" />
						</button>
					</div>
				</div> */}
			{/* </div> */}
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
						<div className="container-fluid mb-3 ">
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
