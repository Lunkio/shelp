import React, { useState } from 'react'
import { connect } from 'react-redux'
import productsService from '../../services/productsService'
import { logoutShop } from '../../reducers/shopLoginReducer'
import ShopProduct from './ShopProduct'
import ShopAddProduct from './ShopAddProduct'

const ShopLoggedIn = (props) => {
    //console.log(props)
    const [showProducts, setShowProducts] = useState(true)
    const [showAdd, setShowAdd] = useState(false)

    const productsShow = { display: showProducts ? '' : 'none' }
    const addShow = { display: showAdd ? '' : 'none' }

    const handleProductsShow = () => {
        setShowProducts(true)
        setShowAdd(false)
    }

    const handleAddShow = () => {
        setShowProducts(false)
        setShowAdd(true)
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedInShop')
        productsService.destroyToken()
        props.logoutShop()
    }

    return (
        <div className='container main'>
            <button id='logoutBtn' onClick={handleLogout} className='btn btn-danger'>Logout</button>
            <h1>Welcome!</h1>
            <h3>{props.shopLogin.name}</h3> <br />
            <button id='products' onClick={handleProductsShow}>Products on sale</button>
            <button id='add' onClick={handleAddShow}>Add products</button>
            
            {/* Shows Products on sale */}
            <div style={productsShow}>
                {props.products
                    .filter(p => p.shop.id === props.shopLogin.id)
                    .filter(p => p.availability === true)
                    .map(p => <ShopProduct key={p.id} product={p} />
                )}
            </div>

            {/* Add Products */}
            <div style={addShow}>
                <ShopAddProduct />
            </div>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        shopLogin: state.shopLogin,
        products: state.products
    }
}

const mapDispatchToProps = {
    logoutShop
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShopLoggedIn)