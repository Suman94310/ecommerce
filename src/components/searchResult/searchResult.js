import {React, useState, useEffect} from 'react'
import "./searchResults.css"

import NormalCard from '../card/normalCard'

// import axios from 'axios'
import {useStateValue} from "../../stateProvider"


function SearchResult() {
    // const [items, setItems] = useState([])
    // const [searchItems, setSearchItems] = useState([])
    const [tags] = useState(['chair','table'])
    const [{searchItems},] = useStateValue()

    useEffect(()=>{
    },[])    

    return (
        <div className="searchResults">
            <div className="searchResult_tags">
                
            </div>
            <div className="searchResult_items">
                {
                    searchItems.map(searchItem=>{
                        if(tags?.indexOf(searchItem.tags)){
                            return <NormalCard
                                name = {searchItem.name}
                                image = {searchItem.image}
                                price = {searchItem.price}
                            />
                        }
                        return undefined
                    })
                }
            </div>
        </div>
    )
}

export default SearchResult
