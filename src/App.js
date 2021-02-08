import {useEffect} from 'react'

import './App.css';
import Navbar from"./components/navbar/navbar"
import Home from  "./components/home/home"
import Login from "./components/login/login"
import Register from "./components/login/register"
import Sidebar from "./components/sidebar/sidebar"
import Cart from "./components/cart/cart"
import User from "./components/user/user"
// import searchResult from "./components/searchResult/searchResult"


import {useCookies} from "react-cookie"
import {useStateValue} from "./stateProvider"


import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  // Redirect
} from "react-router-dom";
import SearchResult from './components/searchResult/searchResult';


function App() {
  const [cookies] = useCookies(['woodToken']);
  const [, dispatch] = useStateValue()
  
  useEffect(()=>{
    if( cookies.woodToken){
      dispatch({
        type: 'set-token',
        token: cookies.woodToken
      })
    }
    
  },[cookies.woodToken,dispatch])


  return (
    <div className="App">
      <Sidebar/>
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/register">
            <Register/>
          </Route>
          <Route exact path="/cart">
            <Cart/>
          </Route>
          <Route exact path="/user">
            <User/>
          </Route>
          <Route exact path="/search">
            <SearchResult/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
