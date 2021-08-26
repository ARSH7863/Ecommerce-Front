import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCart } from "./cartHelpers";
import CardDetails from "./CardDetails";
import Checkout from "./Checkout";
import Menu from "./Menu";

const Cart = () => {
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
			Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
		</h2>
	);

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
					<h2 className="mb-4">Your cart summary</h2>
					<hr />
					{/* <Checkout products={items} /> */}
					<Checkout products={items} setRun={setRun} run={run} />
				</div>
			</div>
		</>
		// </Layout>
	);
};

export default Cart;
