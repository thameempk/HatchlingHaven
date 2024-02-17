import React, { useContext, useState } from 'react'
import "./Header.css"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useNavigate } from 'react-router-dom';
import { MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle } from 'mdb-react-ui-kit';
import { MyContext, MyContext1 } from '../../../App';
import { IoBagRemoveOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import {
  MDBContainer,
  MDBNavbar,
  MDBBtn,
  MDBInputGroup
} from 'mdb-react-ui-kit';

import { FaShoppingCart } from "react-icons/fa";
import { MyContext3 } from '../../../App';
import axios from 'axios';
function Header({ setSearch, handleSearch}) {
   const user = useContext(MyContext)
   const {login} = useContext(MyContext1)
   const [searchTerm ,setSerchTerm] = useState("")
   const {role, logOut, token, userName, searchProduct} = useContext(MyContext3)


   

   const nav = useNavigate()
  return (
    <>
        {
          role == 'admin' ? (
            [ 'xxl'].map((expand) => (
              <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
                <Container fluid>
                  <Navbar.Brand  className='header-title'>Hatchling Haven </Navbar.Brand>
                  <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                  <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-${expand}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                    placement="end"
                  >
                    <Offcanvas.Header closeButton>
                      <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                      Hatchling Haven 
                      </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                      <Nav className="justify-content-end flex-grow-1 pe-3">
                        <Nav.Link ><Link to={'/admin'} className='linkmain'>Home</Link></Nav.Link>
                        <Nav.Link > <Link className='linkmain' to={'/admin/allproducts'}>Products</Link></Nav.Link>
                        <Nav.Link > <Link className='linkmain' to={'/admin/users'}>Users</Link></Nav.Link>
                      </Nav>
                      <Form className="d-flex">
                        <Form.Control
                          type="search"
                          placeholder="Search"
                          className="me-2"
                          aria-label="Search"
                          onChange={(e)=>searchProduct(e.target.value)}
                        />
                      </Form>
                      <Button className='mt-3' onClick={logOut}>logout</Button>
                    </Offcanvas.Body>
                  </Navbar.Offcanvas>
                </Container>
              </Navbar>
            ))
          ) : (
            [ 'md'].map((expand) => (
              <Navbar key={expand} expand={expand} className="nav-head" >
                <Container fluid>
                  <Navbar.Brand ><Link  className='header-title' to={'/'}>Hatchling Haven  </Link></Navbar.Brand>
                  <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                  <Navbar.Offcanvas className="off"
                    id={`offcanvasNavbar-expand-${expand}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                    placement="end"
                  >
                    <Offcanvas.Header closeButton >
                      <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} >
                      Hatchling Haven 
                      </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body >
                      <Nav className="justify-content-end flex-grow-1 pe-3 nav-temp">
                        <Nav.Link href="" style={{color:"black"}}><Link className='linkmain' to={'/'} s>Home</Link></Nav.Link>
                        <Nav.Link href=""><Link className='linkmain' to={'/shop'}>Shop</Link></Nav.Link>
                        
                        
                        
                       <Nav.Link href=""><Link className='linkmain' to={'/cart'}><FaShoppingCart /></Link></Nav.Link>
                       
                      </Nav>
                      <MDBInputGroup tag="form" className='d-flex w-auto m-2'>
              <input className='form-control' placeholder="Type query" aria-label="Search" type='Search' onChange={(e)=>searchProduct(e.target.value)}/>
            </MDBInputGroup>
            
            <MDBDropdown >
        <MDBDropdownToggle><FaRegUserCircle style={{fontSize:"30px"}}/> </MDBDropdownToggle>
        <MDBDropdownMenu>
          <MDBDropdownItem link onClick={()=>nav('/signin')}>{token  ? userName : "Login"}</MDBDropdownItem>
          <MDBDropdownItem link onClick={logOut}>{
                          token ?  
                          "Logout" : ""
                       }</MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>
           
                    </Offcanvas.Body>
                  </Navbar.Offcanvas>
                </Container>
              </Navbar>
            ))
            
          )
       
      
      }
    </>
  )
}

export default Header


