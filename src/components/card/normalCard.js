import {React, useEffect} from 'react'
import "./normalCard.css"

import {useStateValue} from "../../stateProvider"

import background from "./background.svg"

function NormalCard(props) {
    const [{selected}, dispatch] = useStateValue()


    const handleClick =()=>{
        let sideBar = document.getElementById('sideBar');
        dispatch({
            type:'set-selected',
            selected: {
                image: props.image,
                price: props.price,
                name: props.name
            }
        })
        sideBar.style.visibility = 'visible'
    }

    return (
        <div className="normalCard" onClick={handleClick}>
            <div className="normalCard_image" >
                <img src={props.image} alt=""/>
            </div>
            <div className="normalCard_description">
                <div>
                    <div className="normalCard_name">
                        {props.name}
                    </div>
                    <div className="normalCard_price">
                        &#8377;{props.price}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NormalCard
