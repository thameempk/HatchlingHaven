import React, { useContext } from 'react'
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import { MDBBtn } from 'mdb-react-ui-kit';
import { MyContext3 } from '../../../App';
function Search({searchResult}) {
  const {addCart,serachProducts } = useContext(MyContext3)
  return (
    <div className='container mt-5'>
        <div className='row'>

          {

          serachProducts?.map((item) => (
              <div className='col-md-3 col-12 mt-2 container' key={item.id} style={{ display: "flex", justifyContent: "center" }}>
                <CardGroup>
                  <Card style={{ width: "15rem", minHeight: "26rem", paddingBottom: "5px", display: "flex", alignItems: "center", justifyContent: "center" }} className='shadow d-flex'>
                    <Link style={{ textDecoration: "none", color: "black" }} to={`/${item.id}`}>
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
                    <MDBBtn color='dark' onClick={() => addCart(item.id)}>
                    Add to cart
      </MDBBtn>
                    
                  </Card>

                </CardGroup>

              </div>
            ))}
          <div className='col-12 d-flex m-5' style={{ justifyContent: "center" }} >
          </div>
        </div>
      </div>
  )
}

export default Search