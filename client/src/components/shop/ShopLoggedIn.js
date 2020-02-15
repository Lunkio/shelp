import React, { useState } from 'react'
import { connect } from 'react-redux'
import productsService from '../../services/productsService'
import { logoutShop } from '../../reducers/shopLoginReducer'
import ShopProduct from './ShopProduct'
import ShopAddProduct from './ShopAddProduct'
import ShopManage from './ShopManage'

const ShopLoggedIn = (props) => {
    //console.log(props)
    const [showProducts, setShowProducts] = useState(true)
    const [showAdd, setShowAdd] = useState(false)
    const [showManage, setShowManage] = useState(false)

    const productsShow = { display: showProducts ? '' : 'none' }
    const addShow = { display: showAdd ? '' : 'none' }
    const manageShow = { display: showManage ? '' : 'none' }

    const handleProductsShow = () => {
        setShowProducts(true)
        setShowAdd(false)
        setShowManage(false)
    }

    const handleAddShow = () => {
        setShowProducts(false)
        setShowAdd(true)
        setShowManage(false)
    }

    const handleManage = () => {
        setShowProducts(false)
        setShowAdd(false)
        setShowManage(true)
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
            <button id='manage' onClick={handleManage} >Manage Shop</button>
            
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

            {/* Manage Shop */}
            <div style={manageShow}>
                <ShopManage />
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