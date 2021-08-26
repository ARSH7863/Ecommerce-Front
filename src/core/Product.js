import React, { useState, useEffect } from "react";
import Menu from "../core/Menu";
import { read, listRelated } from "./apiCore";
import { Redirect } from "react-router-dom";
import { addItem } from "./cartHelpers";
import CardDetails from "./CardDetails";

const Product = (props) => {
	const [product, setProduct] = useState({});
	const [relatedProduct, setRelatedProduct] = useState([]);
	const [redirect, setRedirect] = useState(false);
	const [error, setError] = useState(false);

	const loadSingleProduct = (productId) => {
		read(productId).then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setProduct(data);
				// fetch related products
				listRelated(data._id).then((data) => {
					if (data.error) {
						setError(data.error);
					} else {
						setRelatedProduct(data);
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
				className="btn btn-warning mt-2 ml-3 mb-2 card-btn-1"
			>
				Add to cart
			</button>
		);
	};

	useEffect(() => {
		const productId = props.match.params.productId;
		loadSingleProduct(productId);
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
			<div className="container">
				<div className="row">
					<div className="col-md-12 col-12">
						{product && product.description && (
							<CardDetails product={product} showViewProductButton={false} />
						)}
					</div>
					{shouldRedirect(redirect)}
					{showAddToCartBtn()}
					<div className="col-md-12 col-12">
						<h4>Related products</h4>
						<div className="container">
							<div className="row">
								{relatedProduct.map((p, i) => (
									<div className="col-md-3 col-12 mb-3" key={i}>
										<CardDetails product={p} />
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
		// </Layout>
	);
};

export default Product;
