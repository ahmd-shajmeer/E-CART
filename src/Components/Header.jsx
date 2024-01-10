import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { productSearch } from "../Redux/Slice/productSlice";

function Header({insideHome}) {
  const dispatch = useDispatch()
  const [wishlistCount,setWishlistCount] = useState(0)
  const [cartCount,setCartCount] = useState(0)

  const wishlist = useSelector(state=>state.wishlistSlice.wishlist)
  const cart = useSelector(state=>state.cartReducer)

  useEffect(()=>{
    setWishlistCount(wishlist?.length)
    setCartCount(cart?.length)
  },[wishlist,cart])
  return (
    <Navbar style={{ marginBottom:'40px',zIndex:'1' }} expand="lg" className="bg-primary w-100 position-fixed top-0">
      <Container>
        <Navbar.Brand>
          <Link
            to={"/"}
            style={{
              textDecoration: "none",
              color: "white",
              fontWeight: "bold",
            }}
          >
            <i
              className="fa-solid fa-truck-fast me-2"
              style={{ color: "white" }}
            ></i>
            E-CART
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto gap-3">
            {
              insideHome&&<Nav.Link className="me-lg-5">
              <input onChange={(e)=>dispatch(productSearch(e.target.value.toLowerCase()))} type="text" className="form-control" placeholder="Search Product!!!" />
            </Nav.Link>}
            <Nav.Link className="btn border rounded">
              <Link
                to={"/wishlist"}
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                <i className="fa-solid fa-heart me-2" style={{ color: "red"}}></i>
                WISHLIST
                <Badge pill bg="white" text="dark" style={{ marginLeft: '5px' }}>
                  {wishlistCount}
                </Badge>
              </Link>
            </Nav.Link>
            <Nav.Link className="btn border rounded">
              <Link
                to={"/cart"}
                className=""
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                <i className="fa-solid fa-cart-shopping me-2" style={{ color: "orange"}}></i>
                CART
                <Badge pill bg="white" text="dark" style={{ marginLeft: '5px' }}>
                  {cartCount}
                </Badge>
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}

export default Header;
