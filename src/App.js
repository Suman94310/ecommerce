import {useEffect} from 'react'

import logo from './logo.svg';
import './App.css';
import Navbar from"./components/navbar/navbar"
import Home from  "./components/home/home"
import Login from "./components/login/login"
import Register from "./components/login/register"
import Sidebar from "./components/sidebar/sidebar"
import Cart from "./components/cart/cart"
import User from "./components/user/user"


import {useCookies} from "react-cookie"
import {useStateValue} from "./stateProvider"


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";


function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['woodToken']);
  const [, dispatch] = useStateValue()
  
  useEffect(()=>{
    if( cookies.woodToken){
      dispatch({
        type: 'set-token',
        token: cookies.woodToken
      })
    }
    
  },[])


  return (
    <div className="App">
      <Sidebar/>
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/cart">
            <Cart/>
          </Route>
          <Route path="/user">
            <User/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
