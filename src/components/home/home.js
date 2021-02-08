import {React, useState, useEffect} from 'react'


import axios from 'axios'
import "./home.css"
import './checkbox.css'
import "./tab.js"

import Card from "../card/card"
import NormalCard from "../card/normalCard"

function Home() {

    const [items, setItems] = useState([])
    const [tags, setTags] = useState([])

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

    const handletag = (e,tag)=>{
        let index = tags.indexOf(tag)
        let temp = [...tags]
        if(index >= 0){
            temp.splice(index,1)
            setTags(temp)
        }
        else{
            temp.push(tag)
            setTags(temp)

        }
    }

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
            </div>
            <h2 className="home_itemsTitle">
                Find Our Other Products
                <i class="fas fa-angle-down"></i>
            </h2>
            <div className="home_items">
                <div className="home_tags">
                    {/* TAGS */}
                    <label class="checkboxContainer" >Chair
                        <input type="checkbox" value="Chair" onClick={(e)=>handletag(e,'chair')}/>
                        <span class="checkmark" onClick={(e)=>handletag(e,'chair')}></span>
                    </label>

                    <label class="checkboxContainer" >Table
                        <input type="checkbox" value="Chair" onClick={(e)=>handletag(e,'table')} onChange={(e)=>handletag(e,'table')}/>
                        <span class="checkmark" onClick={(e)=>handletag(e,'table')}></span>
                    </label>

                    <label class="checkboxContainer" >Sofa
                        <input type="checkbox" value="Chair" onClick={(e)=>handletag(e,'sofa')}/>
                        <span class="checkmark" onClick={(e)=>handletag(e,'sofa')}></span>
                    </label>

                    <label class="checkboxContainer" >Decorations
                        <input type="checkbox" value="Chair" onClick={(e)=>handletag(e,'decorations')}/>
                        <span class="checkmark" onClick={(e)=>handletag(e,'decorations')}></span>
                    </label>
                </div>
                <div className="home_itemsList">
                    {
                        items.map(item=>{
                            if(tags.indexOf(item.tag)>-1){
                                return <NormalCard
                                    image = {item.image}
                                    name = {item.name}
                                    price = {item.price}
                                />
                            }
                            return undefined
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Home
