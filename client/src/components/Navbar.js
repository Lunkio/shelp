import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = (props) => {
    return (
        <nav className='navbar fixed-top navbar-expand-sm'>
            <div className='navbar-home'>
                <Link to='/' className='nav-link'>
                    <h2 className='nav-link-text'>Shelp</h2>
                </Link>
            </div>
            <ul className='navbar-nav'>
                <li>
                    <Link to='login' className='nav-link'>
                        <div className='nav-link-text'><b>Shop Login</b></div>
                    </Link>
                </li>
                <li>
                    <Link to='/products' className='nav-link'>
                        <div className='nav-link-text'><b>All Products</b></div>
                    </Link>
                </li>
                <li>
                    <Link to='/map' className='nav-link'>
                        <div className='nav-link-text'><b>See Map</b></div>
                    </Link>
                </li>
                <li>
                    <Link to='/cart' className='nav-link'>
                        <div className='nav-link-text'>
                            <span>
                                <i className='fas fa-shopping-cart' />
                            </span> <b>{`Cart (${props.cart.length})`}</b>
                        </div>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}

export default connect(
    mapStateToProps
)(Navbar)