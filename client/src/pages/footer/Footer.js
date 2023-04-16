import { Link } from 'react-router-dom'
import './Footer.css'
import {BsFillTelephoneFill} from "react-icons/bs"
import {TfiEmail} from 'react-icons/tfi'
import {GoLocation} from 'react-icons/go'

export const Footer =()=>{
    return(
        <div className='Footer'>
                <div className='Logo1'>
                    TechGalaxy
                </div>
            <div className='MainPart'>
               
                <div className='Menu1'>
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
  </ul>
            </div>
            <div className='contact'>
                <ul>
                    <li><a href=''><BsFillTelephoneFill/> +38344123123</a></li>
                    <li><a href=''><TfiEmail/> info@techgalaxy.com</a></li>
                    <li><a href=''><GoLocation/> Visit us!</a></li>
                </ul>
                </div>
                </div>
            <div className='Copyright'>
                <h1>&copy;All copyrights reserved to TechGalaxy - 2023 </h1>
            </div>
        
        </div>
    )
}