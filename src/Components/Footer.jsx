import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div
      className="d-flex justify-content center align-items-center flex-column bg-primary text-light mt-5"
      style={{ width: "100%", height: "auto" }}
    >
      <div className="d-flex justify-content-evenly w-100 mt-5 flex-column flex-sm-row ">
        <div style={{ width: "400px" }}>
          <h4>
            <i className="fa-solid fa-truck-fast me2"></i>E Cart
          </h4>
          <h6>
            Designed and built with all the love in the world by the Luminar
            team with the help of our contributors.
          </h6>
          <h6>Code licensed Luminar, docs CC BY 3.0.</h6>
          <p>Currently v1.0.0.</p>
        </div>
        <div className="links">
          <h5>Links</h5>
          <Link to={"/"} className="nav-link">
            <a>Home</a>
          </Link>
          <Link to={"/wishlist"} className="nav-link">
            <a>Wishlist</a>
          </Link>
          <Link to={"/cart"} className="nav-link">
            <a>Cart</a>
          </Link>
        </div>
        <div className="guides">
          <h5>Guides</h5>
          <a className="nav-link" href="https://react.dev/" target="_blank">
            React
          </a>
          <a
            className="nav-link"
            href="https://react-bootstrap.netlify.app/"
            target="_blank"
          >
            React Bootstrap
          </a>
          <a
            className="nav-link"
            href="https://www.w3schools.com/react/react_router.asp"
            target="_blank"
          >
            React Routing
          </a>
        </div>
        <div className="contact">
          <h5>Contact Us</h5>
          <div className="d-flex gap-2">
            <input
              placeholder="Enter Your Email"
              type="text"
              className="form-control rounded"
            />
            <div
              className="bg-info d-flex justify-content-center align-items-center"
              style={{ width: "60px", borderRadius: "5px" }}
            >
              <i class="fa-solid fa-arrow-right"></i>
            </div>
          </div>
          <div className="icons d-flex justify-content-between mt-2">
            <a href="#" className="nav-link"><i class="fa-solid fa-envelope fa-2x"></i></a>
           <a href="#" className="nav-link"> <i class="fa-brands fa-facebook fa-2x"></i></a>
          <a href="#" className="nav-link">  <i class="fa-brands fa-twitter fa-2x"></i></a>
            <a href="#" className="nav-link"><i class="fa-brands fa-instagram fa-2x"></i></a>
         <a href="#" className="nav-link">   <i class="fa-brands fa-github fa-2x"></i></a>
           <a href="#" className="nav-link"> <i class="fa-brands fa-linkedin fa-2x"></i></a>
          </div>
        </div>
      </div>
      <p className="text-center mt-4">
        Copyright &copy;2023 E CART. Build With React.
      </p>
    </div>
  );
}

export default Footer;
