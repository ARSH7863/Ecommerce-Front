import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCart } from "./cartHelpers";
import { removeItem } from "./cartHelpers";
import cartPhoto from "../assets/img/cartItem.png";
import Menu from "./Menu";
import "../assets/css/Cart.css";
import { MdDeleteForever } from "react-icons/md";
import CartItems from "./CartItems";

const Cart = ({ history }) => {
	const [items, setItems] = useState([]);
	const [run, setRun] = useState(false);
	const [count, setCount] = useState(1);

	const increNum = () => {
		setCount(count + 1);
	};
	const decreaseNum = () => {
		const decre = count - 1;
		if (decre < 1) {
			setCount(1);
		} else {
			setCount(decre);
		}
	};

	useEffect(() => {
		setItems(getCart());
	}, [run]);

	const getTotal = (products) => {
		return products.reduce((currentValue, nextValue) => {
			return currentValue + nextValue.count * nextValue.price;
		}, 0);
	};

	const showItems = (items) => {
		return (
			<div className="col-md-6 col-12">
				<div class="row justify-content-center rowCart pl-md-5">
					<div class="Cartbox shadowCart p-4">
						<h6>
							My Cart({`${items.length}`}) <br />
						</h6>
						<hr />
						<CartItems
							items={items}
							increNum={increNum}
							decreaseNum={decreaseNum}
							count={count}
						/>

						{items.length > 0 ? (
							<div className="float-right">
								<button
									style={{ background: "#FB641B" }}
									className="btn text-white px-5 py-2"
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
