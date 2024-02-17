import React, { useContext, useEffect, useState } from 'react'
import { MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle } from 'mdb-react-ui-kit';
import { MyContext2 } from '../../../App'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaEdit } from "react-icons/fa";
import { MyContext3 } from '../../../App'
import axios from 'axios'
import toast from 'react-hot-toast'
function ProductPage() {
    const navigate = useNavigate()
    const {item, setItems} = useContext(MyContext2)
    const {role, token} = useContext(MyContext3)
    const [categories, setCategories] = useState([{}])
    const [singleProduct, setSingleProduct] = useState({})
    const [image, setImage] = useState(null)
    const [categoryId , setCategoryId] = useState("")
    const {productid} = useParams()

    // Get single product by id

    const productById = async () => {
        try{
            let response = await axios.get(`http://localhost:5237/api/Product/${parseInt(productid)}`)
            let result = await response.data
            setSingleProduct(result)
        }catch(err) {
            console.log(err)
        }
    }

    const categoriesList = async () => {
        try {
          let response = await axios.get(`http://localhost:5237/api/Category`)
          let result = await response.data
          setCategories(result)
    
        } catch (err) {
          console.log(err)
        }
      }

     
    //   console.log(typeof defCatId.id )

    const filterData = item.find((item)=> item.id === parseInt(productid))
    const [edit, setEdit] = useState(null)
    const [updatedItem, setUpdatedItem] = useState({})
   
    const handleUpdate = async (id) =>{
        try {
            const res = await fetch(singleProduct.productImage, {
                headers : {
                    "Authorization" : `Bearer ${token}`
                }
            });
            const blob = await res.blob();
            const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
            const defCatId = categories.find((item) => item.name == singleProduct?.category)
            const formdata = new FormData()
            formdata.append('productDto.ProductName', updatedItem.productName || singleProduct.productName)
            formdata.append('productDto.price', updatedItem.price || singleProduct.price)
            formdata.append('productDto.categoryId', categoryId || defCatId.id)            
            formdata.append('productDto.productDescription', updatedItem.productDescription || singleProduct.productDescription) 
            formdata.append('image', image || file);           
            
            let response = await axios.put(`http://localhost:5237/api/Product/${id}`, formdata, {
                headers  :  {
                    "Content-Type" : 'multipart/form-data',
                    "Authorization" : `Bearer ${token}`

                }
            })

            let result = await response.data
            console.log(result);
            toast.success("product successfully updated")
            setEdit(null)
        }catch(err){
            console.log(err)
        }
       
       
    }

    useEffect(()=> {
        productById()
        categoriesList()
    }, [singleProduct, role, token])

  return (
    <>
    <Button className='mt-3' onClick={()=> navigate('/admin/allproducts')}>Back</Button>
    {
        role == 'admin' ? (
            
                filterData?.id === edit ? (
                    <div>
                         <div className='register login container-fluid shadow-lg mb-3'>
                            <h1>Update Product</h1>
                         <br />
                        <label htmlFor="name"> Product Name:<br />
                            <input type="text" defaultValue={singleProduct?.productName} placeholder={singleProduct?.productName} onChange={(e)=>setUpdatedItem({...updatedItem, productName: e.target.value})}/>
                        </label><br />
                        <label htmlFor="price"> Price:<br />
                            <input type="text" defaultValue={singleProduct?.price} placeholder={singleProduct?.price} onChange={(e)=>setUpdatedItem({...updatedItem, price: e.target.value})}/>
                        </label><br />
                       
                        <label htmlFor="category">Category:<br />
                        <MDBDropdown dropright>
        <MDBDropdownToggle>{singleProduct?.category}</MDBDropdownToggle>
        <MDBDropdownMenu>
         {
            categories.map((item)=> (
                <MDBDropdownItem link onClick={()=>setCategoryId(item.id)}>{item?.name}</MDBDropdownItem>
            ))
         }
          

        </MDBDropdownMenu>
      </MDBDropdown>
      <br />
                        </label><br />
                        <label htmlFor="desc"> Description:<br />
                            <textarea  rows={5} defaultValue={singleProduct?.productDescription} placeholder={singleProduct?.productDescription} onChange={(e)=>setUpdatedItem({...updatedItem, productDescription: e.target.value})}/>
                        </label><br />
                        <label htmlFor="image">
                        Image: <br /> <input type="file"  onChange={(e)=> setImage(e.target.files[0])}/>
                        </label>
                        <Button className='mt-2' variant='success' onClick={()=>handleUpdate(singleProduct?.id)}>Update</Button>
                        </div>
                    </div>
                ) : (
                    <div className='container mt-5 mb-3'>
                <div className='row shadow' style={{backgroundColor:'white',padding:"10px"}}>
                    <div className='col-12 col-md-6'>
                        <img src={singleProduct?.productImage} style={{maxHeight:"20rem"}} alt="" />
                    </div>
                    <div className='col-12 col-md-6' >
                    <FaEdit style={{float:'right', fontSize:"20px"}} onClick={()=>setEdit(singleProduct?.id)}/>
                        <p><span style={{fontWeight:"600", fontSize:"20px"}}>Product Name:</span>{singleProduct?.productName}</p>
                        <p><span style={{fontWeight:"600", fontSize:"20px"}}>Price:</span> {singleProduct?.price}</p>
                        <p><span style={{fontWeight:"600", fontSize:"20px"}}>Category:</span> {singleProduct?.category}</p>
                        <p><span style={{fontWeight:"600", fontSize:"20px"}}>Description:</span> {singleProduct?.productDescription?.slice(0,200)}...</p>
                    </div>
                </div>

               
                </div>
                
                )
            
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

export default ProductPage

