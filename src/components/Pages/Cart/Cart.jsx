import React, { useContext, useEffect, useState } from 'react'
import { MyContext3 } from '../../../App'
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import "./Cart.css"
import { IoCloseCircleOutline } from "react-icons/io5";
import Signin from '../User/Signin';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Cart({cartSecPlus,cartSecMin, delCart}) {
    const { placeOrder, token} = useContext(MyContext3)
    const navigate = useNavigate()
    const [cart , setCart] = useState(null)

    const cartItems = async () => {
      try {

        let response = await axios.get("http://localhost:5237/api/Cart/get-cart-items",{
          headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
          }
          
        })

        let result = await response.data
        setCart(result)

      }catch(err) {
        console.log(err)
      }
    }

    const total = cart?.reduce((total, item) => item.totalAmount + total, 0)


    useEffect(()=> {
      cartItems()
    } , [cart])



return ( 
    <>
    
      {
  token != null ? (
    cart?.length != 0 && cart != null ? (
      <>
      <Button className='m-3' variant='warning' onClick={()=>navigate('/orderstatus')}>Order Status</Button>
        <h1 className='cart-title'>Cart</h1>
        <div className='container cart-table' style={{ marginTop: '50px' }}>
          <div className='cart-tab'>
            <Table striped >
              <thead>
                <tr>
                  <th></th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart?.map((item, index) => (
                  <tr key={item.id}>
                    <td><img className='cart-image' src={item.productImage} alt='' /></td>
                    <td className='td-pad'>
                      {item.productName}
                    </td>
                    <td className='td-pad'>
                      <span>₹{item.price}</span>
                    </td>
                    <td className='td-pad'>
                      <span>
                        <Button variant='secondary' onClick={() => cartSecPlus(item.productId)}>+</Button>
                        <span>{item.quantity}</span> <Button variant='secondary' onClick={() => cartSecMin(item.productId)}>-</Button>
                      </span>
                    </td>
                    <td className='td-pad'>
                      <span>₹{item.totalAmount}</span>
                    </td>
                    <td className='td-pad'>
                      <IoCloseCircleOutline style={{ fontSize: '20px' }} onClick={() => delCart(item.productId)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <div className="checkout cart-tab2 ">
            <Table striped >
              <thead>
                <tr>
                  <th className='td-pad'>Cart Totals</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='td-pad'>Sub Total</td>
                  <td className='td-pad'>₹{total}</td>
                </tr>
                <tr>
                  <td className='td-pad'>Total</td>
                  <td className='td-pad'>₹{total}</td>
                </tr>
                <tr>
                  <td colSpan={2}><Button variant='danger' onClick={()=>placeOrder(cart,total)}>PROCEED TO CHECKOUT</Button></td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </>
    ) : (
      <div>
        <h1>Cart is empty</h1>
      </div>
    )
  ) : <Signin/>
}
      
    </>
  );
}

export default Cart
