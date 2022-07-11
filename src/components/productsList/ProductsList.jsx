import React from 'react'
import "../../assets/css/productsList.css"

// import net_tovara from "../../assets/img/net_tovara.png"
import OneProd from './oneProd/oneProd'

export default function ProductsList({ prods }) {



  return (
    <div className="productsList_w">
      <h2>Популярные товары</h2>
      <div className="productsList">
        {prods.map((prod) => {
          // import img from `${imgDirectory} ${prod.img}`;
          return (
            <OneProd
              key={prod.id}
              prod={prod}
            />
          )
        })}
      </div>
    </div>
  )
}
