import React from "react";
import Menu from "./Menu";
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
      <div className="jumbotron text-center">
        <br />
        <h2>{title}</h2>
        <p className="lead"> {descripton} </p>
      </div>
      <div className={className}>{children}</div>
    </div>
  );
};

export default Layout;
