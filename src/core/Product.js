import React, { useState, useEffect } from "react";
import Menu from "../core/Menu";
import { read, listRelated } from "./apiCore";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { addItem } from "./cartHelpers";
import CardDetails from "./CardDetails";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import ShowImage from "./ShowImage";
import moment from "moment";
import { Row } from "react-bootstrap";
import Loader from "../Loader/Loader";
import "../assets/css/Product.css";

const Product = (props) => {
	const [product, setProduct] = useState({});
	const [relatedProduct, setRelatedProduct] = useState([]);
	const [redirect, setRedirect] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [inCart, setInCart] = useState(false);

	const loadSingleProduct = (productId) => {
		setLoading(true);
		read(productId).then((data) => {
			if (data.error) {
				setError(data.error);
				setLoading(false);
			} else {
				setProduct(data);
				// fetch related products
				listRelated(data._id).then((data) => {
					if (data.error) {
						setError(data.error);
						setLoading(false);
					} else {
						setRelatedProduct(data);
						setLoading(false);
					}
				});
			}
		});
	};
	const addToCart = () => {
		// console.log('added');
		addItem(product, setRedirect(true));
	};

	const shouldRedirect = (redirect) => {
		if (redirect) {
			return <Redirect to="/cart" />;
		}
	};
	const showAddToCartBtn = () => {
		return (
			<button
				onClick={addToCart}
				className="btn btn-warning ml-3 mb-2 text-white px-3 py-2"
			>
				{inCart ? (
					<>
						<FaShoppingCart color="white" /> Go to cart{" "}
					</>
				) : (
					<>
						<FaShoppingCart color="white" /> Add to cart
					</>
				)}
			</button>
		);
	};

	const showBuyNowBtn = () => {
		return (
			<button onClick={addToCart} className="btn btn-danger  mb-2 px-3 py-2">
				<AiFillThunderbolt color="white" />
				Buy Now
			</button>
		);
	};
	const showStock = (quantity) => {
		return quantity > 0 ? (
			<span className="text-center text-success">IN STOCK</span>
		) : (
			<span className="text-center text-danger">OUT OF STOCK</span>
		);
	};

	useEffect(() => {
		const productId = props.match.params.productId;
		loadSingleProduct(productId);
		let cart = [];

		if (localStorage.getItem("cart")) {
			cart = JSON.parse(localStorage.getItem("cart"));
		}

		cart.forEach((item) => {
			if (item._id === productId) {
				setInCart(true);
				return;
			}
		});
	}, [props]);

	return (
		// <Layout
		// 	title={product && product.name}
		// 	descripton={
		// 		product && product.description && product.description.substring(0, 100)
		// 	}
		// 	className="container-fluid"
		// >
		<>
			<Menu />
			{loading ? (
				<Loader />
			) : (
				<>
					<div class="row justify-content-center rowProduct mt-5 pl-md-5">
						<div class="Productbox shadowProduct p-4">
							<div className="container-fluid">
								<div className="row">
									<div className="col-md-1 col-12 mt-4"></div>
									<div className="col-md-3 col-12 mb-5 mt-5 text-center">
										<ShowImage
											item={product}
											url="product"
											height="300px"
											width="300px"
										/>
									</div>
									{console.log(product)}
									<div className="col-md-1 col-12 mt-4"></div>
									<div className="col-md-7 col-12 mt-4 ">
										<h5>{product.name}</h5>
										<hr />
										<h6 className="text-muted">Description</h6>
										<p>{product.description}</p>
										<h6 className="text-muted">Price </h6>{" "}
										<p>${product.price}</p>
										<h6 className="text-muted">Status</h6>
										<p>{showStock(product.quantity)}</p>
										{isAuthenticated() && isAuthenticated().user.role === 1 && (
											<>
												<h6 className="text-muted">Added on</h6>
												<p>{moment(product.createdAt).fromNow()}</p>
											</>
										)}
										{isAuthenticated() && isAuthenticated().user.role === 1 && (
											<>
												<h6 className="text-muted">Product remaining</h6>
												<p>{product.quantity}</p>
											</>
										)}
										{isAuthenticated() && isAuthenticated().user.role === 1 && (
											<>
												<h6 className="text-muted">Product Sold</h6>
												<p>{product.sold}</p>
											</>
										)}
									</div>
								</div>
								{shouldRedirect(redirect)}
								{product.quantity > 0 ? (
									<Row>
										<span className="col-md-1"></span>
										<span className="col-md-1 mr-md-4 col-6">
											{showAddToCartBtn()}
										</span>
										<span className="col-md-2 ml-md-5 col-6">
											{showBuyNowBtn()}
										</span>
									</Row>
								) : null}
							</div>
							{/* <Row className="mt-5">
								<Col md={4} lg={5} className="mb-5 text-center"></Col>
								<Col md={8} lg={3} className="mt-4 mx-2"></Col>

								{/* <Col md={11} lg={3} className="mx-auto">
									<ListGroup className="text-break">
										<ListGroup.Item>
											<Row>
												<span className="col-6 mb-5">Price</span>
												<span className="col-6 mb-5">₹{product.price}</span>
											</Row>
										</ListGroup.Item>

										<ListGroup.Item>
											<Row>
												<span className="col-6 mb-5">Status</span>
												<span className="col-6 mb-5">
													{showStock(product.quantity)}
												</span>
											</Row>
										</ListGroup.Item>
									</ListGroup>
									{shouldRedirect(redirect)}
								</Col> 
							</Row> */}
						</div>
						<div className="container-fluid mt-5">
							<h4>Related products</h4>
							<div className="row">
								{relatedProduct.map((p, i) => (
									<div className="col-md-3 col-12 " key={i}>
										<CardDetails product={p} />
									</div>
								))}
							</div>
						</div>
					</div>
				</>
			)}
		</>
		// </Layout>
	);
};

export default Product;
