import React, { Fragment } from "react";
import { Link, withRouter, ReactDOM } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";
import { Navbar, Nav, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import logo from "../assets/img/Logo/logo-2.jpg";
import { IoIosLogIn } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";

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
					<img src={logo} height="45px" style={{ marginBottom: "4px" }} />
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
									{itemTotal() !== 0 ? (
										<sup>
											<span
												className="badge badge-pill"
												style={{ background: "#FF6161" }}
											>
												{itemTotal()}
											</span>
										</sup>
									) : null}
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
										<OverlayTrigger
											overlay={<Tooltip id="tooltip-disabled">Sign in</Tooltip>}
											placement="bottom"
										>
											<span className="d-inline-block">
												<IoIosLogIn
													fontSize="30px"
													className="text-center"
													color="white"
												/>
											</span>
										</OverlayTrigger>
									</Link>
								</Nav.Link>
								<Nav.Link>
									<Link
										className="nav-link"
										style={isActive(history, "/signup")}
										to="/signup"
									>
										<OverlayTrigger
											overlay={<Tooltip id="tooltip-disabled">Sign Up</Tooltip>}
											placement="bottom"
										>
											<span className="d-inline-block">
												<AiOutlineUserAdd
													fontSize="30px"
													className="text-center"
													color="white"
												/>
											</span>
										</OverlayTrigger>
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
										<OverlayTrigger
											overlay={<Tooltip id="tooltip-disabled">Logout</Tooltip>}
											placement="bottom"
										>
											<span className="d-inline-block">
												<IoIosLogOut
													fontSize="30px"
													className="text-center"
													color="white"
												/>
											</span>
										</OverlayTrigger>
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
