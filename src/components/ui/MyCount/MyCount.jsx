import React, { useRef } from 'react'
import "../../../assets/css/MyCount.css"
import { useState, useContext, useEffect } from 'react'
import { CurrencyContext } from '../../../context/context'


export default function MyCount({ props_count, maxcount, addQuant, ID, setquantityInSingleProd }) {

    let [count, setCount] = useState(props_count)
    let maxCount = maxcount
    let [alert_text, setalert_text] = useState('')

    let countRef = useRef(null)

    let { prodsInBasket, setprodsInBasket } = useContext(CurrencyContext)

    let stock_f = () => {
      setalert_text(`Осталось ${maxCount} товаров`)
    }

    useEffect(() => {
      stock_f()
    })

  return (
    <div className="quantity" ref={countRef}>
        <button className="decrement" onClick={() => {
          let a = (count <= 0) ? 0 : count - 1
          setCount(a);
          countRef.current = a;
          (addQuant) && addQuant(a, ID, prodsInBasket, setprodsInBasket);
          (setquantityInSingleProd) && setquantityInSingleProd(countRef.current)
        }}>-</button>
        <input type="number" value={count} onChange={(e) => {}} />
        <button className="increment" onClick={() => {
          let a = (count >= maxCount) ? count : count + 1
          setCount(a);
          countRef.current = a;
          (addQuant) && addQuant(a, ID, prodsInBasket, setprodsInBasket);
          (setquantityInSingleProd) && setquantityInSingleProd(countRef.current)
        }}>+</button>

        <div className={'quantity_alert ' + ((count === maxCount) ? 'quantAlert_opened' : '')}>{alert_text}</div>
    </div>
  )
}