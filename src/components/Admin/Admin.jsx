import React, { useContext, useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Tab from 'react-bootstrap/Tab';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBCardFooter,
  MDBBtn
} from 'mdb-react-ui-kit';
import { MyContext3  } from '../../App';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Admin() {
  const {role, token} = useContext(MyContext3)
  const [totalrevenue, setTotalRevenue] = useState(null)
  const [orderDetails, setOrderDetails] = useState([{}])
  const [totalOrders, setTotalOrders] = useState(0)
  const [todayOrders, serTodayOrders] = useState(0)
  const [todayRevenue, setTodayRevenue] = useState(0)
  console.log(todayRevenue)
  const GettotalRevenue = async () => {
    try {
      let response = await axios.get("http://localhost:5237/api/Order/total_revenue",{
        headers : {
          "Authorization" : `Bearer ${token}`
        }
      })
      let result = response.data
      setTotalRevenue(result)
    }catch(err){
      console.log(err)
    }
  }

  const GetOrderDetails = async () =>{ 
    try{
      let response = await axios.get("http://localhost:5237/api/Order/get-order-details-admin", {
        headers : {
          "Authorization " : `Bearer ${token}`
        }
      })
      let result = await response.data
      setOrderDetails(result)
    }catch(err) {
      console.log(err)
    }
  }

  const GetTotalOrders =  async () =>{
    try{
      let response = await axios.get("http://localhost:5237/api/Order/total-orders",{
        headers : {
          "Authorization"  : `Bearer ${token}`
        }
      })
      let result = response.data
      setTotalOrders(result)
    }catch(err){
      console.log(err)
    }
  }
  const GetTodayOrders =  async () =>{
    try{
      let response = await axios.get("http://localhost:5237/api/Order/today-orders",{
        headers : {
          "Authorization"  : `Bearer ${token}`
        }
      })
      let result = response.data
      serTodayOrders(result)
    }catch(err){
      console.log(err)
    }
  }
  const GetTodayRevenue =  async () =>{
    try{
      let response = await axios.get("http://localhost:5237/api/Order/today-revenue",{
        headers : {
          "Authorization"  : `Bearer ${token}`
        }
      })
      let result = response.data
      setTodayRevenue(result)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    GettotalRevenue()
    GetOrderDetails()
    GetTotalOrders()
    GetTodayOrders()
    GetTodayRevenue()
  }, [role,token,todayRevenue])

  return (
    <>
    {
      role == 'admin' ? (
        <>
        <div className='container' style={{display : "flex",  justifyContent: "center", alignContent :"center"}}>
      <div className='row'>
      <div style={{  height : "120px", width:"240px", borderRadius: "10px"}} className='col-12 col-md-3 m-3 bg-success shadow'>
        <h4 className='text-white' style={{padding:"7px", fontSize:"30px"}}>Total Revenue</h4>
        <h3 className='text-white'>₹{totalrevenue}</h3>
      </div>
      <div style={{ height : "120px", width:"240px", borderRadius: "10px"}} className='col-12 col-md-3 m-3 bg-secondary'>
      <h4 className='text-white' style={{padding:"7px", fontSize:"30px"}}>Total Orders</h4>
        <h3 className='text-white'>{totalOrders}</h3>
</div>
<div style={{ height : "120px", width:"240px", borderRadius: "10px"}} className='col-12 col-md-3 m-3 bg-info'>
<h4 className='text-white' style={{padding:"7px", fontSize:"30px"}}>Today Orders</h4>
        <h3 className='text-white'>{todayOrders}</h3>
</div>
<div style={{height : "120px", width:"240px", borderRadius: "10px"}} className='col-12 col-md-3 m-3 bg-dark'>
<h4 className='text-white' style={{padding:"7px", fontSize:"30px"}}>TodayRevenue</h4>
        <h3 className='text-white'>₹{todayRevenue}</h3>
</div>

      </div>

      
   
    </div>
    <div className='container shadow mt-2 mb-2' style={{display:"flex" , justifyContent :"center"}}>
      {
        orderDetails.length == 0 ? (
          <div>
            <h1>No Order Details Available!</h1>
          </div>
        ) : (
          <Table striped>
    <thead>
      <tr>
        <th>id</th>
        <th>Customer Name</th>
        <th>Customer Email</th>
        <th>Order Date</th>
        <th>Trasaction Id</th>
        <th>Order Id</th>
        <th>Order Status</th>
      </tr>
    </thead>
    <tbody>
      {orderDetails?.map((user) => (
        <tr key={user.id}>

          <td>{user.id}</td>
          <td className='link-tab'><Link style={{ textDecoration: "none", color: "black" }} to={`/admin/orderdetails/${user.id}`}>{user.customerName}  </Link></td>
          <td>{user.customerEmail}</td>
          <td>{user.orderDate}</td>
          <td>{user.transactionId}</td>
          <td>{user.orderId}</td>
          <td>{user.orderStatus}</td>
        </tr>
      ))

      }

    </tbody>
  </Table>
        )
      }
    
  </div>
  </>
      ): (
        <div className='mb-3'>
        <p>admin is not loged</p>
        <Link to={'/signin'}>Please Login</Link>
      </div>
      )
    }
    
    
    </>
  )
}

export default Admin