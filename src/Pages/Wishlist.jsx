import React from 'react'
import { Row,Col,Card,Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeFromWishlist } from '../Redux/Slice/wishlistSlice'
import { addToCart } from '../Redux/Slice/cartSlice'
import Header from '../Components/Header'

function Wishlist() {
  const dispatch = useDispatch()
  const wishlist = useSelector(state=>state.wishlistSlice.wishlist)

  const handleCart = (product) =>{
    dispatch(removeFromWishlist(product.id))
    dispatch(addToCart(product))
  }
  return (
    <>
    <Header/>
      <div style={{marginTop:'100px'}}>
        <Row className="container mt-5 mx-auto">
          {
            wishlist?.length>0?wishlist?.map(product=>(<Col className="mb-5" sm={12} md={6} lg={4} xl={3}>
            <Card className="shadow rounded" style={{ width: "18rem" }}>
              <Link to={'/view/1'}><Card.Img variant="top" style={{height:'180px'}} src={product.thumbnail} /></Link>
              <Card.Body>
                <Card.Title>{product.title.slice(0,20)}...</Card.Title>
                <div className="d-flex justify-content-between">
                  <Button onClick={()=>dispatch(removeFromWishlist(product.id))} className="btn btn-light fs-5"><i className="fa-solid fa-heart-circle-xmark text-danger"></i></Button>
                  <Button onClick={()=>handleCart(product)} className="btn btn-light fs-5"><i className="fa-solid fa-cart-plus text-success"></i></Button>
                  </div>
              </Card.Body>
            </Card>
          </Col>)):
          <div className="d-flex flex-column justify-content-center align-items-center mx-auto ">
            <img width={'50%'} height={'400px'} src="https://media.tenor.com/CC3o_ch_DGwAAAAM/john-travolta-hoarding.gif" alt="" />
            <h1 className='mt-3'>Your Wishlist is Empty</h1>
            <Link to={'/'} className='btn btn-info'>Click For Shop</Link>
          </div>}
        </Row>
      </div>
    </>
  )
}

export default Wishlist