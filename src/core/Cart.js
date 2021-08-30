import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCart } from "./cartHelpers";
import CardDetails from "./CardDetails";
import Menu from "./Menu";

const Cart = ({ history }) => {
	const [items, setItems] = useState([]);
	const [run, setRun] = useState(false);

	useEffect(() => {
		setItems(getCart());
	}, [run]);

	const showItems = (items) => {
		return (
			<div>
				<h2>Your cart has {`${items.length}`} items</h2>
				<hr />
				{items.map((product, i) => (
					<CardDetails
						key={i}
						product={product}
						showAddToCartButton={false}
						cartUpdate={true}
						showRemoveProductButton={true}
						setRun={setRun}
						run={run}
					/>
				))}
			</div>
		);
	};

	const noItemsMessage = () => (
		<h2>
			Your cart is empty. <br />{" "}
			<Link to="/shop">
				<button style={{ background: "#2874F0" }} className="btn text-white">
					continue Shopping
				</button>
			</Link>
		</h2>
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
			<h5 className="pl-3 pt-3">
				Manage your cart items. Add remove checkout or continue shopping.
			</h5>

			<hr />
			<div className="row">
				<div className="col-6">
					{items.length > 0 ? showItems(items) : noItemsMessage()}
				</div>

				<div className="col-6">
					{items.length > 0 ? (
						<button
							style={{ background: "#FB641B" }}
							className="btn btn-lg text-white"
							onClick={checkout}
						>
							Place Order
						</button>
					) : null}
				</div>
			</div>
		</>
		// </Layout>
	);
};

export default Cart;
