import React, { useEffect } from "react";
import { Col, Row, Card, Button,Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts, onNavigateNext, onNavigatePrev } from "../Redux/Slice/productSlice";
import { addToWishlist } from "../Redux/Slice/wishlistSlice";
import { addToCart } from "../Redux/Slice/cartSlice";
import Header from '../Components/Header'


function Home() {
  const dispatch = useDispatch()
  const {loading,products,error,productsPerPage,currentPage} = useSelector((state)=>state.productSlice)
  const {wishlist} = useSelector(state=>state.wishlistSlice)

  const totalPages = Math.ceil(products?.length/productsPerPage)
  const indexOfLastItem = currentPage * productsPerPage
  const indexOfFirstItem = indexOfLastItem - productsPerPage
  const visibleCards = products?.slice(indexOfFirstItem,indexOfLastItem)

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

  const navigatePrev = () =>{
    if(currentPage!=1){
      dispatch(onNavigatePrev())
    }
  }

  const navigateNext = () =>{
    if(currentPage!=totalPages){
      dispatch(onNavigateNext())
    }
  }

  return (
    <>
    <Header insideHome/>
      <div style={{marginTop:'100px'}}>
        {
          !loading&&error ? <div className="mt-4 text-center text-danger fw-bold fs-3">{error} </div>:null
        }
        {
          loading? <div className="d-flex justify-content-center mt-5">
            <Spinner className="me-3" animation="border" variant="primary" />Loading...
          </div>:<Row className="container mt-5 mx-auto">
          {
            products.length>0?visibleCards.map((product,index)=>( 
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
            )) : !error&& <div className="mt-5 text-center text-danger">Product not found!!</div>
          }
          <div className="d-flex justify-content-center align-items-center fw-bolder">
            <span onClick={navigatePrev} className="btn btn-link"><i className="fa-solid fa-left-long fs-2" style={{color:'black'}}></i></span>
            <span>{currentPage} of {totalPages}</span>
            <span onClick={navigateNext} className="btn btn-link"><i className="fa-solid fa-right-long fs-2" style={{color:'black'}}></i></span>
          </div>
        </Row>
        }
      </div>
    </>
  );
}

export default Home;
