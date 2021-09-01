import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import ShowImage from "./ShowImage";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { removeItem } from "./cartHelpers";
import { MdDeleteForever } from "react-icons/md";

export default function CartItem({ product }) {
	const [count, setCount] = useState(1);
	const [run, setRun] = useState(false);
	const history = useHistory();

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
	const showRemoveButton = (product) => {
		return (
			<span
				onClick={() => {
					removeItem(product._id);
					setRun(!run); // run useEffect in parent Cart
				}}
				className="removeProduct px-5"
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
			<div className="row">
				<div className="col-md-4 col-12">
					<Link onClick={() => showProduct(product)}>
						<ShowImage item={product} url="product" />
					</Link>

					<div className="row">
						<div className="col-md-4 col-3">
							<button
								className="btn"
								style={{ borderRadius: "50%" }}
								onClick={decreaseNum}
								disabled={count == 1}
							>
								<AiOutlineMinus />
							</button>
						</div>
						<div className="col-md-6 col-5">
							<input className="form-control" type="text" value={count} />
						</div>
						<div className="col-md-2 col-1 pl-md-1">
							<button
								className="btn"
								style={{ borderRadius: "50%" }}
								onClick={increNum}
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
						<h5 className="font-weight-light">{product.name}</h5>
					</Link>
					{console.log(product)}
					<p className="font-weight-light">
						Category: {product.category && product.category.name}
					</p>
					<br />
					<h5>
						${product.price} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
						{showRemoveButton(product)}
					</h5>
				</div>
			</div>
			<hr />
		</>
	);
}
