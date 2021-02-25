import {React, useEffect, useState} from 'react'
import { useHistory } from "react-router-dom";

import './navbar.css'
import logo from "./logo.svg"

import {Link} from "react-router-dom";
import {useStateValue} from "../../stateProvider"
import axios from 'axios';

import {useCookies} from "react-cookie"


function Navbar() {
    const [{user}, dispatch] = useStateValue()
    const [search, setSearch] = useState()
    // setCookie, removeCookie add this bellow with cookies if it stops loging
    const [cookies] = useCookies(['woodToken']);
    let history = useHistory();



    useEffect(()=>{
        if(cookies.woodToken){
            axios({
                url:"https://suman-ecommerce-api.herokuapp.com/tokenToUser/",
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
            })
        }
    },[cookies.woodToken, dispatch])

    const doSearch = (e)=>{
        e.preventDefault()
        axios({
            url:"https://suman-ecommerce-api.herokuapp.com/ListItems?search="+search,
            method:'get',
        }).then(res=>{
            dispatch({
                type: 'set-search',
                searchItems: res.data
            })
        })
        history.push("/search/?search="+search);
    }

    const logout = ()=>{
        removeCookie('woodToken', [])
    }

    return (
        <div className="navbar">
            <Link to="/">
                <div className="navbar_logo">
                    <img src={logo} alt="" className="navbar_logoImg"/>
                    &nbsp;
                    <div className="navbar_logoName">Woodsmith</div>
                </div>
            </Link>
            
            <form className="navbar_search" onSubmit={doSearch}>
                <input type="text" onChange={e=>setSearch(e.target.value)} placeholder="Search"/>
            </form>
            <div className="navbar_links">
                <Link to="/cart">
                    <div className="navbar_linkCart">
                        <i className="fas fa-shopping-cart"></i>
                    </div>
                </Link>
                {
                    cookies.woodToken?
                    <div style={{display: 'flex'}}>
                        <Link to="/user">
                            <div className="navbar_linkProfile">
                                <i className="fas fa-user"></i>
                                &nbsp;
                                {user?.username}
                            </div>
                        </Link>
                        <div className="navbar_linkLogout" onClick={logout}>
                            Logout
                        </div>
                    </div>
                    :
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
