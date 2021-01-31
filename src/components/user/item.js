import React from 'react'
import "./item.css"

function Item({image, name, price}) {
    return (
        <div className="item">
            <img src={image} alt="" className="item_image"/>
            <div className="item_detail">
                <div className="item_name">
                    {name}
                </div>
                <div className="item_price">
                    {price}
                </div>
            </div>
        </div>
    )
}

export default Item
