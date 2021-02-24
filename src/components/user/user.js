import {React, useState, useEffect} from 'react'
import "./user.css"
import Item from './item'
import axios from 'axios'

import {useCookies} from "react-cookie"

import {useStateValue} from "../../stateProvider"



function User() {
    const [cookies] = useCookies(['woodToken']);
    const [History, setHistory] = useState([])
    const [{user},] = useStateValue()


    useEffect(()=>{
        axios({
            url:"https://suman-ecommerce-api.herokuapp.com/products/?bought=True",
            method:"get",
            headers:{
                Authorization: "Token "+cookies.woodToken.token
            },
            data:{
                token: cookies.woodToken.token
            }
        }).then(res=>{
            setHistory(res.data)
        })
    },[cookies.woodToken.token])
    
    return (
        <div className="user">
            <div className="user_details">
                <img src={user.image} alt=""/>
                <div className="user_credentials">
                    <h2>{user.username}</h2>
                    {user.email}
                </div>
            </div>
            <h2>Things you have bought</h2>
            <div className="user_bought">
                {History.map(item=>(
                    <Item
                        name={item.name}
                        image={item.image}
                        price={item.price}
                    />
                ))}
            </div>
        </div>
    )
}

export default User
