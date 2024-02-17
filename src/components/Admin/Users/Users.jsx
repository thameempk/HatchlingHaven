import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import "./Users.css"
import AdminLogin from '../AdminLogin';
import { MdDelete } from "react-icons/md";
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';
import { MyContext1, MyContext3 } from '../../../App';
import { FaAsymmetrik } from 'react-icons/fa';
import { MDBBadge } from 'mdb-react-ui-kit';
import axios from 'axios';
function Users({ isAdminLoged  }) {
  const {login} = useContext(MyContext1)
  const [user, setUser] = useState(null)
  const {token, role} = useContext(MyContext3)
  const userList = async () => {
    try {
      let response = await axios.get("http://localhost:5237/api/User",{
        headers : {
          "Authorization" : `Bearer ${token}`
        }
      })
      let result = await  response.data
      setUser(result)
    }catch(err){
      console.log(err)
    }
  }

  const BlockUser = async (id) => {
    try{
      let response = await axios.put(`http://localhost:5237/api/User/block-user?userId=${id}`,null,{
        headers : {
          "Authorization" : `Bearer ${token}`
        }
      })
      let result = await response.data
    }catch(err){
      console.log(err)
    }
  }
  const UnBlockUser = async (id) => {
    try{
      let response = await axios.put(`http://localhost:5237/api/User/unblock-user?userId=${id}`,null,{
        headers : {
          "Authorization" : `Bearer ${token}`
        }
      })
      let result = await response.data
    }catch(err){
      console.log(err)
    }
  }


  useEffect(()=> {
    userList()
  }, [token, role, user])
  return (
    <>
      {
        role == 'admin' ? (
          <div className='container shadow'>
            <Table striped>
              <thead>
                <tr>
                  <th>id</th>
                  <th>Name</th>
                  <th>email</th>
                  <th>Block/UnBlock</th>
                </tr>
              </thead>
              <tbody>
                {user?.map((user) => (

                  <tr key={user.id}>

                    <td>{user.id}</td>
                    <td className='link-tab'><Link style={{ textDecoration: "none", color: "black" }} to={`/admin/users/${user.id}`}>{user.name}  </Link></td>
                    <td>{user.email}</td>
                    <td>{user.isBlocked ?   <MDBBadge pill className='mx-2' color='danger' >
        Blocked
      </MDBBadge> :   <MDBBadge pill color='success' >
        Active
      </MDBBadge>}    <MDBDropdown group className='shadow-0'>
        <MDBDropdownToggle color='light'></MDBDropdownToggle>
        <MDBDropdownMenu>
          <MDBDropdownItem link onClick={()=>BlockUser(user.id)}>Block</MDBDropdownItem>
          <MDBDropdownItem link onClick={()=>UnBlockUser(user.id)}>Un Block</MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown></td>
                  </tr>
                ))

                }

              </tbody>
            </Table>
          </div>
        ) : (
          <div className='mb-3'>
            <p>admin is not loged</p>
            <Link to={'/signin'}>Please Login</Link>
          </div>
        )
      }
    </>
  )
}

export default Users