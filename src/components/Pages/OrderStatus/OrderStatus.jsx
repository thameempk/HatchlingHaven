import React, { useContext, useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { MyContext, MyContext3 } from '../../../App';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Signin from '../User/Signin';
import axios from 'axios';
function OrderStatus({user, login , log}) {
    const isLoged = useContext(MyContext)
    const {token} = useContext(MyContext3)
    const [userOrderDetails, setUserOrderDetails] = useState([{}])

    const orderDetails = async () => {
      try{
        let response = await axios.get("http://localhost:5237/api/Order/get_order_details",{
          headers :{
            "Authorization" : `Bearer ${token}`
          }
        })
        let result = await response.data
        setUserOrderDetails(result)
      }catch(err){
        console.log(err)
      }
    }

    useEffect(()=>{
      orderDetails()
    }, [token])

  return (
    <div>
        {
            token != null ? (
                <div className='container mt-5 mb-5' style={{display:"flex", justifyContent:"center"}}>
            <div className='row'>
        <h1>Order Status</h1>
             <Table striped bordered hover variant="dark">
  <thead>
    <tr>
     
      <th></th>
      <th>Product Name</th>
      <th>Price</th>
      <th>Quantity</th>
      <th>Order Date</th>
      <th>OrderId</th>
      <th>order status</th>
    </tr>
    </thead>
    <tbody>
      {
        userOrderDetails.map((item)=>(
          <tr>
      <td><img className='img-fluid' style={{height:"3rem"}} src={item.productImage} alt="" /></td>
      <td>{item.productName?.slice(0,20)}...</td>
      <td>{item.totalPrice}</td>
      <td>{item.quantity}</td>
      <td>{item.orderDate}</td>
      <td>{item.orderId}</td>
      <td> <MDBBadge pill className='mx-2' color='primary' > {item.orderStatus}</MDBBadge></td>
    </tr>
        ))
      } 
                
            </tbody>
</Table>    
                </div>
        
          </div>
            ) : <Signin log={log} />
        }
        
    </div>
  )
}

export default OrderStatus