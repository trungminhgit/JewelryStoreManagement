import Home from "./pages/Home.jsx";
import NavBar from "./components/NavBar.jsx";
import Home2 from "./pages/Home2.jsx";
import Cart from "./pages/Cart.jsx";
import Products2 from "./pages/Products2.jsx";
import EditItem from "./pages/EditItem.jsx";
import AddUser from "./pages/AddUser.jsx";
import DetailProduct2 from "./pages/DetailProduct2.jsx";
import Products from "./pages/Products.jsx";
import Users from "./pages/Users.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {userReducer, initialState, productReducer, productInitState} from "./helper/Reducer.js";
import {useReducer} from "react";
import {userContext, productContext} from "./helper/Context.js";
import EditUser from "./pages/EditUser.jsx";
import EditProduct from "./pages/EditProduct.jsx";
import AddProduct from "./pages/AddProduct.jsx";

function App() {
  const [user, userDispatch] = useReducer(userReducer, initialState);
  const [product, productDispatch] = useReducer(productReducer, productInitState);
  return (
    <>
      <userContext.Provider value={{user, userDispatch}}>
        <productContext.Provider value={{product, productDispatch}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/users" element={<Users/>}/>
            <Route path="/users/add" element={<AddUser/>}/>
            <Route path="/users/:id" element={<EditUser/>}/>
            <Route path="/products" element={<Products/>}/>
            <Route path="/products/add" element={<AddProduct/>}/>
            <Route path="products/:id" element={<EditProduct/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </BrowserRouter>
        </productContext.Provider>
      </userContext.Provider>
    </>
  )
}

export default App
