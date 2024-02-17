import React, { useContext, useEffect, useState } from 'react'
import { MyContext2 } from '../../../App'
import { useNavigate, useParams } from 'react-router-dom'
import { MdDelete } from "react-icons/md";
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import CardGroup from 'react-bootstrap/CardGroup';
import { MyContext3 } from '../../../App';
import axios from 'axios';
function ProductsCategory({deleteItem, isAdminLoged}) {
    const {item} = useContext(MyContext2)
    const {role} = useContext(MyContext3)
    const {category} = useParams()
    const [products, setProducts] = useState([{}])
    const productByCategory =  async () => {
      try {
        let response = await axios.get(`http://localhost:5237/api/Product/product-by-category?categoryName=${category}`)
        let result = await response.data
        setProducts(result)
      }catch(err){
        console.log(err)
      }
    }
    const datas = item.filter((item)=> item.category === category)
    const navigate = useNavigate()
    useEffect(()=>{productByCategory()}, [])
  return (
<>
    {
        role == 'admin' ? (
            <div className='container'>
                <Button className='m-3' onClick={()=>navigate('/admin')}>Back</Button>
            <div className='row'>
                <h1>{category}</h1>
                {
                    
                    products.map((item) => (
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
                    ))
                 
                }
             </div>  
        </div>
        ) : (
            <div className='mb-3'>
                <p>admin is not loged</p>
                <Link to={'/admin/login'}>Please Login</Link>
            </div>
        )
    }
    </>
  )
}

export default ProductsCategory