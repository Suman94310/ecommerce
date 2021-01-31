import {React, useEffect} from 'react'

import './navbar.css'
import logo from "./logo.svg"

import {Link} from "react-router-dom";
import {useStateValue} from "../../stateProvider"
import axios from 'axios';

import {useCookies} from "react-cookie"



function Navbar() {
    const [{user},dispatch] = useStateValue()
    const [cookies, setCookie, removeCookie] = useCookies(['woodToken']);


    useEffect(()=>{
        axios({
            url:"http://localhost:8000/tokenToUser/",
            method:"post",
            headers:{
                Authorization: "Token "+cookies.woodToken.token
            },
            data:{
                token: cookies.woodToken.token
            }
        }).then(res=>{
            console.log(res)
            dispatch({
                type:'set-user',
                user:res.data
            })
            console.log("blyat")
        })
    },[])

    return (
        <div className="navbar">
            <Link to="/">
                <div className="navbar_logo">
                    <img src={logo} alt="" className="navbar_logoImg"/>
                    &nbsp;
                    <div className="navbar_logoName">Woodsmith</div>
                </div>
            </Link>
            
            <div className="navbar_search">
                <input type="text"/>
            </div>
            <div className="navbar_links">
                <Link to="/cart">
                    <div className="navbar_linkCart">
                        <i className="fas fa-shopping-cart"></i>
                    </div>
                </Link>
                {
                    cookies.woodToken?
                    <Link to="/user">
                        <div className="navbar_linkProfile">
                            <i className="fas fa-user"></i>
                            {user?.username}
                        </div>
                    </Link>:
                    <Link to="/login">
                        <div className="navbar_linkProfile">
                            <i className="fas fa-user"></i>
                        </div>
                    </Link>
                }
                
            </div>
        </div>
    )
}

export default Navbar
