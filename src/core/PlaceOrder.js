import React from "react";
import { useEffect, useState } from "react";
import Checkout from "./Checkout";
import Menu from "./Menu";
import "../assets/css/PlaceOrder.css";

export default function PlaceOrder({ location }) {
	const [items, setItems] = useState([]);
	const [run, setRun] = useState(false);
	console.log(items);
	console.log(run);
	console.log(location);
	useEffect(() => {
		if (location.state) {
			setItems(location.state.items);
			setRun(location.state.run);
			console.log(items);
			console.log(run);
			console.log(location);
		}
	}, [location.state]);
	return (
		<div>
			<Menu />
			<div className="row justify-content-center rowPlaceorder">
				<div className="shadowPlaceorder p-4 Placeorderbox">
					<h3 className="mb-4 pt-1 text-center">Your cart summary</h3>
					<hr />
					{console.log(items)}
					{console.log(run)}
					{/* <Checkout products={items} /> */}
					<Checkout products={items} setRun={setRun} run={run} />
				</div>
			</div>
		</div>
	);
}
