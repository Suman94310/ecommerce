import {React, useEffect} from 'react'
import "./card.css"

import {useStateValue} from "../../stateProvider"

import background from "./background.svg"

function Card(props) {
    const [{selected}, dispatch] = useStateValue()

    useEffect(()=>{
        // let cardBackground = document.getElementById
        
    },[])


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

    const styles = {
        backgroundImage: `url(${background})`
    }

    return (
        <div className="card" onClick={handleClick}>
            <div className="card_image" style={styles}>
                <img src={props.image} alt=""/>
            </div>
            <div className="card_description">
                <div>
                    <div className="card_name">
                        {props.name}
                    </div>
                    <div className="card_price">
                        &#8377;{props.price}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
