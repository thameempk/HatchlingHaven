import React, { useContext, useEffect, useState } from 'react'
import { MyContext3 } from '../../../App'
import { MDBBtn } from 'mdb-react-ui-kit';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { Link, useParams } from 'react-router-dom';
import './Products.css'
import axios from 'axios';
function Products() {
    const {addCart,prd, token} = useContext(MyContext3)
    const {category} = useParams()
    const [item , setItems] = useState([{}])
    const productByCategory =  async () => {
      try {
        let response = await axios.get(`http://localhost:5237/api/Product/product-by-category?categoryName=${category}`)
        let result = await response.data
        setItems(result)
      }catch(err){
        console.log(err)
      }
    }
console.log(item)
    useEffect(()=> {productByCategory()},[item,category])
  return (
    <>
    
      <h1 className='prd-head'>{prd.slice(0,1).map((item)=> item.category)}</h1>

      <div className='container mt-5'>
        <div className='row'>

          {

        item.map((item) => (
              <div className='col-md-3 col-6 mt-2' key={item.id}>
                <CardGroup>
                  <Card style={{ width: "12rem", height: "26rem" ,alignItems:"center"}} className='shadow d-flex'>
                    <Link style={{ textDecoration: "none", color: "black" }} to={`/${item.id}`}>
                      <Card.Img variant="top" src={item.productImage} className='img-fluid mt-2' style={{ height: "10rem", width: "10rem" }} />
                      <Card.Body>
                        <Card.Text style={{ fontWeight: "600" }}>Name:{item.productName}</Card.Text>
                      </Card.Body>
                      <Card.Text style={{ fontWeight: "600" }}>
                          <span > ₹{item.price}</span>
                        </Card.Text>
                    </Link>
                    <MDBBtn color='dark' onClick={() => addCart(item.id)}>
                    Add to cart
      </MDBBtn>
                  </Card>

                </CardGroup>

              </div>
            ))

          }
        </div>
        </div>
    
    </>
  )
}

export default Products