import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'

let NavBar = props => {
    if (props.user.isAdmin) {
        return (
            <div>
                <ul className='navItems'>
                    <li><Link to='/admin'>Admin</Link></li>
                    <li><Link to='/movies'>Movies</Link></li>
                    <li><Link to='/' onClick={props.handleLogout}>Logout</Link></li>
                </ul>
            </div>
        )
    } else if (props.user) {
        return (
            <div>
                <ul className='navItems'>
                    <li><Link to='/movies'>Movies</Link></li>
                    <li><Link to='/' onClick={props.handleLogout}>Logout</Link></li>
                </ul>
            </div>
        )
    } else {
        return (
            <div>
                <ul className='navItems'>
                    <li><Link to='/signup'>SignUp</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/movies'>Movies</Link></li>
                </ul>
            </div>
        )
    }
}


export default NavBar