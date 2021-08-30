import React, { useState, useEffect } from "react";
import Menu from "../core/Menu";
import { read, listRelated } from "./apiCore";
import { Redirect } from "react-router-dom";
import { addItem } from "./cartHelpers";
import CardDetails from "./CardDetails";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import ShowImage from "./ShowImage";
import { Col, Row, ListGroup } from "react-bootstrap";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // fetch related products
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };
  const addToCart = () => {
    // console.log('added');
    addItem(product, setRedirect(true));
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };
  const showAddToCartBtn = () => {
    return (
      <button
        onClick={addToCart}
        className="btn btn-warning btn-lg mt-2 ml-3 mb-2 card-btn-1"
      >
        <FaShoppingCart color="white" /> Add to cart
      </button>
    );
  };

  const showBuyNowBtn = () => {
    return (
      <button
        onClick={addToCart}
        className="btn btn-danger btn-lg mt-2 ml-3 mb-2 card-btn-1"
      >
        <AiFillThunderbolt />
        Buy Now
      </button>
    );
  };
  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock </span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock </span>
    );
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    // <Layout
    // 	title={product && product.name}
    // 	descripton={
    // 		product && product.description && product.description.substring(0, 100)
    // 	}
    // 	className="container-fluid"
    // >
    <>
      <Menu />
      <Row className="mt-5">
        <Col md={7} lg={5}>
          <ShowImage item={product} url="product" />
        </Col>

        <Col md={4} lg={3} className="mt-4 mx-2">
          <h3>{product.name}</h3>
          <hr />

          <h6 className="text-muted">Description</h6>
          <p>{product.description}</p>
        </Col>

        <Col md={11} lg={3} className="mx-auto">
          <ListGroup className="text-break">
            <ListGroup.Item>
              <Row>
                <span className="col-6 mb-5">Price</span>
                <span className="col-6 mb-5">₹{product.price}</span>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <span className="col-6 mb-5">Status</span>
                <span className="col-6 mb-5">
                  {showStock(product.quantity)}
                </span>
              </Row>
            </ListGroup.Item>
          </ListGroup>
          {shouldRedirect(redirect)}
          {showAddToCartBtn()}
          {showBuyNowBtn()}
        </Col>
      </Row>

      <div className="container">
        <h4>Related products</h4>
        <div className="row">
          {relatedProduct.map((p, i) => (
            <div className="col-md-4 col-12 " key={i}>
              <CardDetails product={p} />
            </div>
          ))}
        </div>
      </div>
    </>
    // </Layout>
  );
};

export default Product;
