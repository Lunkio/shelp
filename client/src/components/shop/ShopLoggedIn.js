import React, { useState } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import { Message } from 'semantic-ui-react'
import productsService from '../../services/productsService'
import shopsService from '../../services/shopsService'
import { logoutShop } from '../../reducers/shopLoginReducer'
import ShopProduct from './ShopProduct'
import ShopAddProduct from './ShopAddProduct'
import ShopManage from './ShopManage'
import ShopBoughtProduct from './ShopBoughtProduct'

const ShopLoggedIn = (props) => {
    //console.log(props)
    const [selectedProducts, setSelectedProducts] = useState([])
    console.log(selectedProducts)

    const [showProducts, setShowProducts] = useState(true)
    const [showAdd, setShowAdd] = useState(false)
    const [showManage, setShowManage] = useState(false)
    const [showBought, setShowBought] = useState(false)

    const productsShow = { display: showProducts ? '' : 'none' }
    const addShow = { display: showAdd ? '' : 'none' }
    const manageShow = { display: showManage ? '' : 'none' }
    const boughtShow = { display: showBought ? '' : 'none' }

    const handleProductsShow = () => {
        setShowProducts(true)
        setShowAdd(false)
        setShowManage(false)
        setShowBought(false)
    }

    const handleBoughtProduct = () => {
        setShowProducts(false)
        setShowAdd(false)
        setShowManage(false)
        setShowBought(true)
    }

    const handleAddShow = () => {
        setShowProducts(false)
        setShowAdd(true)
        setShowManage(false)
        setShowBought(false)
    }

    const handleManage = () => {
        setShowProducts(false)
        setShowAdd(false)
        setShowManage(true)
        setShowBought(false)
    }

    const handleLogout = () => {
        productsService.destroyToken()
        shopsService.destroyToken()
        props.logoutShop()
    }

    let allProducts = []
    allProducts = props.products.filter(p => p.shop.name === props.shopLogin.name).map(p => { return { value: p.description, label: p.description } })

    return (
        <div className='container main'>
            <div className='loggedin-header'>
                <h5>Shelp Partner pages</h5>
                <h3>Logged in as {props.shopLogin.name}</h3>
                <button id='logoutBtn' onClick={handleLogout} className='btn btn-danger'>Logout</button>
            </div>
            <hr />
            <div className='loggedin-buttons'>
                <button className='ui button' id='products' onClick={handleProductsShow}>Products on sale</button>
                <button className='ui button' id='bought' onClick={handleBoughtProduct}>Bought Products</button>
                <button className='ui button' id='add' onClick={handleAddShow}>Add products</button>
                <button className='ui button' id='manage' onClick={handleManage} >Manage Shop</button>
            </div>

            {props.confirm && <Message success header={props.confirm} />}
            {props.alert && <Message error header={props.alert} />}
            
            {/* Shows Products on sale */}
            <div style={productsShow}>
                <div>
                    <h3>Products on sale:</h3>
                </div><hr />
                <Select 
                    options={allProducts}
                    placeholder='Search products...'
                    onChange={setSelectedProducts}
                    isMulti
                    isSearchable
                /> <br />
                {props.products
                    .filter(p => p.shop.id === props.shopLogin.id)
                    .filter(p => p.availability === true)
                    .map(p => <ShopProduct key={p.id} product={p} />
                )}
            </div>
            {/* {selectedProducts && 
                <div>
                    {props.products
                        .filter(p => p.description === )
                        .map(p => <ShopProduct key={p.id} product={p} />)}
                </div>
            } */}

            {/* Shows bought Products */}
            <div style={boughtShow}>
            <div>
                    <h3>Bought products:</h3>
                </div><hr />
                {props.products
                    .filter(p => p.shop.id === props.shopLogin.id)
                    .filter(p => p.availability === false)
                    .map(p => <ShopBoughtProduct key={p.id} product={p} />
                )}
            </div>

            {/* Add Products */}
            <div style={addShow}>
                <div>
                    <h3>Add new product:</h3>
                </div><hr />
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
        products: state.products,
        alert: state.alert,
        confirm: state.confirm
    }
}

const mapDispatchToProps = {
    logoutShop
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShopLoggedIn)