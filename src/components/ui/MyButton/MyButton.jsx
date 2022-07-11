import React from 'react'
import "../../../assets/css/MyButton.css"

export default function MyButton({ clickAction, text }) {

    return (
        <button className="button" onClick={() => { clickAction() }} >{text}</button>
    )
}