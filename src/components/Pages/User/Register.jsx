import React, { useState } from 'react'
import "./Register.css"
import { Link } from 'react-router-dom';
import { LuUser2 } from "react-icons/lu";
import { Button } from 'react-bootstrap';
function Register({RegisterUser}) {
    const [userDetils, setUserDetails] = useState({})
  return (
    <>
    <div className='register login container-fluid shadow-lg'>
        <h1>Register</h1>
        <LuUser2 style={{fontSize:"100px"}}/> <br />
        <label htmlFor="name">Name:</label> <br />
        <input type="text" onChange={(e)=>setUserDetails({...userDetils, Name :e.target.value})} placeholder='enter your name...'/>
        <br />
        <label htmlFor="email">Email:</label> <br />
        <input type="text" onChange={(e)=>setUserDetails({...userDetils, Email :e.target.value})} placeholder='enter your email...'/>
        <br />
        <label htmlFor="password">Password:</label> <br />
        <input type="password" onChange={(e)=>setUserDetails({...userDetils, password :e.target.value})} placeholder='enter password'/>
        <br />
        <label htmlFor="con">Confirm Password:</label> <br />
        <input type="password" onChange={(e)=>setUserDetails({...userDetils, con_pass : e.target.value})} placeholder='enter confirm password'/>
        <br />
        <br />
        <Button variant='success' onClick={()=>RegisterUser(userDetils)}>Submit</Button>
        <br />
        <p style={{fontWeight:"600"}}>Existing user? <Link to={'/signin'}>login</Link></p>
        </div>
    </>
  )
}

export default Register