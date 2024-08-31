import Home from "./pages/Home.jsx";
import NavBar from "./components/NavBar.jsx";
import Home2 from "./pages/Home2.jsx";
import Cart from "./pages/Cart.jsx";
import Products2 from "./pages/Products2.jsx";
import EditItem from "./pages/EditItem.jsx";
import AddUser from "./pages/addUser.jsx";
import DetailProduct2 from "./pages/DetailProduct2.jsx";
import Products from "./pages/Products.jsx";
import Users from "./pages/Users.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {userReducer, initialState} from "./helper/Reducer.js";
import {useReducer} from "react";
import {userContext} from "./helper/Context.js";
import EditUser from "./pages/EditUser.jsx";

function App() {
  const [user, dispatch] = useReducer(userReducer, initialState);
  return (
    <>
      <userContext.Provider value={{user, dispatch}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/users" element={<Users/>}/>
            <Route path="/users/add" element={<AddUser/>}/>
            <Route path="/users/:id" element={<EditUser/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
    </>
  )
}

export default App
