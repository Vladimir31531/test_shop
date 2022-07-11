import React, { useState } from 'react'
import "../../assets/css/Burger.css"

export default function Burger({ showNavMobile_f, showNavMobile }) {

  return (
    <div className={"hamburger hamburger--collapse " + ((showNavMobile) ? "is-active" : "")} onClick={() => { showNavMobile_f() }}>
        <div className="hamburger-box">
            <div className="hamburger-inner"></div>
        </div>
    </div>
  )
}
