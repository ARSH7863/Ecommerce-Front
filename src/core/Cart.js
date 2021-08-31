import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCart } from "./cartHelpers";
import ShowImage from "./ShowImage";
import { removeItem } from "./cartHelpers";
import cartPhoto from "../assets/img/cartItem.png";
import Menu from "./Menu";
import "../assets/css/Cart.css";

const Cart = ({ history }) => {
	const [items, setItems] = useState([]);
	const [run, setRun] = useState(false);

	useEffect(() => {
		setItems(getCart());
	}, [run]);

	const showProduct = (product) => {
		history.push(`/product/${product._id}`);
	};

	const getTotal = (products) => {
		return products.reduce((currentValue, nextValue) => {
			return currentValue + nextValue.count * nextValue.price;
		}, 0);
	};

	const showRemoveButton = (product) => {
		return (
			<h6
				onClick={() => {
					removeItem(product._id);
					setRun(!run); // run useEffect in parent Cart
				}}
				className="removeProduct"
			>
				Remove
			</h6>
		);
	};
	const showItems = (items) => {
		return (
			<div className="col-md-6 col-12">
				{/* {items.map((product, i) => (
					<CardDetails
						key={i}
						product={product}
						showAddToCartButton={false}
						cartUpdate={true}
						showRemoveProductButton={true}
						setRun={setRun}
						run={run}
					/>
				))} */}
				<div class="row justify-content-center rowCart pl-md-5">
					<div class="Cartbox shadowCart p-4">
						<h6>
							My Cart({`${items.length}`}) <br />
						</h6>
						{items.map((product, i) => (
							<>
								<div className="row">
									<div className="col-md-4 col-12">
										<Link onClick={() => showProduct(product)}>
											<ShowImage item={product} url="product" />
										</Link>
									</div>
									<div className="col-md-8 col-12">
										<Link
											onClick={() => showProduct(product)}
											className="cartlink"
											style={{ textDecoration: "none" }}
										>
											<h5 className="font-weight-light">{product.name}</h5>
										</Link>
										{console.log(product)}
										<p className="font-weight-light">
											Category: {product.category && product.category.name}
										</p>
										<br />
										<h5>${product.price}</h5>
										{showRemoveButton(product)}
									</div>
								</div>
								<hr />
							</>
						))}

						{items.length > 0 ? (
							<div className="text-center">
								<button
									style={{ background: "#FB641B" }}
									className="btn text-white"
									onClick={checkout}
								>
									Place Order
								</button>
							</div>
						) : null}
					</div>
				</div>
			</div>
		);
	};

	const noItemsMessage = () => (
		<div className="col-12">
			<div class="row justify-content-center rowCart">
				<div class="Cartbox shadowCart p-4">
					<h6>
						My Cart. <br />
						<div className="text-center pt-5">
							<img src={cartPhoto} className="cartImg" />
						</div>
						<br />
						<h5 className="text-center">Missing Cart items?</h5>
						<div className="text-center pt-4">
							<Link to="/shop">
								<button
									style={{ background: "#2874F0" }}
									className="btn text-white"
								>
									Continue Shopping
								</button>
							</Link>
						</div>
					</h6>
				</div>
			</div>
		</div>
	);

	const PriceRange = ({ items }) => (
		<div className="col-md-6 col-12">
			<div class="row justify-content-center rowCart pr-md-5">
				<div class="Cartbox shadowCart p-4">
					<h5 className="font-weight-light">PRICE DETAILS</h5>
					<hr />
					<p>Total Price: ${getTotal(items)}</p>
				</div>
			</div>
		</div>
	);

	const checkout = () => {
		history.push({
			pathname: "/checkout",
			state: {
				items: items,
				run: run,
			},
		});
	};

	// ;
	return (
		// <Layout
		//   title="Shopping Cart"
		//   descripton={
		//     "Manage your cart items. Add remove checkout or continue shopping."
		//   }
		//   className="container-fluid"
		// >
		<>
			<Menu />

			<div className="row">
				{items.length > 0 ? showItems(items) : noItemsMessage()}

				{items.length > 0 ? <PriceRange items={items} /> : null}
			</div>
		</>
		// </Layout>
	);
};

export default Cart;
