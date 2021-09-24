import React, { useState, useEffect } from "react";
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import { FiFilter } from "react-icons/fi";
import Menu from "./Menu";
import "../assets/css/shop.css";
import Loader from "../Loader/Loader.js";
import ProductCard from "./ProductCard.js";
import MultiRangeSlider from "../MultiRangeSlider/MultiRangeSlider";

const Shop = () => {
	const [myFilters, setMyFilters] = useState({
		filters: { category: [], price: [] },
	});
	// const [product, setProduct] = useState();

	const [categories, setCategories] = useState([]);
	const [error, setError] = useState(false);
	const [limit, setLimit] = useState(0);
	const [skip, setSkip] = useState(0);
	const [size, setSize] = useState(0);
	const [filteredResults, setFilteredResults] = useState([]);
	const [loading, setLoading] = useState(true);
	const [maximum, setMaximum] = useState(0);
	const [minimum, setMinimum] = useState(40);
	const [showAndHide, setShowAndHide] = useState(true);

	// load categories and set form data
	const init = () => {
		// setLoading(true);
		getCategories().then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setCategories(data);
			}
		});
		// setLoading(false);
	};

	const loadFilteredResults = (newFilters) => {
		// console.log(newFilters);
		setLoading(true);
		setLimit(6);
		getFilteredProducts(skip, limit, newFilters).then((data) => {
			if (data.error) {
				setError(data.error);
				setLoading(false);
			} else {
				setFilteredResults(data.data);
				setSize(data.size);
				setSkip(0);
				setLoading(false);
			}
		});
	};

	// const loadProduct = () => {
	// 	setLoading(true);
	// 	list().then((data) => {
	// 		if (data.error) {
	// 			setError(data.error);
	// 			setLoading(false);
	// 		} else {
	// 			setProduct(data);
	// 			setLoading(false);
	// 		}
	// 	});
	// };

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
					className="btn btn-warning btn-lg mb-5 ml-5 buttonLoad"
				>
					<span>Load more </span>
				</button>
			)
		);
	};

	useEffect(() => {
		// setLoading(true);
		init();
		// loadProduct();
		loadFilteredResults(skip, limit, myFilters.filters);
	}, []);

	const handleFilters = (filters, filterBy) => {
		setLoading(true);
		const newFilters = { ...myFilters };
		newFilters.filters[filterBy] = filters;
		loadFilteredResults(myFilters.filters);
		setMyFilters(newFilters);
	};

	const handleRange = (max, min) => {
		setMaximum(max);
		setMinimum(min);
	};

	const changeRange = () => {
		setLoading(true);
		let array = [];
		array[0] = minimum;
		array[1] = maximum;
		const newFilters = { ...myFilters };
		newFilters.filters.price = array;
		setMyFilters(newFilters);
		loadFilteredResults(myFilters.filters);
	};

	const HideShow = () => {
		if (showAndHide === true) {
			setShowAndHide(false);
		} else {
			setShowAndHide(true);
		}
	};

	// const FilterData = () => (
	// 	<div className="shadowFilter Filterbox">
	// 		<h5 className="text-center">Filter By Category</h5>
	// 		<ul>
	// 			<Checkbox
	// 				categories={categories}
	// 				handleFilters={(filters) => handleFilters(filters, "category")}
	// 			/>
	// 		</ul>
	// 		<h5 className="text-center">Filter by price range</h5>
	// 		<br />
	// 		<MultiRangeSlider
	// 			min={0}
	// 			max={40}
	// 			onChange={({ min, max }) => handleRange(max, min)}
	// 		/>
	// 		<br />
	// 		<br />
	// 		<div className="text-center">
	// 			<button className="btn btn-outline-info" onClick={changeRange}>
	// 				Filter <FiFilter size="15" />
	// 			</button>
	// 		</div>
	// 	</div>
	// );

	return (
		// <Layout
		//   title="Shop Page"
		//   descripton="Search & Find Products of your Choice."
		//   className="container-fluid"
		// >
		<div className="pt-5">
			<Menu />
			<h3 className="pl-3 pt-3 text-center d-block d-sm-none">
				Products <hr />
			</h3>
			<div className="row">
				<div className="col-md-2 col-12">
					<div className="row">
						<div className="ml-3 col-7">
							<span className="d-block d-xl-none d-lg-none">
								Click Here to {showAndHide ? "hide" : "see"} the filter
							</span>
						</div>
						<div className="col-4">
							<button
								onClick={HideShow}
								className="btn btn-info d-block d-xl-none d-lg-none"
								style={{ borderRadius: "25%" }}
							>
								{showAndHide ? "Hide" : "Show"}
							</button>
						</div>
					</div>
					<hr />
					<div className="sidebar">
						<div className="rowFilter justify-content-center">
							{showAndHide ? (
								<div className="shadowFilter Filterbox">
									<h5 className="text-center">Filter By Category</h5>
									<ul>
										<Checkbox
											categories={categories}
											handleFilters={(filters) =>
												handleFilters(filters, "category")
											}
										/>
									</ul>
									<h5 className="text-center">Filter by price range</h5>
									<br />
									<MultiRangeSlider
										min={0}
										max={40}
										onChange={({ min, max }) => handleRange(max, min)}
									/>
									<br />
									<br />
									<div className="text-center">
										<button
											className="btn btn-outline-info"
											onClick={changeRange}
										>
											Filter <FiFilter size="15" />
										</button>
									</div>
								</div>
							) : null}
						</div>
					</div>
				</div>

				<div className="col-md-10 col-12">
					{loading ? (
						<Loader />
					) : (
						<>
							{/* <div className="row">
								{filteredResults.map((product, i) => (
									<div key={i} className="col-md-12 col-12 mb-3">
										<ProductCard product={product} />
									</div>
								))}
							</div> */}
							<div className="content">
								<h3 className="pl-3 pt-5 text-center d-none d-lg-block  d-xl-block d-xl-none">
									Products{" "}
								</h3>

								<div className="row">
									{filteredResults.map((product, i) => (
										<div key={i} className="col-md-12 col-12 mb-3">
											<ProductCard product={product} />
										</div>
									))}
									{loadMoreButton()}
								</div>
							</div>
						</>
					)}
					<hr />
				</div>
			</div>
		</div>
		// </Layout>
	);
};

export default Shop;
