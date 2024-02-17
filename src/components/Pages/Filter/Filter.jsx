import React, { useContext, useEffect, useState } from 'react'
import { MyContext2 } from '../../../App'
import Button from 'react-bootstrap/Button';
import { FaShoppingCart } from "react-icons/fa";
import './Filter.css'
import { useParams } from 'react-router-dom'
import { MyContext3 } from '../../../App';
import axios from 'axios';
import toast from 'react-hot-toast';
function Filter({cartPlus, cartMin}) {
    const { addCart, placeOrder} = useContext(MyContext3)
    const {item} = useContext(MyContext2)
    const [singleProduct , setSingleProduct] = useState({})
    const { productid } = useParams()
    const prdid = Number(productid)
    const [seemore, setSee ] = useState(false)
    const seeFun = () =>{
        if(seemore === true){
            setSee(false)
        }else{
            setSee(true)
        }
    }
    // const Products = item.find((item)=> item.id === parseInt(prouctid))
    // console.log(Products)

    const productById = async () =>{
        try{

            let response = await axios.get(`http://localhost:5237/api/Product/${prdid}`);
            setSingleProduct(response.data)
            
        }catch(err) {
            console.log(err)
        }
    }

    useEffect(()=> {productById()},[prdid,singleProduct])
   

    return (
        <>

            {
                <div className='container ind shadow mb-3' style={{backgroundColor:"white"}} >
                    <div className='child1 col-sm-12'>
                    <img src={singleProduct?.productImage} alt="" className='img-fluid'/>
                    {/* <Button className='mt-2' variant='secondary' onClick={()=>cartPlus(Products.id)}>+</Button>< span className='mt-2' style={{fontWeight:"600", fontSize:"20px"}}>{Products.qty}</span><Button className='mt-2' variant='secondary' onClick={()=>cartMin(Products.id)}>-</Button> */}
                    <br />
                    <Button variant="warning" size="lg" className='m-3'  onClick={()=>addCart(singleProduct.id)}><FaShoppingCart /> Add to cart</Button> 
                    {/* <Button variant="danger" size="lg" onClick={()=>placeOrder(Products?.id)}>Buy now</Button> */}
                    </div>
                    <div className='child2 col-sm-12'>
                    <p className='p1'>{singleProduct?.productName}</p>
                <span className='p2'>₹{singleProduct?.price}</span>
                <br />
                <br />
                { seemore ? <p className='p3'>{singleProduct.productDescription}</p> : <p className='p3'>{`${singleProduct?.productDescription?.slice(0,200)}...`}</p>}<span style={{color:"blue",}} onClick={seeFun}>{seemore ? "see less..." :   "see more..."}</span>
                
                </div>
                </div>
                
            }

        </>
        

    )
}

export default Filter