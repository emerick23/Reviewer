import React from 'react'
import { Link } from 'react-router-dom'

let NavBar = props => {
    return (
        <div>
            <ul>
                <li><Link to='/signup'>SignUp</Link></li>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/movies'>Movies</Link></li>
                <li><Link to='/' onClick={props.handleLogout}>Logout</Link></li>
            </ul>
        </div>
    )
}


export default NavBar