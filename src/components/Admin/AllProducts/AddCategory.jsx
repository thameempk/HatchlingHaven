import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function AddCategory({cat, setCategory}) {
    const navigate = useNavigate()
    const [cate, setCate] = useState("")
    const addCate = () =>{
        setCategory([...cat, {name:cate}])
        navigate('/admin')
    }
  return (
    <div>
        <Button className='m-3' onClick={()=>navigate('/admin')}>Back</Button>
        <div className='register login container-fluid shadow-lg'>
            <h1>Add Category</h1>
            <label htmlFor="addcateory">Add New Category:</label><br />
            <input placeholder='add category...' type="text" onChange={(e)=>setCate(e.target.value)}/>
            <br />
            <Button className='m-2' variant='success' onClick={addCate}>Add</Button>
        </div>
    </div>
  )
}

export default AddCategory