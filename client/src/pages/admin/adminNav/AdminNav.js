import { Link } from 'react-router-dom'
import './AdminNav.css'
import logo from '../../../content/logo.png'

export const AdminNav = ()=>{
    return(
        <div className='AdminNav'>
 <div className='Logo' data-aos="fade-right"><img src={logo}></img></div>
            <div className='Menu' data-aos="fade-left">
            <ul>
    <li>
      <Link to="/orders">Orders</Link>
    </li>
    <li>
      <Link to="/products">Products</Link>
    </li>
    <li>
      <Link to="/users">Users</Link>
    </li>
    <li>
      <Link to="/chat">Chat</Link>
    </li>
  
  </ul>
            </div>
        </div>
    )
}