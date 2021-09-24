import React from "react";
import { Link, useHistory } from "react-router-dom";
import ShowImage from "./ShowImage";
import "../assets/css/ProductCard.css";

const ProductCard = ({ product }) => {
	let history = useHistory();

	// const showStock = (quantity) => {
	// 	return quantity > 0 ? (
	// 		<span className="text-center text-success">IN STOCK</span>
	// 	) : (
	// 		<span className="text-center text-danger">OUT OF STOCK</span>
	// 	);
	// };
	const showProduct = () => {
		history.push(`/product/${product._id}`);
	};

	return (
		<div className="row justify-content-center rowProductCard mt-1 pl-md-5">
			<div className="ProductboxCard shadowProductCard p-4">
				<div className="container-fluid">
					{product.quantity === 0 ? (
						<div className="ribbon ribbon-top-right">
							<span>out of stock</span>
						</div>
					) : null}
					<div className="row">
						{/* <div className="col-md-1 col-12 mt-4"></div> */}
						<div className="col-md-3 col-12  text-center">
							<Link onClick={showProduct}>
								<ShowImage
									item={product}
									url="product"
									height="185px"
									width="185px"
								/>
							</Link>
						</div>
						{console.log(product)}
						<div className="col-md-1 col-12 mt-2"></div>
						<div className="col-md-7 col-12 mt-2 ">
							<Link
								className="productLink"
								onClick={showProduct}
								style={{ textDecoration: "none" }}
							>
								<h5 className="font-weight-normal ">{product.name}</h5>
							</Link>
							<hr />
							<span className="font-weight-light">
								{product.category && product.category.name}
							</span>
							<br />
							<span>${product.price}</span>

							<br />
							<span className="font-weight-light">
								Delivery Charges: <span style={{ color: "green" }}>FREE</span>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
