import React from "react";
import Menu from "./Menu";
import Carousel from "react-bootstrap/Carousel";
import carsouselPhoto1 from "../assets/img/Carousel/Brand-image-flute-2-3.jpg";
import carsouselPhoto2 from "../assets/img/Carousel/nepsis-3.jpeg";
import carsouselPhoto3 from "../assets/img/Carousel/vasmol-3.jpg";
import "../styles.css";
const Layout = ({
	title = "Title",
	descripton = "Description",
	className,
	children,
}) => {
	return (
		<div>
			<Menu />
			{/* <div className="jumbotron text-center">
        <br />
        <h2>{title}</h2>
        <p className="lead"> {descripton} </p>
      </div> */}
			<div className="pt-5">
				<Carousel fade>
					<Carousel.Item interval={1500}>
						<img
							className="d-block w-100"
							src={carsouselPhoto1}
							alt="First slide"
							style={{ objectFit: "contain" }}
						/>
						{/* <Carousel.Caption>
						<h3>First slide label</h3>
						<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
					</Carousel.Caption> */}
					</Carousel.Item>
					<Carousel.Item interval={1500}>
						<img
							className="d-block w-100"
							src={carsouselPhoto2}
							alt="Second slide"
							style={{ objectFit: "contain" }}
						/>

						{/* <Carousel.Caption>
						<h3>Second slide label</h3>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
					</Carousel.Caption> */}
					</Carousel.Item>
					<Carousel.Item interval={1500}>
						<img
							className="d-block w-100"
							src={carsouselPhoto3}
							alt="Third slide"
							style={{ objectFit: "contain" }}
						/>

						{/* <Carousel.Caption>
						<h3>Third slide label</h3>
						<p>
							Praesent commodo cursus magna, vel scelerisque nisl consectetur.
						</p>
					</Carousel.Caption> */}
					</Carousel.Item>
				</Carousel>
			</div>
			<div className={className}>{children}</div>
		</div>
	);
};

export default Layout;
