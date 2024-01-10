import React, { useEffect, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addToWishlist } from '../Redux/Slice/wishlistSlice'
import { addToCart } from '../Redux/Slice/cartSlice'
import Header from '../Components/Header'

function View() {
  const {id} = useParams()
  const {loading} = useSelector((state)=>state.productSlice)
  const {wishlist} = useSelector(state=>state.wishlistSlice)

  const [product,setProduct] = useState({})
  const dispatch = useDispatch()

  useEffect(()=>{
    const products = JSON.parse(localStorage.getItem("products"))
    setProduct(products.find(product=>product.id==id))
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
    <>
    <Header/>
      <div style={{marginTop:'100px'}} className="container">
          {
            loading?<div className="d-flex justify-content-center mt-5">
            <Spinner className="me-3" animation="border" variant="primary" />Loading...
          </div>:
            <div className="row mt-5 align-items-center">
              <div className="col-md-4">
                  <img className='shadow rounded' style={{width:'100%',height:'400px'}} src={product?.thumbnail} alt="product image" />
              </div>
              <div className="col-md-2"></div>
              <div className="col-md-6">
                  <p>PID : {product?.id}</p>
                  <h1>{product?.title} </h1>
                  <h5 className='fw-bolder'>$ {product?.price}</h5>
                  <p style={{textAlign:'justify'}}><span className='fw-bolder'>Descrption:</span>
                  {product?.description}
                  </p>
                  <div className="d-flex gap-5 mt-3">
                  <Button onClick={()=>handleWishlist(product)} className="btn btn-light btn-outline-danger fs-5"><i className="fa-solid fa-heart text-warning"></i> Wishlist</Button>
                  <Button onClick={()=>dispatch(addToCart(product))} className="btn btn-light btn-outline-success fs-5"><i className="fa-solid fa-cart-plus text-primary"></i> Cart</Button>
                  </div>
              </div>
          </div>}
      </div>
    </>
  )
}

export default View