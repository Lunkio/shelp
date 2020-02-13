import React from 'react'
import { connect } from 'react-redux'
import productsService from '../services/productsService'
import { logoutShop } from '../reducers/shopLoginReducer'

const ShopLoggedIn = (props) => {
    //console.log(props)

    const handleLogout = () => {
        window.localStorage.removeItem('loggedInShop')
        productsService.destroyToken()
        props.logoutShop()
    }

    return (
        <div className='container main'>
            <button id='logoutBtn' onClick={handleLogout} className='btn btn-danger'>Logout</button>
            <h1>Welcome!</h1>
            {props.shopLogin.name}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        shopLogin: state.shopLogin
    }
}

const mapDispatchToProps = {
    logoutShop
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShopLoggedIn)