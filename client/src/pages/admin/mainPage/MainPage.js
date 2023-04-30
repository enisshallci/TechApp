import { Link } from 'react-router-dom'
import './MainPage.css'
import { Nav } from '../../nav/Nav.js'
import { AdminNav } from '../adminNav/AdminNav'

export const MainPage = ()=>{
    return(
        <>
        <AdminNav></AdminNav>
        <div className='MainPage'>
            <h1>Welcome to the admin page</h1>
        </div>
        </>
    )
}