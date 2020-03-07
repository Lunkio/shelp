import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

const NavbarComponent = (props) => {

    return (
        <Navbar fixed='top' expand='lg' collapseOnSelect>
            <Navbar.Brand>
                <Link to='/' className='nav-link home-link'><h2 className='nav-link-header'>Shelp</h2></Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='nav-links-container'>
                    <Nav className='nav-links-one'>
                        <Nav><Link to='/login' className='shop-login link-nav'>Shop Login</Link></Nav>
                    </Nav>
                    <Nav className='nav-links-two'>
                        <Nav><Link className='nav-link-two link-nav' to='/products'>All Products</Link></Nav>
                        <Nav><Link className='nav-link-two link-nav' to='/Map'>See Map</Link></Nav>
                        <Nav><Link className='nav-link-two link-nav' to='/cart'><span><i className='fas fa-shopping-cart' /></span><b>{`Cart (${props.cart.length})`}</b></Link></Nav>
                    </Nav>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

        // <nav className='navbar fixed-top navbar-expand-sm'>
        //     <div className='navbar-home'>
        //         <div className='home-link-container'>
        //             <Link to='/' className='nav-link home-link'>
        //                 <h2 className='nav-link-header'>Shelp</h2>
        //             </Link>
        //         </div>                
        //         <Link to='login' className='nav-link'>
        //             <div className='shop-login'>
        //                 <div >
        //                     <div className='nav-link-text'><b>Shop Login</b></div>
        //                 </div>
        //             </div>
        //         </Link>
        //     </div>
        //     <ul className='navbar-nav'>
        //         <Link to='/products' className='nav-link'>
        //             <li>
        //                 <div >
        //                     <div className='nav-link-text'><b>All Products</b></div>
        //                 </div>
        //             </li>
        //         </Link>
        //         <Link to='/map' className='nav-link'>
        //             <li>
        //                 <div >
        //                     <div className='nav-link-text'><b>See Map</b></div>
        //                 </div>
        //             </li>
        //         </Link>
        //         <Link to='/cart' className='nav-link'>
        //             <li>
        //                 <div >
        //                     <div className='nav-link-text'>
        //                         <span>
        //                             <i className='fas fa-shopping-cart' />
        //                         </span> <b>{`Cart (${props.cart.length})`}</b>
        //                     </div>
        //                 </div>
        //             </li>
        //         </Link>
        //     </ul>
        // </nav>
    )
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}

export default connect(
    mapStateToProps
)(NavbarComponent)