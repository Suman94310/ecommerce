import React from 'react'
import './login.css'

import {useStateValue} from "../../stateProvider"

import axios from 'axios'

function Register() {
    const [, dispatch] = useStateValue()

    const login = (e)=>{
        e.preventDefault()
        axios.post(
            "https://suman-ecommerce-api.herokuapp.com/api-token-auth/",
            new FormData(document.getElementById("register_form"))
        ).then((res)=>{
            console.log(res)
            dispatch({
                type: 'SET_USER',
                token: res.data.token
            })
        })  
    }


    return (
        <div className="login">
            <div className="login_icon">
                <i className="fas fa-user"></i>
            </div>
            <div className="login_inputs">
                <form action="POST" className="login_form" id="register_form" onSubmit={login}>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username"/>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password"/>
                    <label htmlFor="password">Reenter the password</label>
                    <input type="password" name="password"/>
                    <button type="submit" className="login_submit">SUBMIT</button>
                </form>
                <p className="login_register">Already have an account ? login <a href="/login">here</a></p>
            </div>
        </div>
    )
}

export default Register