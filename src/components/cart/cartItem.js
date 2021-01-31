import {React} from 'react'
import axios from 'axios'
import {useCookies} from "react-cookie"
import {useStateValue} from "../../stateProvider"


function CartItem({id, image, name, price}) {
    const [cookies, setCookie, removeCookie] = useCookies(['woodToken']);
    const [,dispatch] = useStateValue()

    const deleteProduct = ()=>{
        axios({
            url:"http://localhost:8000/products/"+id+"/",
            method:"DELETE",
            headers:{
                Authorization: "Token "+cookies.woodToken.token
            }
        }).then(()=>{
            dispatch({
                type:'delete-from-cart',
                id
            })
        })
    }
    return (
        <div className="cart_item" key={id}>
            <img src={image} alt="" className="cart_itemImage"/>
            <div className="cart_itemDetails">
                <div className="cart_itemName">
                    {name}
                </div>
                <div className="cart_itemCost">
                    {price}
                </div>
                <div className="cart_itemRemove">
                    <button className="cart_itemRemoveButton" onClick={()=>deleteProduct(id)}>
                        Remove
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartItem
