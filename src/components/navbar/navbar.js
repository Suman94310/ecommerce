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
            })
        }
    },[cookies.woodToken, dispatch])

    const doSearch = (e)=>{
        e.preventDefault()
        axios({
            url:"http://localhost:8000/ListItems?search="+search,
            method:'get',
        }).then(res=>{
            dispatch({
                type: 'set-search',
                searchItems: res.data
            })
        })
        history.push("/search/?search="+search);
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
                <input type="text" onChange={e=>setSearch(e.target.value)}/>
            </form>
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
