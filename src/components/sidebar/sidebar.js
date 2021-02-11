import React, { useEffect } from 'react';

import "./sidebar.css"
import background from "./background.svg"

import {useStateValue} from "../../stateProvider"
import axios from 'axios';

import {useCookies} from "react-cookie"

function Sidebar(props) {
    const [{selected, token, tempCart}, dispatch] = useStateValue()
    const [cookies] = useCookies(['woodToken']);

    const styles = {
        image:{
            backgroundImage: `url(${background})`
        },
    }

    function hasSomeParentTheClass(element, classname) {  
        if (element.className && element.className.split(' ').indexOf(classname)>=0) return true;
        return element.parentElement && hasSomeParentTheClass(element.parentElement, classname);
    }

    useEffect(() => {
        // hiding
        window.onload=()=>{
            const sideBar = document.getElementById('sideBar');
            sideBar.style.visibility = 'hidden';
            document.onclick = (e)=>{
                let card = hasSomeParentTheClass(e.target, 'card') || hasSomeParentTheClass(e.target, 'normalCard')
                if(e.target.className==='card' || e.target.className==='normalCard'){
                    card =  true
                }
                if(e.target.id !== 'sideBar' && !card){
                    sideBar.style.visibility = 'hidden';
                }
            };
        }
        console.log("blyat")
        
    },);

    const addToCart = ()=>{
        if (cookies.woodToken){
            axios({
                url:"https://suman-ecommerce-api.herokuapp.com/products/",
                method:"post",
                headers:{
                    Authorization: "Token "+token
                },
                data: {
                    name: selected.name,
                    price: selected.price,
                    image: selected.image
                }
            }).catch(({ response }) => { 
                console.log(response.data);  
                console.log(response.status);  
                console.log(response.headers);  
            })
        }
        else{
            dispatch({
                type: 'add-to-tempCart',
                item:{
                    name: selected.name,
                    price: selected.price,
                    image: selected.image,
                    id: 100+tempCart.length
                }
            })
        }
    }
    

    return (
        <div className="sidebar" styles={styles.sideBar} id="sideBar">
            <div className="sidebar_image" style={styles.image}>
                <img src={selected && selected.image} alt=""/>
            </div>
            <div className="sidebar_description">
                <p>{selected && selected.name}</p>
                {props.description}
            </div>
            {/* <div>
                <input type="number" name="quantity" id="" className="sidebar_quantity"/>
                <p className="sidebar_total">{total}</p>
            </div> */}
            <div className="sidebar_add">
                <button onClick={addToCart}>ADD TO CART</button>
            </div>
        </div>
    )
}

export default Sidebar
