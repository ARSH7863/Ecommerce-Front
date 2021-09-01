import React from "react";

import CartItem from "./CartItem";

export default function CartItems({ items, increNum, decreaseNum, count }) {
	return (
		<div>
			{items.map((product, i) => (
				<>
					<CartItem product={product} />
				</>
			))}
		</div>
	);
}
