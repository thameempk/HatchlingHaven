import React, { useContext } from 'react'
import { MyContext2 } from '../../../App'
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { MyContext3 } from '../../../App';
import { Link } from 'react-router-dom';
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import Carousel from 'react-bootstrap/Carousel';

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple
} from 'mdb-react-ui-kit';

import "./Home.css"
function Home({ cartMin, cartPlus }) {
  const {  addCart, item } = useContext(MyContext3)


  

  return (
    <div className="home mb-3">
      <div>
        <Carousel fade className='shadow'>
          <Carousel.Item>
            <img src={require(`../../../images/WhatsApp Image 2023-11-28 at 16.52.34_437d8868.jpg`)} alt="" style={{ width: "100%", maxHeight: "100vh" }} />
            <Carousel.Caption>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={require(`../../../images/WhatsApp Image 2023-11-28 at 16.52.35_1f833ebf.jpg`)} alt="" className='mt-0' style={{ width: "100%", maxHeight: "100vh" }} />

            <Carousel.Caption>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={require(`../../../images/WhatsApp Image 2023-11-28 at 16.52.36_97238268.jpg`)} alt="" className='mt-0' style={{ width: "100%", maxHeight: "100vh" }} />

            <Carousel.Caption>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className='container m-5'>
        <div className='row'>
  {
    item.slice(0,6).map((item)=>(
      <div className='col-2' style={{display:"flex", justifyContent:"column"}}>
      <div className='hover-zoom'>
      <img
  
      src={item.productImage}
      className='img-fluid rounded-circle m-2 w70'
      alt=''
      style={{ width: '100px', height: '100px' }}
    />
</div>
</div>
    ))
 
  }
  </div>
  </div>
      
    </div>
  )
}

export default Home
