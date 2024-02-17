import React, { useContext, useEffect, useState } from 'react'
import { MyContext2 } from '../../../App'
import { Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle } from 'mdb-react-ui-kit';
import { MyContext3 } from '../../../App'
import AdminLogin from '../AdminLogin'
import axios from 'axios'
import toast from 'react-hot-toast';
function AddProduct({isAdminLoged}) {
    const {item, setItems}  = useContext(MyContext2)
    const {role, token} = useContext(MyContext3);
    const [prdId , setPrdId] = useState(10)
    const [productdet, setProductDel] = useState({})
    const [categoryId , setCategoryId] = useState("")
    const [categories , setCategories] = useState([{}])
    const navigate = useNavigate()
    const handleImage = (e)=>{
        const file = e.target.files[0];
        if(file){
            const reader = new FileReader();
            reader.onloadend = () => {
                setProductDel({...productdet,  image : reader.result});
              };
              reader.readAsDataURL(file);
        }
       
    }
    const categoriesList = async () => {
        try {
          let response = await axios.get(`http://localhost:5237/api/Category`, {
            headers: {
              "Content-Type": "application/json",
            }
          })
          let result = await response.data
          setCategories(result)
    
        } catch (err) {
          console.log(err)
        }
      }
    const handleSubmit = async () =>{
        try {
            const formdata = new FormData()
            formdata.append('productDto.productName', productdet.productName)
            formdata.append('productDto.productDescription', productdet.productDescription)
            formdata.append('productDto.price', productdet.price)
            formdata.append('productDto.categoryId', categoryId)
            formdata.append('image', productdet.productImage)
            let response = await axios.post("http://localhost:5237/api/Product",formdata, {
                headers : {
                    "Content-Type" : "multipart/form-data",
                    "Authorization" : `Bearer ${token}`
                }
            })
            let result = await response.data
            toast.success("product added successfully")
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=> {
        categoriesList()
    }, [ role, token, categories])
  return (
    <>
    <Button className='mt-3' onClick={()=>navigate('/admin/allproducts')}>Back</Button>
    {
        role == 'admin' ? (
            <div>
                
        
        <div className='register login container-fluid shadow-lg'>
            <h1>Add Products</h1>
        <label htmlFor="name">Product Name:<br />
        <input type="text" onChange={(e)=>setProductDel({...productdet, productName:e.target.value})} />
        </label>
        <label htmlFor="category">Category:<br />
        <MDBDropdown dropright>
        <MDBDropdownToggle>Select Category</MDBDropdownToggle>
        <MDBDropdownMenu>
         {
            categories.map((item)=> (
                <MDBDropdownItem link onClick={()=>setCategoryId(item.id)}>{item?.name}</MDBDropdownItem>
            ))
         }
        </MDBDropdownMenu>
      </MDBDropdown>
      </label>
        <label htmlFor="desc">desc:<br />
        <input type="text" onChange={(e)=>setProductDel({...productdet, productDescription:e.target.value})} />
        </label>
        <label htmlFor="price">price:<br />
        <input type="text" onChange={(e)=>setProductDel({...productdet, price:e.target.value})} />
        </label>
        <label htmlFor="image">Product Image:<br />
        <input type="file" onChange={(e)=> setProductDel({...productdet, productImage : e.target.files[0] })} />
        </label>
        <Button className='mt-2' variant='success' onClick={handleSubmit}>Add Product</Button>
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

export default AddProduct
