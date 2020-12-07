import React from "react"
import c from "../styles/contact.module.css"
import home10 from "../icons/home/home10.png"
import { CONTACTS } from "../utils/config"

function Contact () {
  const { pathname } = window.location
  const name = pathname.split('/')
  const contact = name.length ? CONTACTS[name[name.length -1]] : ""

  const imgClick = () => {
    window.open(contact)
  }

  if (name.length && name[name.length -1] in CONTACTS) {
    return <div className={c.view}><img onClick={imgClick} src={home10} className={c.img} alt="" /></div>
  }
  return null
}

export default Contact
