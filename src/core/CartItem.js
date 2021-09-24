import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import ShowImage from "./ShowImage";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { removeItem, updateItem } from "./cartHelpers";
import { MdDeleteForever } from "react-icons/md";
import "../assets/css/cartItem.css";

export default function CartItem({ product, handleRefresh }) {
	const [count, setCount] = useState(product.count);
	const history = useHistory();

	const increNum = (product) => {
		const incre = count + 1;
		setCount(incre);
		updateItem(product._id, incre);
		handleRefresh();
	};
	const decreaseNum = (product) => {
		const decre = count - 1;
		setCount(decre);
		updateItem(product._id, decre);
		handleRefresh();
	};
	const showRemoveButton = (product) => {
		return (
			<span
				onClick={() => {
					removeItem(product._id);
					handleRefresh(); // run useEffect in parent Cart
				}}
				className="removeProduct pl-5"
			>
				<MdDeleteForever fontSize="25px" />
			</span>
		);
	};
	const showProduct = (product) => {
		history.push(`/product/${product._id}`);
	};

	return (
		<>
			<div className="row paddingCart">
				<div className="col-md-4 col-12 ">
					<Link onClick={() => showProduct(product)}>
						<ShowImage
							item={product}
							url="product"
							height="180px"
							width="200px"
						/>
					</Link>
					{/* {showCartUpdateOptions()} */}
					<div className="row ">
						<div className="col-md-4 col-3">
							<button
								className="btn btn-default rounded-circle"
								onClick={() => decreaseNum(product)}
								disabled={count === 1}
							>
								<AiOutlineMinus />
							</button>
						</div>
						<div className="col-md-6 col-5">
							<input
								className="form-control text-center"
								type="number"
								value={count}
								disabled
							/>
						</div>
						<div className="col-md-2 col-1 pl-md-1">
							<button
								className="btn btn-default rounded-circle"
								onClick={() => increNum(product)}
								disabled={count === product.quantity}
							>
								<AiOutlinePlus />
							</button>
						</div>
					</div>
				</div>
				<div className="col-md-8 col-12">
					<Link
						onClick={() => showProduct(product)}
						className="cartlink"
						style={{ textDecoration: "none" }}
					>
						<h5 className="font-weight-light pl-2">{product.name}</h5>
					</Link>
					{console.log(product)}
					<p className="font-weight-light pl-2">
						Category: {product.category && product.category.name}
					</p>
					<br />
					<h5 className="pl-2">
						${product.price * product.count} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
						&nbsp;
						{showRemoveButton(product)}
					</h5>
				</div>
			</div>

			<hr />
		</>
	);
}
