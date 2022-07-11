import React, { useState } from 'react'
import "../../assets/css/SingleProd.css"
import { useParams } from 'react-router-dom'
import { useContext } from "react";
import { CurrencyContext } from "../../context/context";
import MyCount from '../../components/ui/MyCount/MyCount';
import MyButton from '../../components/ui/MyButton/MyButton';
import OneProd from '../../components/productsList/oneProd/oneProd';

export default function SingleProd() {

    let { getProdById, prodsInBasket, setprodsInBasket, addToBasket, imgDirectory, getRelatedProds, products } = useContext(CurrencyContext)

    let params = useParams()

    let [quantity, setquantity] = useState(1)

    let [currProd, setCurrProd] = useState(getProdById(params.id)[0])

    let addToCart = () => {
        addToBasket(currProd, prodsInBasket, setprodsInBasket, quantity)
    }

    function setCount(q) {
        setquantity(q)
    }

  return (
    <main className="main">
        <div className="singleTop">
            <div className="singleTop_Img">
                <img src={imgDirectory + currProd.img} />
            </div>

            <div className="singleTop_right">
                <h1>{currProd.title}</h1>
                <div className="categs">
                    {currProd.category.map((categ) => {
                        return <span key={categ}>{categ}</span>
                    })}
                </div>
                <p className="price">{currProd.price} {currProd.currency}</p>
                <div className="countAndStock">
                    <MyCount
                        props_count={1}
                        maxcount={currProd.stock}
                        setquantityInSingleProd={setCount}
                    />
                      <span className="stock">Осталось: {currProd.stock} штук</span>
                </div>

                <MyButton clickAction={addToCart} text={'Add to Cart'} />
            </div>
        </div>
        
        <div className="singleBottom">
            <div className="singleBottom_desc">
                <h3>Описание: </h3>
                {currProd.desc}
            </div>
        </div>

        <div className="relatedProds_w">
            <h3>Похожие товары:</h3>

            <div className="relatedProds">
                {/* console.log(getRelatedProds(products, currProd.id)) */}
                {getRelatedProds(products, currProd.id).map((prod) => {
                    return <OneProd key={prod.id} prod={prod} />
                })}
            </div>
        </div>
    </main>
  )
}
