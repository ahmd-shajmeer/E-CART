import React, { useEffect } from "react";
import { Col, Row, Card, Button,Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../Redux/Slice/productSlice";
import { addToWishlist } from "../Redux/Slice/wishlistSlice";
import { addToCart } from "../Redux/Slice/cartSlice";

function Home() {
  const dispatch = useDispatch()
  const {loading,products,error} = useSelector((state)=>state.productSlice)
  const {wishlist} = useSelector(state=>state.wishlistSlice)

  useEffect(()=> {
    dispatch(fetchProducts())
  },[])

  const handleWishlist = (product) =>{
    const existingProduct = wishlist.find(item=>item.id == product.id)
    if(existingProduct){
      alert("Product is already added")
    }else{
      dispatch(addToWishlist(product))
    }
  }


  return (
    <div style={{marginTop:'100px'}}>
      {
        loading? <div className="d-flex justify-content-center mt-5">
          <Spinner className="me-3" animation="border" variant="primary" />Loading...
        </div>:<Row className="container mt-5 mx-auto">
        {
          products.length>0&&products.map((product,index)=>(
            <Col key={index} className="mb-5" sm={12} md={6} lg={4} xl={3}>
          <Card className="shadow rounded" style={{ width: "18rem" }}>
            <Link to={`/view/${product.id}`}><Card.Img variant="top" style={{height:'180px'}} src={product.thumbnail} /></Link>
            <Card.Body>
              <Card.Title>{product.title.slice(0,20)}...</Card.Title>
              <div className="d-flex justify-content-between">
                <Button onClick={()=>handleWishlist(product)} className="btn btn-light rounded fs-5"><i className="fa-solid fa-heart text-danger"></i></Button>
                <Button onClick={()=>dispatch(addToCart(product))} className="btn btn-light rounded fs-5"><i className="fa-solid fa-cart-plus text-success"></i></Button>
                </div>
            </Card.Body>
          </Card>
        </Col>
          ))
        }
      </Row>
      }
    </div>
  );
}

export default Home;
