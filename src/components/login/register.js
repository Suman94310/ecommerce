import {React, useState} from 'react'
import './login.css'

import {useStateValue} from "../../stateProvider"

import axios from 'axios'

import { useHistory, Link } from "react-router-dom";

function Register() {
    const [, dispatch] = useStateValue()
    const [error, setError] = useState()
    let history = useHistory();


    const login = (e)=>{
        e.preventDefault()
        if(document.getElementById("password1").value === document.getElementById("password2").value){
            axios.post(
                "https://suman-ecommerce-api.herokuapp.com/api-token-auth/",
                new FormData(document.getElementById("register_form"))
            ).then((res)=>{
                if (res.status === 400){
                    axios.post(
                        "https://suman-ecommerce-api.herokuapp.com/register/",
                        new FormData(document.getElementById("register_form"))
                    ).then((res)=>{
                        history.push("/login");
                    })
                }
                else{
                    setError("Username Already Taken")
                    document.getElementById("register_error").style.visibility = "visible"
                }
                dispatch({
                    type: 'SET_USER',
                    token: res.data.token
                })
            }).catch(res=>{
                console.log(new FormData(document.getElementById("register_form"))                )
                axios.post(
                    "https://suman-ecommerce-api.herokuapp.com/register/",
                    new FormData(document.getElementById("register_form"))
                ).then((res)=>{
                    history.push("/login");
                })
            })
        }
        else{
            setError("Passwords didn't matched")
            document.getElementById("register_error").style.visibility = "visible"
        }
    }


    return (
        <div className="login">
            <div className="login_icon">
                <i className="fas fa-user"></i>
            </div>
            <div className="register_error" id="register_error">
                {error}
            </div>
            <div className="login_inputs">
                <form action="POST" className="login_form" id="register_form" onSubmit={login}>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username"/>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email"/>
                    <label htmlFor="password1">Password</label>
                    <input type="password" name="password1" id="password1"/>
                    <label htmlFor="password">Reenter the password</label>
                    <input type="password" name="password" id="password2"/>
                    <button type="submit" className="login_submit">SUBMIT</button>
                </form>
                <p className="login_register">Already have an account ? login <Link to="/login">here</Link></p>
            </div>
        </div>
    )
}

export default Register