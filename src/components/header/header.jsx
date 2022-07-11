import React from 'react'
import "../../assets/css/header.css"
import {Link} from 'react-router-dom'

import Basket from "../basket/Basket"
import { useState } from 'react'
import Burger from '../Burger/Burger'

export default function Header({ prodsInBasket }) {

  let [showNavMobile, setshowNavMobile] = useState(false)

  let showNavMobile_f = () => {
    setshowNavMobile(!showNavMobile)
  }

  return (
    <header>
      <Link to=""><span className="logo">House Staff</span></Link>

      <nav className="nav">
        <ul className={"nav_ul " + ((showNavMobile) ? "show_nav" : "")}>
          <li onClick={() => { showNavMobile_f() }}>
            <Link to="/shop">Магазин</Link>
          </li>
          <li onClick={() => { showNavMobile_f() }}>
            <Link to="/about">О нас</Link>
          </li>
          <li onClick={() => { showNavMobile_f() }}>
            <Link to="/contacts">Контакты</Link>
          </li>
          <li onClick={() => { showNavMobile_f() }}>
            <Link to="/cabinet">Кабинет</Link>
          </li>
        </ul>

        <Basket
          addedProds={prodsInBasket}
        />

        <Burger
          showNavMobile_f={showNavMobile_f}
          showNavMobile={showNavMobile}
        />
      </nav>
    </header>
  )
}