import React, { useContext, useEffect, useState } from 'react'
import { MyContext2 } from '../../../App'
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Pagination from '@mui/material/Pagination';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { MyContext3 } from '../../../App';
import axios from 'axios';
function Allproducts({isAdminLoged , cat  }) {
    const {item} = useContext(MyContext2)
    const {role, token} = useContext(MyContext3)
    const navigate = useNavigate()
    const [pNumber, setPNumber] = useState(1)
    const [categories, setCategories] = useState([{}])
    const [pagProduct, setPagProduct] = useState([{}])

    const paginatedProduct = async () => {
      try {
        let response = await axios.get(`http://localhost:5237/api/Product/paginated-product?pageNumber=${pNumber}&PageSize=${8}`)
        let result = await response.data
        setPagProduct(result)
      } catch (err) {
        console.log(err)
      }
    }

    const deleteItem =  async (id) => {
      try {
        let response = await axios.delete(`http://localhost:5237/api/Product/${id}`,
      {
        headers : {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${token}`
        }
      }
      )

      let result = await response.data
      }catch(err) {
        console.log(err)
      }
      
    }

    const categoriesList = async () => {
      try {
        let response = await axios.get(`http://localhost:5237/api/Category`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        })
        let result = await response.data
        setCategories(result)
  
      } catch (err) {
        console.log(err)
      }
    }

    const handleChane = (e, p) => {
      setPNumber(p)
    }
    const pageNumber = Math.ceil(item.length / 8)

    useEffect(() => {
      categoriesList()
      paginatedProduct()
    }, [pNumber, token , categories])
  return (
    <>
    {
      role == 'admin' ? (
        <div className='container mt-5'>
          <Button className='m-2' onClick={()=>navigate('/admin')}>Back</Button>
        <Button variant='success' onClick={()=>navigate('/admin/allproducts/addproduct')}>Add new Products</Button>
        <Button className='m-2' onClick={()=>navigate('/admin/allproducts/addcategory')}>Add New Category</Button>
        <ButtonGroup className='m-2' vertical>
      <DropdownButton
        as={ButtonGroup}
        title="Category"
        id="bg-vertical-dropdown-3"
      >
        {
          categories.map((item)=>(
            <Dropdown.Item eventKey="1"><Link style={{textDecoration:"none", color:"black"}} to={`/admin/allproducts/category/${item.name}`}>{item.name}</Link></Dropdown.Item>
          ))
        }
       
      </DropdownButton>
      </ButtonGroup>
      <div className='container mt-5'>
        <div className='row'>

          {

            pagProduct.map((item) => (
              <div className='col-md-3 col-12 mt-2 container' key={item.id} style={{ display: "flex", justifyContent: "center" }}>
                <CardGroup>
                  <Card style={{ width: "15rem", minHeight: "26rem", paddingBottom: "5px", display: "flex", alignItems: "center", justifyContent: "center" }} className='shadow d-flex'>
                    <Link style={{ textDecoration: "none", color: "black" }} to={`/admin/allproducts/${item.id}`}>
                      <div className='bg-image hover-zoom'>
                        <Card.Img variant="top" src={item.productImage} className='img-fluid mt-2 w70' style={{ height: "10rem", width: "10rem" }} />
                      </div>
                      <Card.Body>
                        <Card.Text style={{ fontWeight: "600" }}>{item.productName}</Card.Text>
                        <Card.Text style={{ fontWeight: "600" }}>
                          <span > ₹{item.price}</span>
                        </Card.Text>

                      </Card.Body>
                    </Link>
                    <Card.Text><MdDelete style={{textAlign:"center", fontSize:"20px"}} onClick={()=>deleteItem(item.id)}/></Card.Text>
                  </Card>

                </CardGroup>

              </div>
            ))}
          <div className='col-12 d-flex m-5' style={{ justifyContent: "center" }} >
            <Pagination count={pageNumber} onChange={handleChane} color="primary" />
          </div>
        </div>
      </div>
    </div>
      ) :  (
        <div className='mb-3'>
            <p>admin is not loged</p>
            <Link to={'/admin/login'}>Please Login</Link>
        </div>
     )
    }
    
    </>
  )
}

export default Allproducts


      
