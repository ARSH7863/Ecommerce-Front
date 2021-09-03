import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addItem, updateItem, removeItem } from "./cartHelpers";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import "../core/CardDetails.css";

const CardDetails = ({
	product,
	showViewProductButton = true,
	showAddToCartButton = true,
	cartUpdate = false,
	showRemoveProductButton = false,
	setRun = (f) => f,
	run = undefined,
	// changeCartSize
}) => {
	const [redirect, setRedirect] = useState(false);
	const [count, setCount] = useState(product.count);
	let history = useHistory();

	const showViewButton = (showViewProductButton) => {
		return (
			showViewProductButton && (
				<Link to={`/product/${product._id}`} className="mr-2">
					<button className="btn btn-outline-primary mt-2 mb-2 CardDetails-btn-1">
						View Product
					</button>
				</Link>
			)
		);
	};
	const showProduct = () => {
		history.push(`/product/${product._id}`);
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

	const showAddToCartBtn = (showAddToCartButton) => {
		return (
			showAddToCartButton && (
				<button
					onClick={addToCart}
					className="btn btn-outline-warning mt-2 mb-2 card-btn-1"
				>
					Add to cart
				</button>
			)
		);
	};

	const showStock = (quantity) => {
		return quantity > 0 ? (
			<span className="badge badge-primary badge-pill">In Stock </span>
		) : (
			<span className="badge badge-primary badge-pill">Out of Stock </span>
		);
	};

	const handleChange = (productId) => (event) => {
		setRun(!run); // run useEffect in parent Cart
		setCount(event.target.value < 1 ? 1 : event.target.value);
		if (event.target.value >= 1) {
			updateItem(productId, event.target.value);
		}
	};

	const showCartUpdateOptions = (cartUpdate) => {
		return (
			cartUpdate && (
				<div className="h-75">
					<div className="input-group mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text">Adjust Quantity</span>
						</div>
						<input
							type="number"
							className="form-control"
							value={count}
							onChange={handleChange(product._id)}
						/>
					</div>
				</div>
			)
		);
	};
	const showRemoveButton = (showRemoveProductButton) => {
		return (
			showRemoveProductButton && (
				<button
					onClick={() => {
						removeItem(product._id);
						setRun(!run); // run useEffect in parent Cart
					}}
					className="btn btn-outline-danger mt-2 mb-2"
				>
					Remove Product
				</button>
			)
		);
	};
	return (
		<div>
			{/* <div className="card-header card-header-1 ">{product.name}</div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        <ShowImage item={product} url="product" />
        <p className="card-p  mt-2">{product.description.substring(0, 100)} </p>
        <p className="card-p black-10">$ {product.price}</p>
        <p className="black-9">
          Category: {product.category && product.category.name}
        </p>
        <p className="black-8">
          Added on {moment(product.createdAt).fromNow()}
        </p>
        {showStock(product.quantity)}
        <br />

        {showViewButton(showViewProductButton)}

        {showAddToCartBtn(showAddToCartButton)}

        {showRemoveButton(showRemoveProductButton)}

        {showCartUpdateOptions(cartUpdate)}
      </div> */}
			<div class="row justify-content-center rowCard">
				<div class="box shadow p-4 boxCard">
					<div className="col-sm-12 ml-2 mr-5">
						{shouldRedirect(redirect)}

						<Link onClick={showProduct}>
							<ShowImage
								item={product}
								url="product"
								height="195px"
								width="175px"
							/>
						</Link>
						<hr />
						<Link
							className="productLink"
							onClick={showProduct}
							style={{ textDecoration: "none" }}
						>
							<span className="font-weight-normal ">{product.name}</span>
						</Link>
						{shouldRedirect(redirect)}
						<br />
						<span className="font-weight-light">
							{product.category && product.category.name}
							<br />
						</span>

						<span className="font-weight-normal">${product.price}</span>
						<br />
						<span className="font-weight-light">
							Delivery Charges: <span style={{ color: "green" }}>FREE</span>
						</span>
						{showRemoveButton(showRemoveProductButton)}
						{showCartUpdateOptions(cartUpdate)}
					</div>
				</div>
			</div>
		</div>
	);
};

/* <Card style={{ width: "18rem" }}>
<Card.Img variant="top">
<ShowImage item={product} url="product" />
</Card.Img>
<Card.Body>
<Card.Title>{product.name}</Card.Title>
<Card.Text>
{shouldRedirect(redirect)}
<p className="card-p  mt-2">{product.description.substring(0, 100)} </p>
<p className="card-p black-10">$ {product.price}</p>
<p className="black-9">
Category: {product.category && product.category.name}
</p>
<p className="black-8">
Added on {moment(product.createdAt).fromNow()}
</p>
{showStock(product.quantity)}
<br />
</Card.Text>
<Button variant="primary">

{showViewButton(showViewProductButton)}

{showAddToCartBtn(showAddToCartButton)}

{showRemoveButton(showRemoveProductButton)}

{showCartUpdateOptions(cartUpdate)}
</Button>
</Card.Body>
</Card>; */

export default CardDetails;

{
	/* <p className="black-9">
  Category: {product.category && product.category.name}
</p>
<p className="black-8">
  Added on {moment(product.createdAt).fromNow()}
</p>
{showStock(product.quantity)}
<br /> */
}
