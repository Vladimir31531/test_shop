import './assets/css/style.css';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import { useState } from 'react';
import { CurrencyContext } from './context/context';
import Main from './pages/main/Main';

import {BrowserRouter, Routes, Route} from 'react-router-dom'

import {addToBasket, addQuant, removeProd} from "./functions/basket_f"
import Shop from './pages/shop/Shop';
import About from './pages/about/About';
import Contacts from './pages/contacts/Contacts';
import SingleProd from './pages/singleProd/SingleProd';

function App() {

  let [categories, setcategories] = useState({
    tableware: {
      id: 'tableware',
      categName: 'Посуда',
    },
    furniture: {
      id: 'furniture',
      categName: 'Мебель',
    },
  })
  let [currency, setcurrency] = useState('MDL')
  let imgDirectory = '../assets/img/';
  let [products, setproducts] = useState([
    {
      id: 1,
      img: 'banketka.png',
      title: 'Lorem ipsum dolor',
      desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto fugit quis aperiam molestias! Itaque saepe architecto, et beatae unde velit nulla odit perferendis nobis nostrum labore corrupti aspernatur! Totam, esse?',
      category: [categories.furniture.id],
      price: 100,
      currency: currency,
      stock: 10,
      SoldQuantity: 11
    },
    {
      id: 2,
      img: 'tarelka.jpeg',
      title: 'Lorem ipsum tarelka',
      desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto fugit quis aperiam molestias! Itaque saepe architecto, et beatae unde velit nulla odit perferendis nobis nostrum labore corrupti aspernatur! Totam, esse?',
      category: [categories.tableware.id],
      price: 805,
      currency: currency,
      stock: 14,
      SoldQuantity: 2
    },
    {
      id: 3,
      img: 'net_tovara.png',
      title: 'Lorem ipsum dolor',
      desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto fugit quis aperiam molestias! Itaque saepe architecto, et beatae unde velit nulla odit perferendis nobis nostrum labore corrupti aspernatur! Totam, esse?',
      category: [categories.tableware.id, categories.furniture.id],
      price: 123,
      currency: currency,
      stock: 42,
      SoldQuantity: 3
    },
    {
      id: 4,
      img: 'net_tovara.png',
      title: 'Lorem ipsum dolor',
      desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto fugit quis aperiam molestias! Itaque saepe architecto, et beatae unde velit nulla odit perferendis nobis nostrum labore corrupti aspernatur! Totam, esse?',
      category: [categories.furniture.id, categories.tableware.id],
      price: 1234,
      currency: currency,
      stock: 42,
      SoldQuantity: 3
    },
  ])
  let [prodsInBasket, setprodsInBasket] = useState([])

  let getPopProds = (prods, max_quant) => {
    let arr = [...prods].sort((a, b) => b.SoldQuantity - a.SoldQuantity)
    return arr.slice(0, max_quant)
  }

  let getProdById = (ID) => {
    let arr = []
    arr = products.filter(prod => {
      if (prod.id == ID) {
        return true
      } else return false
    })
    return arr
  }
  let getRelatedProds = (Allprods, ID) => {
    let related = []
    let currProd = Allprods.filter(prod => {
      if (prod.id == ID) {
        return true
      } else return false
    })
    currProd[0].category.map(categ => {
      Allprods.map((prod) => {
        if (prod.category.includes(categ)) {
          if (prod.id != ID) {
            related.push(prod)
          }
        }
      })
    });

    let indexes = []
    let result = []
    related.forEach((current) => {
      if (indexes.includes(current.id)) return;
      indexes.push(current.id)
      result.push(current)
    })

    return result
  }

  return (
    <div className="wrapper">
      <CurrencyContext.Provider value={{
        currency,
        products,
        setcurrency,
        imgDirectory,
        prodsInBasket,
        setprodsInBasket,
        addToBasket,
        addQuant,
        removeProd,
        getProdById,
        getRelatedProds
      }}>

        <BrowserRouter>
          <Header
            prodsInBasket={prodsInBasket}
          />


          <Routes>
            <Route path="" element={<Main prods = {getPopProds(products, 4)} />} />
            <Route path="/shop" element={<Shop prods={ products } categs={categories} />}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/contacts" element={<Contacts/>}/>

            <Route path={ '/shop/:id'} element={<SingleProd/>} exact={true} />

            <Route path="*" element={<h1>404</h1>} />

          </Routes>
        </BrowserRouter>

        <Footer/>

      </CurrencyContext.Provider>
    </div>
  );
}

export default App;