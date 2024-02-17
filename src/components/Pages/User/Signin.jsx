import React, { useContext } from 'react'
import { MyContext1 } from '../../../App'
import { LuUser2 } from "react-icons/lu";
import { useState } from 'react'
import { validatePassword, validateCon_pass } from '../../Validate';
import "./Login.css"
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MyContext3 } from '../../../App';
function Signin() {
    const {user,setUser} = useContext(MyContext1)
    const {log} = useContext(MyContext3)

    const [login, setLogin] = useState({})
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [Forgot, setForgot] = useState(false)
    const [newPass, setNewPass] = useState(false)
    const [newPassword , setNewPassword] = useState({})
    const submit = () =>{
      const findEmail = user.find((user)=> user.email === email)
      if(findEmail){
        setNewPass(true)
      }else{
        alert("incorrect email")
      }
    }
    const reset =() =>{
      if(validatePassword(newPassword.pass) && validateCon_pass(newPassword.pass, newPassword.con )){
        const newPass = user.map((user) => user.email === email ? {...user, pass:newPassword.pass}: user) 
        setUser(newPass)
        setNewPass(false)
        setForgot(false)
      }
    }
  return (
    <>
    {
      Forgot ? (
        <div className='register login container-fluid shadow-lg'>
          <h1>Reset Password</h1>
          {
            newPass ? (
              <form onSubmit={(e)=> e.preventDefault()}>
                <input type="password" placeholder='Enter your new password' onChange={(e)=>setNewPassword({...newPassword, pass:e.target.value})}/>
                <input type="password" placeholder='confirm password' onChange={(e)=>setNewPassword({...newPassword, con:e.target.value})}/>
                <Button className='mt-1' onClick={reset}>Reset Password</Button>
              </form>
            ) :(
              <form onSubmit={(e) => e.preventDefault()}>
              <input type="text" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email address to reset password." />
              <Button className='mt-1' onClick={submit}>Submit</Button>
            </form>
            )
          }
          
            
          
          
        </div>
      ):(
        <div className='register login container-fluid shadow-lg'>
        <h1>Login</h1>
        <br />
        <LuUser2 style={{fontSize:"100px"}}/> <br />
        <br />
        <label htmlFor="email">Email:</label>
        <br />
        <input type="text" placeholder='enter your email...' onChange={(e)=>setLogin({...login,email :e.target.value})}/>
        <br />
        <label htmlFor="pass">Password:</label>
        <br />
        <input type="password" placeholder='enter your password' onChange={(e)=>setLogin({...login ,password :e.target.value})}/>
        <br />
        <br />
        <Button variant='success' onClick={()=>log(login)}>Signin</Button>
        <p style={{fontWeight:"600"}}>Forgot Password? <Link onClick={()=>setForgot(true)}>reset</Link></p>
        <p style={{fontWeight:"600"}}>New User? <Link to={'/register'}>signup</Link></p>
        </div>
      )
    }
    
    </>
  )
}

export default Signin
