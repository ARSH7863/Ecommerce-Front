import React from "react";

import CartItem from "./CartItem";

export default function CartItems({ items, handleRefresh }) {
	return (
		<div>
			{items.map((product, i) => (
				<>
					<CartItem product={product} handleRefresh={handleRefresh} />
				</>
			))}
		</div>
	);
}
