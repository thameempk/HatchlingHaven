import React, { useEffect, useState } from "react";
import {jwtDecode} from 'jwt-decode';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import toast, { Toaster } from 'react-hot-toast';
import Cookies  from 'js-cookie';
import { Route, Routes, useNavigate } from "react-router-dom";
import Register from "./components/Pages/User/Register";
import Signin from "./components/Pages/User/Signin";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Pages/Header/Header";
import Shop from "./components/Pages/Shop/Shop";
import Filter from "./components/Pages/Filter/Filter";
import { category } from "./components/Items";
import Home from "./components/Pages/Home/Home";
import Cart from "./components/Pages/Cart/Cart";
import Payment from "./components/Pages/Payment/Payment";
import Products from "./components/Pages/ProductItems/Products";
import PageNotFount from "./components/Pages/pageNotFound/PageNotFount";
import Search from "./components/Pages/Search/Search";
import Admin from "./components/Admin/Admin";
import Users from "./components/Admin/Users/Users";
import User from "./components/Admin/Users/User";
import Allproducts from "./components/Admin/AllProducts/Allproducts";
import AddProduct from "./components/Admin/AllProducts/AddProduct";
import ProductPage from "./components/Admin/AllProducts/ProductPage";
import AdminLogin from "./components/Admin/AdminLogin";
import ProductsCategory from "./components/Admin/AllProducts/ProductsCategory";
import AddCategory from "./components/Admin/AllProducts/AddCategory";
import OrderStatus from "./components/Pages/OrderStatus/OrderStatus";
import Footer from "./components/Footer/Footer";
import axios from "axios";
import OrderDetails from "./components/Pages/OrderDetails/OrderDetails";
export const MyContext = React.createContext();
export const MyContext1 = React.createContext();
export const MyContext2 = React.createContext();
export const MyContext3 = React.createContext();

