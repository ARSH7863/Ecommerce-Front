import React from "react";
import ShowImage from "./ShowImage";
import "../assets/css/ProductCard.css";

const ProductCard = ({ product }) => {
  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="text-center text-success">IN STOCK</span>
    ) : (
      <span className="text-center text-danger">OUT OF STOCK</span>
    );
  };

  return (
    <div class="row justify-content-center rowProductCard mt-4 pl-md-5">
      <div class="ProductboxCard shadowProductCard p-4">
        <div className="container-fluid">
          <div className="row">
            {/* <div className="col-md-1 col-12 mt-4"></div> */}
            <div className="col-md-3 col-12 mb-5 mt-5 text-center">
              <ShowImage
                item={product}
                url="product"
                height="200px"
                width="200px"
              />
            </div>
            {console.log(product)}
            <div className="col-md-1 col-12 mt-4"></div>
            <div className="col-md-7 col-12 mt-4 ">
              <h5>{product.name}</h5>
              <hr />
              <span className="font-weight-light">
                {product.category && product.category.name}
              </span>
              <br />
              <span>${product.price}</span>
              <br />
              <span>{showStock(product.quantity)}</span>
              <br />
              <span className="font-weight-light">
                Delivery Charges: <span style={{ color: "green" }}>FREE</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
