import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = (props) => {
    return (
        <nav className='navbar fixed-top navbar-expand-sm'>
            <div className='navbar-home'>
                <div className='home-link-container'>
                    <Link to='/' className='nav-link home-link'>
                        <h2 className='nav-link-header'>Shelp</h2>
                    </Link>
                </div>                
                <Link to='login' className='nav-link'>
                    <div className='shop-login'>
                        <div >
                            <div className='nav-link-text'><b>Shop Login</b></div>
                        </div>
                    </div>
                </Link>
            </div>
            <ul className='navbar-nav'>
                <Link to='/products' className='nav-link'>
                    <li>
                        <div >
                            <div className='nav-link-text'><b>All Products</b></div>
                        </div>
                    </li>
                </Link>
                <Link to='/map' className='nav-link'>
                    <li>
                        <div >
                            <div className='nav-link-text'><b>See Map</b></div>
                        </div>
                    </li>
                </Link>
                <Link to='/cart' className='nav-link'>
                    <li>
                        <div >
                            <div className='nav-link-text'>
                                <span>
                                    <i className='fas fa-shopping-cart' />
                                </span> <b>{`Cart (${props.cart.length})`}</b>
                            </div>
                        </div>
                    </li>
                </Link>
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