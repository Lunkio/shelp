import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = (props) => {
    return (
        <nav className='navbar fixed-top navbar-expand-sm'>
            <div className='navbar-home'>
                <div className='home-link'>
                    <Link to='/' className='nav-link'>
                        <h2 className='nav-link-header'>Shelp</h2>
                    </Link>
                </div>
                <div className='shop-login'>
                    <Link to='login' className='nav-link'>
                        <div className='nav-link-text'><b>Shop Login</b></div>
                    </Link>
                </div>
            </div>
            <ul className='navbar-nav'>
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