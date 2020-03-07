import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

const NavbarComponent = (props) => {
    const [expanded, setExpanded] = useState(false)

    return (
        <Navbar expanded={expanded} fixed='top' expand='lg' collapseOnSelect>
            <Navbar.Brand>
                <Link onClick={() => setExpanded(false)} to='/' className='nav-link home-link'><h2 className='nav-link-header'>Shelp</h2></Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' onClick={() => setExpanded(expanded ? false : 'expanded')} />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='nav-links-container'>
                    <Nav className='nav-links-one'>
                        <Nav><Link onClick={() => setExpanded(false)} to='/login' className='shop-login link-nav'>Shop Login</Link></Nav>
                    </Nav>
                    <Nav className='nav-links-two'>
                        <Nav><Link onClick={() => setExpanded(false)} className='nav-link-two link-nav' to='/products'>All Products</Link></Nav>
                        <Nav><Link onClick={() => setExpanded(false)} className='nav-link-two link-nav' to='/Map'>See Map</Link></Nav>
                        <Nav><Link onClick={() => setExpanded(false)} className='nav-link-two link-nav' to='/cart'><span><i className='fas fa-shopping-cart' /></span><b>{`Cart (${props.cart.length})`}</b></Link></Nav>
                    </Nav>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
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