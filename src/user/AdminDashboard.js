import React from "react";
import { isAuthenticated } from "../auth";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import Menu from "../core/Menu";
import AddCategory from "../admin/AddCategory";
import AddProduct from "../admin/AddProduct";
import Orders from "../admin/Orders";
import ManageProducts from "../admin/ManageProducts";

const AdminDashboard = () => {
	const {
		user: { _id, name, email, role },
	} = isAuthenticated();

	const adminLinks = () => {
		return (
			<>
				{/* <div className="card pt-5">
					<h4 className="card-header">Admin Links</h4>
					<ul className="list-group">
						<li className="list-group-item">
							{" "}
							<Link className="nav-link" to="/create/category">
								Create Category
							</Link>{" "}
						</li>
						<li className="list-group-item">
							{" "}
							<Link className="nav-link" to="/create/product">
								Create Product
							</Link>{" "}
						</li>
						<li className="list-group-item">
							{" "}
							<Link className="nav-link" to="/admin/orders">
								View Orders
							</Link>{" "}
						</li>
						<li className="list-group-item">
							{" "}
							<Link className="nav-link" to="/admin/products">
								Manage Products
							</Link>{" "}
						</li>
					</ul>
				</div> */}
				{/* <div className="container-fluid ">
					<Tabs defaultActiveKey="Orders" className="justify-content-center ">
						<Tab eventKey="AddCategory" title="Add Category" variant="pills">
							<AddCategory />
						</Tab>
						<Tab eventKey="AddProduct" title="Add Product">
							<AddProduct />
						</Tab>
						<Tab eventKey="Orders" title="Orders">
							<Orders />
						</Tab>
						<Tab eventKey="ManageProducts" title="Manage Products">
							<ManageProducts />
						</Tab>
					</Tabs>
				</div> */}
				<div className="container-fluid pt-5">
					<Tab.Container id="left-tabs-example" defaultActiveKey="Orders">
						<Row>
							<Col sm={3}>
								<Nav variant="pills" className="flex-column">
									<Nav.Item>
										<Nav.Link eventKey="Orders">Orders</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="ManageProducts">
											Manage Products
										</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="AddProduct">Add Product</Nav.Link>
									</Nav.Item>
									<Nav.Item>
										<Nav.Link eventKey="AddCategory">Add Category</Nav.Link>
									</Nav.Item>
								</Nav>
							</Col>
							<Col sm={9}>
								<Tab.Content>
									<Tab.Pane eventKey="AddCategory">
										<AddCategory />
									</Tab.Pane>
									<Tab.Pane eventKey="AddProduct">
										<AddProduct />
									</Tab.Pane>
									<Tab.Pane eventKey="Orders">
										<Orders />
									</Tab.Pane>
									<Tab.Pane eventKey="ManageProducts">
										<ManageProducts />
									</Tab.Pane>
								</Tab.Content>
							</Col>
						</Row>
					</Tab.Container>
				</div>
			</>
		);
	};

	// const adminInfo = () => {
	// 	return (
	// 		<div className="card mb-5 pt-5">
	// 			<h3 className="card-header">Admin Information</h3>
	// 			<ul className="list-group">
	// 				<li className="list-group-item"> {name} </li>
	// 				<li className="list-group-item"> {email} </li>
	// 				<li className="list-group-item">
	// 					{" "}
	// 					{role === 1 ? "Admin" : "Registered User"}{" "}
	// 				</li>
	// 			</ul>
	// 		</div>
	// 	);
	// };

	return (
		<>
			<Menu />
			<br />
			<div className="row pt-5">
				<div className="col-md-12 col-12">{adminLinks()}</div>
				{/* <div className="col-9">{adminInfo()}</div> */}
			</div>
		</>
	);
};

export default AdminDashboard;
