import React, { useContext } from 'react'
import { MyContext3 } from '../../../App'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import "./Payment.css"
import Signin from '../User/Signin';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Payment({total, cart, orderTotal, isLoged, orderPlace}) {
  const {order, ordersec, orderItems, totalPrice, placeOrder, token, userName, userEmail} = useContext(MyContext3)
  const [validated, setValidated] = useState(false);
  const [raz, setRaz] = useState(null)
  const [orderStatus, setOrderStatus] = useState(false)
  const [orderDetails, setOrderDetails] = useState(null)
  const nav = useNavigate()

  const loadScript = (src) => {
    return new Promise((res) => {
        const script = document.createElement('script');
        script.src = src;

        script.onload = () => {
            res(true);
        };
        script.onerror = () => {
            res(false);
        };

        document.body.appendChild(script);
    });
};

    const veryPayment = async () => {
      try {
        let response = await axios.post("http://localhost:5237/api/Order/payment",{
          razorpay_order_id : raz.razorpay_order_id,
          razorpay_payment_id : raz.razorpay_payment_id,
          razorpay_signature : raz.razorpay_signature

        },{
          headers : {
            "Authorization" : `Bearer ${token}`
          }
        })
        return await response.data
      }catch(err) {
        console.log(err)
      }
    }

const generateOrderId = async (totalPrice) =>{
  try{
    let response = await axios.post(`http://localhost:5237/api/Order/order-create?price=${totalPrice}`,null,{
        headers : {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${token}`
        }
    })
    let result = await response.data
    return result
  }catch(err){
    console.log(err)
  }
}


const handlePayment = async (price) => {
  try {
      

      const orderId = await generateOrderId(price)

      if (!orderId) {
          toast.error("Error during RazorPay initialization");
          return;
      }

      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

      if (!res) {
          toast.error("You are offline");
          return;
      }

      const options = {
          order_id: orderId ,
          name: "Hatchling Haven",
          description: "Thank you for purchasing",
          handler: function (res) {
              setRaz({
                  razorpay_payment_id: res.razorpay_payment_id,
                  razorpay_order_id: res.razorpay_order_id,
                  razorpay_signature: res.razorpay_signature
              });
              setOrderStatus(true)
          },
          prefill: {
              name: userName,
              email: userEmail
          }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    
  } catch (error) {
      console.error(error);
      toast.error("An error occurred during RazorPay payment.");
  }
};


  const handleSubmit = async (event) => {
    try {
      const form = event.currentTarget;
      event.preventDefault();
      if (form.checkValidity() === false) {
        event.stopPropagation();
      }
         setValidated(true);
      const paymentStatus = await veryPayment()
      if(paymentStatus){
      

         let response = await axios.post("http://localhost:5237/api/Order/place-Order",{
          customerName : orderDetails.customerName,
  customerEmail: orderDetails.customerEmail,
  customerPhone: orderDetails.customerPhone,
  customerCity: orderDetails.customerCity,
  homeAddress: orderDetails.customerCity,
  orderString: raz.razorpay_order_id,
  transactionId: raz.razorpay_payment_id,
         },{
          headers : {
            'Content-Type' : 'application/json',
            "Authorization" : `Bearer ${token}`
          }
         } )

         let result = await  response.data
         console.log(result)
         if(result) {
          toast.success("order successfully  placed");
          nav()
         }else{
          toast.error("order  placement failed");
         }

      }else{
        toast.error("must pay  to continue");
      }

     
      



    }catch(err){
      console.log(err)
    }
   



  };
  
  return (
    <>
    
    { token != null ?(
      <>
        <div className='container pay-sec ' style={{display:"flex" , justifyContent:"center"}}>
      <div className='form-elem'>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Name"
            defaultValue=""
            onChange={(e)=> setOrderDetails({...orderDetails , customerName : e.target.value})}
          />
        </Form.Group>
        </Row>
        <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="phone"
            defaultValue=""
            onChange={(e)=> setOrderDetails({...orderDetails , customerPhone : e.target.value})}
          />
        </Form.Group>
        </Row>
        <Row className="mb-3">
        <Form.Group className="mb-3" as={Col} md="6" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" onChange={(e)=> setOrderDetails({...orderDetails , customerEmail : e.target.value})}/>
      </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="City" required onChange={(e)=> setOrderDetails({...orderDetails , customerCity : e.target.value})}/>
        </Form.Group>
        </Row>
        <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom04">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="address" required onChange={(e)=> setOrderDetails({...orderDetails , homeAddress : e.target.value})}/>
        </Form.Group>
        </Row>
        <Button type='submit' className='m-3'>Order Now</Button>
    </Form>
    </div>
    <div className='order-det cart-tab'>
    <Table striped className='shadow'>
      <thead>
        <tr>
          <th className='td-pad'>Product</th>
          <th></th>
          <th>Qty</th>
          <th>Sub Total</th>
        </tr>
      </thead>
      <tbody>
        {
          orderItems.map((item)=>(
            <>
            <tr>
            <td><img className='cart-image' src={item.productImage} alt='' /></td>
            <td className='td-pad'>{item.productName?.slice(0,15)}...</td>
            <td className='td-pad'>{item.quantity}</td>
            <td className='td-pad'>{item.totalAmount}</td>  
        </tr>
       
        
        </>
          ))
        }
         <tr>
        <td className='td-pad'>Sub Total</td>
        <td></td>
        <td></td>
          <td className='td-pad'>₹{totalPrice}</td>   
        </tr>
        <tr>
            <td className='td-pad'>Total</td>
            <td></td>
            <td></td>
            <td className='td-pad'>₹{totalPrice}</td>
        </tr>
        <tr>
            <td colSpan={3}>{orderStatus ? <Button  variant='success' disabled>payment success</Button>:<Button onClick={()=>handlePayment(totalPrice)} variant='danger'>Pay Now</Button>}</td>
            
        </tr>
      </tbody>
    </Table>
    </div>
    </div> 
    
    </>   
    ) : <Signin/>
      
    }
    </>
  )
}

export default Payment