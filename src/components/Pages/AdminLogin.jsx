import React, { useState } from 'react'
import { validateEmail, validatePassword } from '../components/Validate'
import { useNavigate } from 'react-router-dom'
import { LuUser2 } from "react-icons/lu";
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Admin from './Admin';
function AdminLogin({setIsAdminLoged, isAdminLoged, user}) {
    const navigate = useNavigate()
    const [adminlog, setAdminLog] = useState({})
    const [adminDet, setAdminDet] = useState({email:"thameempk292@gmail.com", pass:"1234567890"})
    const adminLogin = () =>{
        if(validateEmail(adminlog.email) && validatePassword(adminlog.pass)){
            if(adminlog.email === adminDet.email && adminlog.pass === adminDet.pass){
                navigate('/admin')
                setIsAdminLoged(true)
            }else{
                alert("enter valid details")
            }
        }
    }
    console.log(adminlog);
  return (
    <>
    {
        isAdminLoged ? (
            <div>
                <p>Admin Alredy Loged</p>
                <Link to={'/admin'}>Go to admin</Link>
            </div>
        ) : (
            <div className='register login container-fluid shadow-lg'>
        <h1>Login</h1>
        <br />
        <LuUser2 style={{fontSize:"100px"}}/> <br />
        <br />
        <label htmlFor="email">Email:</label>
        <br />
        <input type="text" placeholder='enter your email...' onChange={(e)=>setAdminLog({...adminlog, email:e.target.value})}/>
        <br />
        <label htmlFor="pass">Password:</label>
        <br />
        <input type="password" placeholder='enter your password' onChange={(e)=>setAdminLog({...adminlog, pass:e.target.value})}/>
        <br />
        <br />
        <Button variant='success' onClick={adminLogin}>Signin</Button>
        </div>
        )
    }
    
    </>
  )
}

export default AdminLogin