import { Link } from 'react-router-dom'
import './Nav.css'

export const Nav = ()=>{
    return(
        <div className='Nav'>
            <div className='Logo' data-aos="fade-right">TechGalaxy</div>
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
      <Link to="/register">Register</Link>
    </li>
  </ul>
            </div>
        </div>
    )
}