import React from "react";
import { API } from "../config";

const ShowImage = ({ item, url, height, width }) => (
	<div className="product-img">
		<img
			src={`${API}/${url}/photo/${item._id}`}
			alt={item.name}
			className="mb-2"
			height={height}
			width={width}
			style={{ objectFit: "contain" }}
		/>
	</div>
);

export default ShowImage;
