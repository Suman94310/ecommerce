import React from 'react'
import './login.css'

import {useStateValue} from "../../stateProvider"

import axios from 'axios'
import { useCookies } from 'react-cookie';

function Login() {

    const [, dispatch] = useStateValue()
    const [cookies, setCookie, removeCookie] = useCookies(['woodToken']);


    const login = (e)=>{
        e.preventDefault()
        // console.log(state)
        axios.post(
            "http://localhost:8000/api-token-auth/",
            new FormData(document.getElementById("login_form"))
        ).then((res)=>{
            // console.log(res)
            if(res.status === 200){
                dispatch({
                    type: 'set-token',
                    token: res.data.token
                })
                let date = (new Date()).getUTCSeconds
                setCookie("woodToken", res.data, {path: "/"});
                // console.log(cookies)
            }
        })  
    }

    return (
        <div className="login">
            <div className="login_icon">
                <i className="fas fa-user"></i>
            </div>
            <div className="login_inputs">
                <form action="POST" className="login_form" id="login_form" onSubmit={login}>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username"/>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password"/>
                    <button type="submit" className="login_submit">SUBMIT</button>
                </form>
                <p className="login_register">Don't have an account ? register <a href="#">here</a></p>
            </div>
        </div>
    )
}

export default Login
