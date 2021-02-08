import {React, useEffect} from 'react'
import "./cart.css"
import {useStateValue} from "../../stateProvider"
import axios from 'axios'
import {useCookies} from "react-cookie"

import CartItem from "./cartItem"
import { getCartTotal } from '../../reducer'


function Cart() {
    // const [{selected, token}, dispatch] = useStateValue()
    const [{cart}, dispatch] = useStateValue()
    // const [total, setTotal] = useState(0)
    const [cookies] = useCookies(['woodToken']);

    useEffect(() => {
        // getting user
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
            // getting products
            axios({
                url:"https://suman-ecommerce-api.herokuapp.com/products/?bought=False",
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
        
    },[dispatch, cookies.woodToken.token]);

    const buy = ()=>{
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
            </div>
            <div className="cart_details">
                <p>Total:</p>
                <p>	&#8377; {getCartTotal(cart)}</p>
                <button className="cart_buy" onClick={buy}>
                    Buy
                </button>
            </div>
        </div>
    )
}

export default Cart