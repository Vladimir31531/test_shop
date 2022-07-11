import React from 'react'
import "../../assets/css/main.css"
import Banner from '../../components/banner/banner'
import ProductsList from '../../components/productsList/ProductsList'

export default function Main({ prods }) {
  return (
    <main className="main">
        <Banner/>

        <ProductsList
            prods={prods}
        />
    </main>
  )
}
