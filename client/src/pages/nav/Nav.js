import { Link } from 'react-router-dom'
import './Nav.css'
import {BsPersonCircle} from 'react-icons/bs'
import {BiChevronDown} from 'react-icons/bi'
import { useState } from 'react';
import {GoChevronUp} from 'react-icons/go'
import logo from "../../content/logo.png"


export const Nav = ()=>{
  const [displayy, setDisplay] = useState('none');
  const DisplayFlexHandler =()=>{
    setDisplay("flex");
}
const DisplayNoneHandler =()=>{
    setDisplay("none");
}
    return(
        <div className='Nav' onClick={DisplayNoneHandler}>
            <div className='Logo' data-aos="fade-right"><img src={logo}></img></div>
            <div className='Menu' data-aos="fade-left">
            <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/about">About</Link>
    </li>
    <li>
      <Link to="/contact">Contact</Link>
    </li>
    <li>
      <Link to="/shop">Shop</Link>
    </li>
    <li className='dropdown' onMouseEnter={DisplayFlexHandler}>
      <BsPersonCircle/><BiChevronDown/>
      <ul onClick={DisplayNoneHandler} style={{display:displayy,color:"white"}}>
      <GoChevronUp className='closeButton'/>
        <li><Link to="/register">Register</Link></li>
        <li><Link to={"/login"}> Login </Link></li>
      </ul>
    </li>
   
  </ul>
            </div>
        </div>
    )
}