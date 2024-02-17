import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import { MyContext3 } from '../../../App';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle } from 'mdb-react-ui-kit';
import axios from 'axios';
import { string } from 'yup';
function User({user, isAdminLoged , setIsAdminLoged , setUser}) {
  const navigate = useNavigate()
    const {userid} = useParams()
    const {token , role} = useContext(MyContext3)
    const [singleUser, setSingleUser] = useState({})
    const [orderDetailsByUser , setOrderDetails ] = useState([{}])

    const userById = async () => {
      try {
        let response = await axios.get(`http://localhost:5237/api/User/${parseInt(userid)}`,{
          headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
          }
          
        })
        let result = await  response.data
        setSingleUser(result)
      }catch(err) {
        console.log(err)
      }
    }

    const orderDetails = async () =>{
      try {
        let response = await fetch(`http://localhost:5237/api/Order/adminUserOrder?userId=${parseInt(userid)}`,{
          method : 'GET',
          headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
          }
        })
        let result = await response.json()
        setOrderDetails(result)
      }catch(err){
        console.log(err)
      }
    }

    const updateOrder = async (id,status) => {
      try{
        let response = await axios.put(`http://localhost:5237/api/Order/update-order-status?orderId=${id}`,{
          orderStatus : status
        },
        {
          headers : {
            "Authorization" : `Bearer ${token}`
          }
        })
        let result = await response.data
      }catch(err){
        console.log(err)
      }
    }


    useEffect(()=> {
      userById()
      orderDetails()
    },[token, role, orderDetailsByUser])

  return (
    <>   
    {
      role == 'admin' ? (
        <div className='container mt-5'>
          <Button onClick={()=>navigate('/admin')}>Back</Button>

                  
                  <div style={{display:"flex", justifyContent:"center"}}>
                    <h1>User Details</h1>
                    </div>
                    <div style={{display:"flex", justifyContent:"center"}}>
                  <Card style={{ width: '24rem' }}>
  <Card.Body>
    <Card.Title>Name: {singleUser?.name}</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">E-mail: {singleUser?.email}</Card.Subtitle>
  </Card.Body>
</Card>
            </div>
           
            {
              
              orderDetailsByUser.length != 0 ? (
                <>
                <div style={{display:"flex", justifyContent:"center"}}>
                    <h1 className='mt-4'>Order Details</h1>
                    </div>
                    <div style={{display:"flex", justifyContent:"center"}}>
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
        orderDetailsByUser.map((item)=>(
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
                </>
              ) : (
                <h4 className='mt-4'>No Order History Found!</h4>
              )
            
            }
             
                  
                
       
        </div>
      ) :  (
        <div className='mb-3'>
            <p>admin is not loged</p>
            <Link to={'/signin'}>Please Login</Link>
        </div>
     )
    }    
           
        
    </>
  )
}

export default User