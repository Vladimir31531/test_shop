import React from 'react'
import "../../assets/css/basket.css"
import { BsBasket3 } from 'react-icons/bs'
import { useState } from 'react'
import MyCount from '../ui/MyCount/MyCount'
import { useContext } from 'react'
import { CurrencyContext } from '../../context/context'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

export default function Basket({addedProds}) {

    let params = useParams()

    let [isCartOpen, setisCartOpen] = useState(false)
    let { currency, imgDirectory, addQuant, removeProd, prodsInBasket, setprodsInBasket } = useContext(CurrencyContext)
    let [prodsCount, setprodsCount] = useState(0)
    let [totalSum, settotalSum] = useState(0)

    useEffect(() => {
        let a = 0
        let sum = 0
        addedProds.forEach(b => {
            a = a + b.quant
            sum = sum + b.totalSum
        })
        setprodsCount(a)
        settotalSum(sum)
    }, [addedProds])

    return (
        <div className="headerBasket_w" onClick={() => { setisCartOpen(!isCartOpen) }}>
            <div className={'headerBasket ' + ((isCartOpen) ? 'basket_active' : '')}>
                <BsBasket3 />
            </div>
            {(prodsCount !== 0) ? <span className="basketCount">{prodsCount}</span> : ''}
            <span className="basketSum">{totalSum} {currency}</span>

            <div className={'basket_modal ' + ((isCartOpen) ? 'basket_modal_opened' : '')} onClick={(e) => { e.stopPropagation() }}>
                {(addedProds.length > 0)
                    ? addedProds.map((prod) => {
                        return (
                            <div key={prod.id} className="basketModal_prod">
                                <div className="basketModal_removeProd" onClick={() => removeProd(prod.id, prodsInBasket, setprodsInBasket)}>&#10006;</div>
                                <Link to={'/shop/' + prod.id}>
                                    <div className="basketModal_img">
                                        <img src={imgDirectory + prod.img} alt="" />
                                    </div>
                                    <h5>{prod.title}</h5>
                                </Link>
                                <span className="basketModal_price price">{prod.price} {currency}</span>
                                <div className="basketModal_quantity">
                                    <MyCount
                                        props_count={prod.quant}
                                        maxcount={prod.stock}
                                        addQuant={addQuant}
                                        ID={prod.id}
                                    />
                                </div>
                                <span className="basketModal_price">{prod.totalSum} {currency}</span>
                            </div>
                        )
                    })
                    : <p>Корзина пуста</p>
                }
            </div>
        </div>
    )
}
