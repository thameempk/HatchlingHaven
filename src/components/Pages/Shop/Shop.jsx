import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { MyContext2 } from '../../../App';
import { MyContext3 } from '../../../App';
import { Link, useNavigate } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import { FaFilter } from "react-icons/fa";
import Pagination from '@mui/material/Pagination';
import { MDBBtn } from 'mdb-react-ui-kit';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { MDBPagination, MDBPaginationItem, MDBPaginationLink } from 'mdb-react-ui-kit';
import "./Shop.css"
import axios from 'axios';
import { Nav } from 'react-bootstrap';
function Shop({ cartPlus, cartMin, ViewItem, priceItem }) {
  const { item } = useContext(MyContext2)
  const { addCart, token,addToWishList, removeWishListItem,wishListExist, wishListItems } = useContext(MyContext3)
  const nav = useNavigate()
  const [pagProduct, setPagProduct] = useState([{}])
  const [categories, setCategories] = useState([{}])
  const [pNumber, setPNumber] = useState(1)
  const categoriesList = async () => {
    try {
      let response = await axios.get(`http://localhost:5237/api/Category`)
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

  const paginatedProduct = async () => {
    try {
      let response = await axios.get(`http://localhost:5237/api/Product/paginated-product?pageNumber=${pNumber}&PageSize=${8}`)
      let result = await response.data
      setPagProduct(result)
    } catch (err) {
      console.log(err)
    }
  }

  const [price, setPrice] = useState("")
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    categoriesList()
    paginatedProduct()
  }, [pNumber, categories, token])


  return (
    <div className='div mb-3'>
      <h1 className='header-shop' style={{ textShadow: "2px 2px black" }}>Shop</h1>
      <br />
      <span onClick={handleShow} style={{ fontWeight: "600" }} className="filter-span"> <FaFilter className='filter' /> Filter</span>
      <br />

      <Offcanvas classNam="offcan" show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <input type="text" className='price-input' placeholder='enter your price range...' onChange={(e) => setPrice(e.target.value)} />
        <Button variant='info' className='m-2 price-btn' onClick={() => priceItem(price)}>sort</Button>
        {
          categories.map((list) => (
            <>
              <Button className='btn-filter' onClick={() => nav(`/shop/${list.name}`)}>{list.name}</Button>
            </>
          ))
        }

      </Offcanvas>


      <div className='container mt-5'>
        <div className='row'>

          {

            pagProduct.map((item) => (
              <div className='col-md-3 col-12 mt-2 container' key={item.id} style={{ display: "flex", justifyContent: "center" }}>
                <CardGroup>
               
                  <Card style={{ width: "15rem", minHeight: "26rem", padding: "5px", display: "flex", alignItems: "center", justifyContent: "center" }} className='shadow d-flex'>
                  { wishListItems?.some((prd)=> prd.id == item.id) ? <FaHeart style={{position:"absolute", marginTop:"-160%",marginRight:"80%", fontSize:"20px"}} onClick={()=>addToWishList(item.id)}/> :  <FaRegHeart  style={{position:"absolute", marginTop:"-160%",marginRight:"80%", fontSize:"20px"}} onClick={()=>addToWishList(item.id)}/>}
                  
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
            <Pagination count={pageNumber} onChange={handleChane} color="primary" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop
