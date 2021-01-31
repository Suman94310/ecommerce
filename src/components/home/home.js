import {React, useState, useEffect} from 'react'
import axios from 'axios'
import "./home.css"
import './checkbox.css'
import "./tab.js"

import Card from "../card/card"
import NormalCard from "../card/normalCard"

import chair from "./test.svg"

function Home() {

    const [bests, setBests] = useState([
        {
            image: chair,
            name: "Chair",
            price: 400
        }
    ])

    const [items, setItems] = useState()

    useEffect(()=>{
        axios.get("http://localhost:8000/ListItems/").then(res=>{
            setItems(res.data)
        })
        let tabLinks = document.getElementsByClassName("home_bestTabLink")
        let tabs = document.getElementsByClassName("home_bestTab")
        for(let i=0; i<tabLinks.length; i++){
            tabLinks[i].onclick = (e)=>{
                for(let j=0; j<tabLinks.length; j++){
                    tabLinks[j].classList.remove("active")
                    tabs[j].classList.remove("active")
                }
                tabLinks[i].classList.add("active")
                tabs[i].classList.add("active")
            }
            
        }
    },[])

    const createCards = (tag)=>{
        let cards = []
        for(let i=0; i<items.length; i++){
            if(items[i].tag === tag && items[i].best)
                cards.push(<Card image={items[i].image} name={items[i].name} price={items[i].price}/>)
        }
        return cards
    }

    return (
        <div className="home">
            <div className="home_best">
                <div className="home_bestTitle">
                    <h1>Discover the best</h1>
                </div>
                <div className="home_bestList">
                    <div className="home_bestTabLinks">
                        <div className="home_bestTabLink active">
                            Chairs
                        </div>
                        <div className="home_bestTabLink">
                            Tables
                        </div>
                        <div className="home_bestTabLink">
                            Sofa
                        </div>
                        <div className="home_bestTabLink">
                            Decorations
                        </div>
                    </div>
                    <div className="home_bestTabs" >
                        <div className="home_bestTab active">
                            {items && createCards("chair")}
                        </div>
                        <div className="home_bestTab">
                            {items && createCards("table")}
                        </div>
                        <div className="home_bestTab">
                            {items && createCards("sofa")}
                        </div>
                        <div className="home_bestTab">
                            Decoration
                        </div>
                    </div>
                </div>
                <div className="home_items">
                    <div className="home_tags">
                        <label class="container">One
                            <input type="checkbox" checked="checked"/>
                            <span class="checkmark"></span>
                        </label>

                        <label class="container">Two
                            <input type="checkbox"/>
                            <span class="checkmark"></span>
                        </label>

                        <label class="container">Three
                            <input type="checkbox"/>
                            <span class="checkmark"></span>
                        </label>

                        <label class="container">Four
                            <input type="checkbox"/>
                            <span class="checkmark"></span>
                        </label> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
