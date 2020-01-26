import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className='navbar fixed-top navbar-expand-sm'>
            <ul className='navbar-nav'>
                <li>
                    <Link to='/' className='nav-link'>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to='/products' className='nav-link'>
                        All Products
                    </Link>
                </li>
                <li>
                    <Link to='login' className='nav-link'>
                        Shop Login
                    </Link>
                </li>
            </ul>
            <div className='cart-container'>
                <Link to='/cart' className='nav-link'>
                    Cart
                </Link>
            </div>
        </nav>
    )
}

export default Navbar