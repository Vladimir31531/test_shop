import React from 'react'
import MyButton from '../../ui/MyButton/MyButton';
import "../../../assets/css/oneProd.css"
import { useContext } from 'react'
import { CurrencyContext } from '../../../context/context'
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { generatePath } from "react-router";

import { getShortString } from "../../../functions/helpers";

export default function OneProd({prod}) {

    let { prodsInBasket, setprodsInBasket, addToBasket, imgDirectory } = useContext( CurrencyContext )
    let basketProdsRef = useRef(null)

    let addToCart = () => {
        addToBasket(prod, prodsInBasket, setprodsInBasket, 1)
    }

    return (
        <div ref={basketProdsRef} className="oneProduct">
            <Link to={generatePath(`/shop/:id`, { id: String(prod.id) })}>
                <div className="oneProd_img">
                    <img src={imgDirectory + prod.img} alt="" />
                </div>
                <h3>{prod.title}</h3>
            </Link>
            <p>{getShortString(prod.desc, 10)}</p>
            <span className="oneProd_price">{prod.price} {prod.currency}</span>
            <MyButton clickAction={addToCart} text={'Add to Cart'} />
        </div>
    )
}