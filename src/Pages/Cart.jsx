import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { emptyCart, removeFromCart } from '../Redux/Slice/cartSlice'
import { Link, useNavigate } from 'react-router-dom'

function Cart() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector(state=>state.cartReducer)
  const [cartAmount,setCartAmount] = useState(0)

  useEffect(()=>{
    if(cart?.length>0){
      setCartAmount(cart?.map(product=>product?.totalPrice).reduce((price1,price2)=>price1+price2))
    }else{
      setCartAmount(0)
    }
  },[cart])

  const handleCheckout = () =>{
    alert("Your order has placed successfully... Thank you for shopping with us!!!")
    dispatch(emptyCart())
    navigate('/')
  }

  return (
    <div className="container mt-5">
        {
          cart?.length>0? <div className="row mt-5">
            <div className="col-lg-8">
                <h3 className="mt-5">Cart Summury</h3>
                <table className="table shadow mt-3">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Product</th>
                        <th>Image</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((product,index)=>(
                         <tr key={index}>
                         <td>{index+1} </td>
                         <td>{product.title} </td>
                         <td><img style={{width:'60px',height:'60px'}} src={product.thumbnail} alt="" /></td>
                         <td><input style={{width:'40px'}} className='form-control' type="text" value={product.quantity} readOnly /> </td>
                         <td>$ {product.totalPrice}</td>
                         <td><button onClick={()=>dispatch(removeFromCart(product.id))} className="btn"><i className="fa-solid fa-trash text-danger fs-5"></i></button></td>
                       </tr>
                      ))}
                    </tbody>
                </table>
                <div className="float-end">
                  <button onClick={()=>dispatch(emptyCart())} className="btn btn-danger me-3">Empty Cart</button>
                  <Link to={'/'} className='btn btn-info'>Shop More</Link>
                </div>
            </div>
            <div className="col-lg-4 mt-5">
              <div className="shadow border rounded p-4">
                <h5>Total Products :<span className="fw-bolder">{cart?.length} </span></h5>
                <h3>Total Amount :<span className="fw-bolder text-danger">$ {cartAmount} </span></h3>
                <div className="d-grid">
                  <button onClick={handleCheckout} className="btn btn-success">Checkout</button>
                </div>
              </div>
            </div>
        </div>:
        <div style={{width:'100%',height:'600px'}} className="d-flex flex-column justify-content-center align-items-center mx-auto mt-5">
        <img width={'50%'} height={'400px'} src="https://media.tenor.com/CC3o_ch_DGwAAAAM/john-travolta-hoarding.gif" alt="" />
        <h1 className='mt-3'>Your Cart is Empty</h1>
        <Link to={'/'} className='btn btn-warning'>Click For Shop</Link>
      </div>
        }
    </div>
  )
}

export default Cart