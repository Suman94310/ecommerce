import {React, useEffect} from 'react'
import "./cart.css"
import {useStateValue} from "../../stateProvider"
import axios from 'axios'
import {useCookies} from "react-cookie"

import CartItem from "./cartItem"
import { getCartTotal } from '../../reducer'

import { useHistory } from "react-router-dom";


function Cart() {
    const [{cart, tempCart, user}, dispatch] = useStateValue()
    const [cookies] = useCookies(['woodToken']);
    let history = useHistory();


    useEffect(() => {
        // getting user
        if (cookies.woodToken){
            axios({
                url:"https://suman-ecommerce-api.herokuapp.com/tokenToUser/",
                method:"post",
                headers:{
                    Authorization: "Token "+cookies.woodToken?.token
                },
                data:{
                    token: cookies.woodToken.token
                }
            }).then(res=>{
                // getting products
                axios({
                    url:"https://suman-ecommerce-api.herokuapp.com/products/?owner="+user?.username,
                    method:"get",
                    headers:{
                        Authorization: "Token "+cookies.woodToken.token
                    },
                    params:{
                        search:res.data.id
                    }
                }).then(res=>{
                    dispatch({
                        type: 'set-cart',
                        cart: res.data
                    })
                })
            })
        }
        
        
    },[dispatch, cookies.woodToken, cookies.woodToken?.token, user?.username]);

    const buy = ()=>{
        if (cookies.woodToken){
            cart.forEach(item => {
                axios({
                    url:"https://suman-ecommerce-api.herokuapp.com/products/"+item.id+"/",
                    method:'put',
                    headers:{
                        Authorization: "Token "+cookies.woodToken.token
                    },
                    data:{
                        bought: true
                    }
                }).catch(err=>{
                    console.log(err)
                }).then(()=>{
                    dispatch({
                        type:'empty-cart'
                    })
                })
            });
        }
        else{
            history.push("/login");
        }
    }

    return (
        <div className='cart'>
            <div className="cart_items">
                {cart?.map(item=>{
                    return <CartItem
                        id = {item.id}
                        name = {item.name}
                        price = {item.price}
                        image = {item.image}
                        key = {item.id}
                    />
                })}
                {tempCart?.map(item=>{
                    return <CartItem
                        id = {item.id}
                        name = {item.name}
                        price = {item.price}
                        image = {item.image}
                        key = {item.id}
                    />
                })}
            </div>
            <div className="cart_details">
                <p>Total:</p>
                <p>	&#8377; {getCartTotal(cart)+getCartTotal(tempCart)}</p>
                <button className="cart_buy" onClick={buy}>
                    Buy
                </button>
            </div>
        </div>
    )
}

export default Cart