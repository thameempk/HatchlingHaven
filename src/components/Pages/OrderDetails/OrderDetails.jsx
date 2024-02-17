import React, { useContext, useEffect, useState } from 'react'
import { MyContext3 } from '../../../App'
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import { Link, useParams } from 'react-router-dom'
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { items } from '../../Items';
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';

function OrderDetails() {
    const {token, role} = useContext(MyContext3)
    const {orderid} = useParams()
    const [details, setDetails] = useState({})

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

    const GetFullOrder = async () => {
        try{
            let response = await axios.get(`http://localhost:5237/api/Order/get-detailed-order?orderId=${parseInt(orderid)}`,{
                headers : {
                    "Authorization" : `Bearer ${token}`
                }
            })
            let result = await response.data
            setDetails(result)

        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=> {
        GetFullOrder()
    }, [token, role , details])
  return (
    
        role == 'admin' ? (
            <div>
                
                <h2>OrderDetails</h2>

                <div style={{display:"flex", justifyContent:"center"}}>
                  <Card style={{ width: '24rem' }}>
  <Card.Body>
    <Card.Title>Name: {details?.customerName}</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">E-mail: <MDBBadge pill className='mx-2' color='dark' light>
    {details?.customerEmail}
      </MDBBadge></Card.Subtitle>
    <Card.Subtitle className="mb-2 text-muted">Phone: <MDBBadge pill className='mx-2' color='dark' light>
    {details?.customerPhone}
      </MDBBadge></Card.Subtitle>
    <Card.Subtitle className="mb-2 text-muted">City:<MDBBadge pill className='mx-2' color='dark' light>
    {details?.customerCity}
      </MDBBadge> </Card.Subtitle>
    <Card.Subtitle className="mb-2 text-muted">Address:<MDBBadge pill className='mx-2' color='dark' light>
    {details?.homeAddress}
      </MDBBadge>  </Card.Subtitle>
    <Card.Subtitle className="mb-2 text-muted">OrderId:<MDBBadge pill className='mx-2' color='dark' light>
    {details?.orderString}
      </MDBBadge>  </Card.Subtitle>
    <Card.Subtitle className="mb-2 text-muted">TransactionId: <MDBBadge pill className='mx-2' color='dark' light>
    {details?.transactionId}
      </MDBBadge> </Card.Subtitle>
    <Card.Subtitle className="mb-2 text-muted">Order Date: <MDBBadge pill className='mx-2' color='dark' light>
    {details?.orderDate}
      </MDBBadge></Card.Subtitle>
    <Card.Subtitle className="mb-2 text-muted">Status:<MDBBadge pill className='mx-2' color='dark' light>
    {details?.orderStatus}
      </MDBBadge> <MDBDropdown group className='shadow-0'>
        <MDBDropdownToggle color='light'></MDBDropdownToggle>
        <MDBDropdownMenu>
        <MDBDropdownItem link onClick={()=>updateOrder(details.id,'processing')}>Processing</MDBDropdownItem>
          <MDBDropdownItem link onClick={()=>updateOrder(details.id,'shipped')}>Shipped</MDBDropdownItem>
          <MDBDropdownItem link onClick={()=>updateOrder(details.id,'delivered')}>Delivered</MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown></Card.Subtitle>
  </Card.Body>
</Card>
            </div>

            <div className='container shadow mt-3'>
            <MDBTable align='middle'>
      <MDBTableHead>
        <tr>
          <th scope='col'>Product Name</th>
          <th scope='col'>Price</th>
          <th scope='col'>Quantity</th>
          <th scope='col'>Total Price</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {
           
                details?.orderProducts?.map((item) => (
                    <tr>
                    <td>
              <div className='d-flex align-items-center'>
                <img
                  src={item.productImage}
                  alt=''
                  style={{ width: '45px', height: '45px' }}
                  className='rounded-circle'
                />
                <div className='ms-3'>
                  <p className='fw-bold mb-1'>{item.productName}</p>
                </div>
              </div>
            </td>
            <td>
              <p className='fw-normal mb-1'>{item.price}</p>
            </td>
            <td>
              <p className='fw-normal mb-1'>{item.quantity}</p>
            </td>
            <td>{item.totalAmount}</td>
            </tr>
                ))
            
      
        }
        
        
      </MDBTableBody>
    </MDBTable>
            </div>
                
                </div>
        ) : (
            <div className='mb-3'>
            <p>admin is not loged</p>
            <Link to={'/signin'}>Please Login</Link>
          </div>
        )
    
   
  )
}

export default OrderDetails