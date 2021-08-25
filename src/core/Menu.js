import React, { Fragment } from "react";
import { Link, withRouter, ReactDOM } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";
import { Navbar, Nav, Form } from "react-bootstrap";
import logo from "../assets/img/Vl-logo-256.png";
import { IoIosLogIn } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import Search from "./Search";

const isActive = (history, path) => {
	if (history.location.pathname === path) {
		return {
			color: "#FFFFFF",
			border: "2px #add8e6",
		};
	} else {
		return { color: "#FFFFFF" };
	}
};

const Menu = ({ history }) => {
	return (
		<div>
			<Navbar
				collapseOnSelect
				expand="md"
				style={{ backgroundColor: "#2874F0" }}
				variant="dark"
				className="py-0"
			>
				<Navbar.Brand>
					<img src={logo} height="30px" style={{ marginBottom: "8px" }} />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link>
							<Link className="nav-link" style={isActive(history, "/")} to="/">
								<h6 className="mt-1">Home</h6>
							</Link>
						</Nav.Link>
						<Nav.Link>
							<Link
								className="nav-link"
								style={isActive(history, "/shop")}
								to="/shop"
							>
								<h6 className="mt-1">Shop</h6>
							</Link>
						</Nav.Link>
						<Nav.Link>
							<Link
								className="nav-link"
								style={isActive(history, "/cart")}
								to="/cart"
							>
								<h6 className="mt-1">
									<FaShoppingCart
										fontSize="13px"
										className="text-center"
										color="white"
									/>
									&nbsp; Cart
									<sup>
										<span
											className="badge badge-pill"
											style={{ background: "#C5C640" }}
										>
											{itemTotal()}
										</span>
									</sup>
								</h6>
							</Link>
						</Nav.Link>
						{/* <Search /> */}

						{isAuthenticated() && isAuthenticated().user.role === 0 && (
							<Nav.Link>
								<Link
									className="nav-link"
									style={isActive(history, "/user/dashboard")}
									to="/user/dashboard"
								>
									<h6 className="mt-1">Dashboard</h6>
								</Link>
							</Nav.Link>
						)}
						{isAuthenticated() && isAuthenticated().user.role === 1 && (
							<Nav.Link>
								<Link
									className="nav-link"
									style={isActive(history, "/admin/dashboard")}
									to="/admin/dashboard"
								>
									<h6 className="mt-1">Dashboard</h6>
								</Link>
							</Nav.Link>
						)}
					</Nav>
					<Nav>
						<Form>
							{/* <Form.Group
								className="mb-2"
								controlId="exampleForm.ControlInput1"
							>
								<Form.Control type="email" placeholder="name@example.com" />
							</Form.Group> */}
						</Form>
					</Nav>
					<Nav>
						{!isAuthenticated() && (
							<Fragment>
								<Nav.Link>
									<Link
										className="nav-link"
										style={isActive(history, "/signin")}
										to="/signin"
									>
										<IoIosLogIn
											fontSize="30px"
											className="text-center"
											color="white"
										/>
									</Link>
								</Nav.Link>
								<Nav.Link>
									<Link
										className="nav-link"
										style={isActive(history, "/signup")}
										to="/signup"
									>
										<AiOutlineUserAdd
											fontSize="30px"
											className="text-center"
											color="white"
										/>
									</Link>
								</Nav.Link>
							</Fragment>
						)}

						{isAuthenticated() && (
							<div>
								<li className="nav-item">
									<span
										className="nav-link"
										style={{ cursor: "pointer", color: "#ffffff" }}
										onClick={() =>
											signout(() => {
												history.push("/");
											})
										}
									>
										<IoIosLogOut
											fontSize="30px"
											className="text-center"
											color="white"
										/>
									</span>
								</li>
							</div>
						)}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
};

export default withRouter(Menu);