function App() {



  
  const navigate = useNavigate();

  const [user, setUser] = useState([{id: 1 ,name: "thameem", email: "thameempk292@gmail.com", pass: "123456789", phone : 1234567890 , cart : []}]);
  const [isLoged, setIsLoged] = useState(false);
  const [login, setLogIn] = useState({});
  const [token, setToken] = useState(null)
  const [role, setRole] = useState(null)
  const [userName, setUserName] = useState(null)
  const [userEmail, setUserEmail] = useState(null)
  // console.log(token)

  
   const validateEmail = (email) =>{
    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;
    if(email === "" ){
        toast.error("email or password must be filled") ;
    }else if(emailRegEx.test(email)){
        return true
    }
    else{
      toast.error("enter valid email")
    }
}

 const validatePassword = (pass) =>{
    if(pass === ""){
      toast.error("email or password must filled")
    }else if(pass.length >= 8){
        return true;
    }else{
      toast.error("password must be greater than 8 characters")
    }
}

 const validateCon_pass = (pass, con_pass) =>{
    if(con_pass === pass){
        return true;
    }else{
      toast.error("confirm password does not match with the password");
    }
}

 const validateField = (input) =>{
    if(input !== ""){
        return true;
    }else{
      toast.error("field cannot be empty");
    }
}




const RegisterUser = async (userDetails) => {
  

  if (
    validateField(userDetails.Name) &&
    validateEmail(userDetails.Email) &&
    validatePassword(userDetails.password) &&
    validateCon_pass(userDetails.password, userDetails.con_pass) ) {
    const newUser =   { name: userDetails.Name, email: userDetails.Email, Password: userDetails.password };
    try{
      let response = axios.post("http://localhost:5237/api/User/register",newUser)
      let result = (await response).data;
      toast.success(result)
      navigate("/signin");
    }catch(err){
      toast.error(err.request.response);
    }
    
  }
};


  const log = async (login) => {
    if(
      validateEmail(login.email) &&
    validatePassword(login.password)
    ){
      try{
        let response = await axios.post("http://localhost:5237/api/User/login", login)
        let result = await  response.data
        const decToken = jwtDecode(result.token)
        Cookies.set('role', decToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"], {expires : 1/24, secure :true})
        Cookies.set('token', result.token, {expires : 1/24, secure: true})
        Cookies.set( 'email' , result.email ,{expires : 1/24, secure: true})
        Cookies.set('name', result.name , {expires : 1/24, secure: true})

        if(Cookies.get('role') == 'admin') {
          navigate('/admin')
        }else{
          navigate('/')
        }

       
      }catch(err){
        toast.error(err.request.response)
      }
    }
   
  };


  const logOut = () => {
    Cookies.remove('token')
    Cookies.remove('email')
    Cookies.remove('name');
    Cookies.remove('role');
    setRole(null)
    setToken(null)
    navigate('/')
    console.log(role,token)
  };



  const [item, setItems] = useState([{}]);
  const [cat, setCategory] = useState(category);


  const cartPlus = async (id) => {
    // try{

    //   let response = await axios.put(`http://localhost:5237/api/Cart/min-quantity?productId=${id}`,null,{
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${token}`
    //   }
    //   })
    //   let result = await response.data
    //   console.log(result)
    // }catch(err){
    //   console.error(err)
    // }
  };
  const [serachProducts, setSearchProduct] = useState([{}])
  const searchProduct = async (searchTerm) => {
    try{
      let response = await axios.get(`http://localhost:5237/api/Product/serach-product?searchTerm=${searchTerm}`)
      let result = await response.data
      setSearchProduct(result)
      navigate('/result')
    }catch(err){
      console.log(err)
    }
   }
  const cartMin = async (id) => {
    // try{

    //   let response = await axios.put(`http://localhost:5237/api/Cart/min-quantity?productId=${id}`,null,{
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${token}`
    //   }
    //   })
    //   let result = await response.data
    //   console.log(result)
    // }catch(err){
    //   console.error(err)
    // }
  };


  const [empty, setEmpty] = useState(false);

  const addCart = async  (id) => {
    try{
      

      let response = await axios.post(`http://localhost:5237/api/Cart/add-to-cart?productId=${id}`,null,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
      let result = await response.data
      toast.success(result)
    }catch(err){
      toast.error("please login!")
      console.log(err)
    }

  
  };


  const cartSecPlus = async (id) => {
    try{
      let response = await axios.put(`http://localhost:5237/api/Cart/add-quantity?productId=${id}`,null,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
      })
      let result = await response.data
      console.log(result)
    }catch(err){
      console.error(err)
    }
  };



  const cartSecMin = async (id) => {
    try{

      let response = await axios.put(`http://localhost:5237/api/Cart/min-quantity?productId=${id}`,null,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
      })
      let result = await response.data
      console.log(result)
    }catch(err){
      console.error(err)
    }
  };

  let total = 0;

  
  const [order, setOrder] = useState(false);
  const [ordersec, setOrderSec] = useState([{}]);
  const [orderItems, setOrderItems] = useState([{}])
  const [totalPrice , setTotalPrice] = useState(0)


  const placeOrder =  (cart, totalPrice) => {
    setOrderItems(cart)
    setTotalPrice(totalPrice)
    navigate('/payment')
  }
  const addToWishList = async (id) => {
    try{
      let response = await axios.post(`http://localhost:5237/api/WhishList/add-whishlist?productId=${id}`,null,
      {
        headers : {
          'Authorization': `Bearer ${token}`
        }
      })
      let result = await response.data
    }catch(err){
      console.log(err)
    }
  }
  
  const [wishListItems, setWhishListItem] = useState([{}])
  const getWishList = async () => {
    try{
      let response = await axios.get(`http://localhost:5237/api/WhishList/get-whishlist`,
      {
        headers : {
          "Authorization" : `Bearer ${token}`
        }
      })
      let result = await response.data
      setWhishListItem(result)
    }catch(err){
      console.log(err)
    }
  }

  const removeWishListItem = async (id) => {
    try{
    let response = await axios.delete(`http://localhost:5237/api/WhishList/remove-whishlist?productId=${id}`,
      {
        headers : {
          "Authorization" : `Bearer ${token}`
        }
      })
      let result = await response.data
      setWhishListItem(result)
    }catch(err){
      console.log(err)
    }
  }
  const wishListExist =  async (id,name) =>{
    try{
      let response = await axios.post(`http://localhost:5237/api/WhishList/isWishListExist?productId=${id}`,null,
        {
          headers : {
            "Authorization" : `Bearer ${token}`
          }
        })
        let result = await response.data
        return result
      }catch(err){
        console.log(err)
      }
  } 



  const [prd, setPrd] = useState([]);

  const ViewItem = (cat) => {
    navigate("/product");
  };


  const priceItem = (price) => {
    if (price !== "") {
      const newItem = item.filter((item) => item.price <= price);
      setPrd(newItem);
      navigate("/product");
    } else {
      navigate("/shop");
    }
  };


  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);


  const handleSearch = () => {
    const filterItem = item.filter((items) =>
      items.name.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResult(filterItem); 
    navigate("/result");
  };



  const delCart = async (id) => {
    try{
      let response = await axios.delete(`http://localhost:5237/api/Cart/remove-cart-item?productId=${id}`,
      {
        headers : {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      
      )
      let result = await response.data
      console.log(result)
    }catch(err){
      console.error(err)
    }
  };


  const orderTotal = ordersec.reduce((total, item)=> item.total + total, 0)

  const orderPlace = (orderdet) =>{
    const currentDate = new Date()
    const formattedDate = currentDate.toLocaleString()
    const orderDate = orderdet.map((order)=>( {...order, date:formattedDate}) )
    const newOrder = user.map((user)=> user.email === login.email ? {...user, order : orderDate} : user)
    setUser(newOrder)
    navigate('/orderstatus')
  }

  const deleteItem = (index) =>{
    const data = [...item]
    data.splice(index, 1)
    setItems(data)
}
      const getProductData = async () => {
        try{
          let respose = await axios.get("http://localhost:5237/api/Product")
        let data = await respose.data
        setItems(data)
        }catch(err){
          toast.error(err.request.response)
        }
        
      }

      useEffect(()=> {
        getProductData()
        getWishList()
        setToken(Cookies.get('token'))
        setRole(Cookies.get('role'))
        setUserEmail(Cookies.get('email'))
        setUserName(Cookies.get('name'))
      }, [item,token,role])


  const [isAdminLoged, setIsAdminLoged] = useState(false)
  return (
    <div className="App">
      <MyContext3.Provider
        value={{  addCart, placeOrder, order, prd, ordersec, item , token, role, logOut, orderItems, totalPrice, placeOrder , log, userName, userEmail, searchProduct, serachProducts, addToWishList, wishListItems, removeWishListItem,wishListExist}}
      >
        <MyContext2.Provider value={{ item, setItems }}>
          <MyContext1.Provider value={{login, user, setUser}}>
            <MyContext.Provider value={isLoged}>
              <Header
                setSearch={setSearch}
                handleSearch={handleSearch}
              />
              <Toaster
  position="top-center"
  reverseOrder={false}
/>

              <Routes>

            

                <Route
                  path="/"
                  element={<Home cartPlus={cartPlus} cartMin={cartMin} />}
                >
                  {" "}
                </Route>
                <Route
                  path="/:productid"
                  element={<Filter cartPlus={cartPlus} cartMin={cartMin} />}
                />
                <Route
                  path="/register"
                  element={<Register  RegisterUser = {RegisterUser}/>}
                />
                <Route path="/signin" element={<Signin log={log} />} />
                <Route
                  path="/shop"
                  element={
                    <Shop
                      cartPlus={cartPlus}
                      cartMin={cartMin}
                      ViewItem={ViewItem}
                      priceItem={priceItem}
                      cat={cat}
                    />
                  }
                ></Route>
                <Route
                  path="/shop/:category"
                  element={<Products cartPlus={cartPlus} cartMin={cartMin} />}
                />
                <Route
                  path="/cart"
                  element={
                    <Cart
                      cartSecPlus={cartSecPlus}
                      cartSecMin={cartSecMin}
                      total={total}
                      empty={empty}
                      delCart={delCart}
                      isLoged={isLoged}
                      log={log}
                    />
                  }
                />
                <Route
                  path="/payment"
                  element={
                    <Payment/>
                  }
                />
                <Route
                  path="/result"
                  element={<Search searchResult={searchResult} />}
                />
                <Route path="/orderstatus" element={<OrderStatus user={user} login={login} log={log}/>} />
                <Route path="/admin" element={<Admin user ={user} isAdminLoged={isAdminLoged} setIsAdminLoged={setIsAdminLoged} cat={cat} deleteItem={deleteItem}/>} /> 
                <Route path="/admin/orderdetails/:orderid" element={<OrderDetails />} />
                <Route path="/admin/users" element={<Users user = {user} setUser ={setUser} isAdminLoged={isAdminLoged} /> } />
                <Route path="/admin/users/:userid" element={<User user ={user} isAdminLoged={isAdminLoged} deleteItem={deleteItem} setUser ={setUser}/>} />
                <Route path="/admin/allproducts" element={<Allproducts setItems={setItems} isAdminLoged={isAdminLoged} cat={cat} deleteItem={deleteItem}/>} />
                <Route path="/admin/allproducts/category/:category" element={<ProductsCategory cat={cat} deleteItem={deleteItem} isAdminLoged={isAdminLoged}/>} />
                <Route path="/admin/allproducts/addproduct" element={<AddProduct setItems={setItems} isAdminLoged={isAdminLoged} />} />
                <Route path="/admin/allproducts/addcategory" element={<AddCategory cat={cat} setCategory={setCategory}/>} />
                <Route path="/admin/allproducts/:productid" element={<ProductPage isAdminLoged={isAdminLoged} />} />
                
                <Route path="/admin/login" element={<AdminLogin setIsAdminLoged={setIsAdminLoged} isAdminLoged = {isAdminLoged} user ={user}/>} />

                <Route path="*" element={<PageNotFount />} />
              </Routes>
              <Footer />
            </MyContext.Provider>
          </MyContext1.Provider>
        </MyContext2.Provider>
      </MyContext3.Provider>
    </div>
  );
}

export default App;
