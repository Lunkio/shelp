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
import ShopExpiredProduct from './ShopExpiredProduct'

const ShopLoggedIn = (props) => {
    //console.log(props)
    const [selectedProducts, setSelectedProducts] = useState([])
    //console.log('selectedProducts', selectedProducts)

    const [showProducts, setShowProducts] = useState(true)
    const [showAdd, setShowAdd] = useState(false)
    const [showManage, setShowManage] = useState(false)
    const [showBought, setShowBought] = useState(false)
    const [showExpired, setShowExpired] = useState(false)

    if (selectedProducts === null) {
        setSelectedProducts([])
        return null
    }

    const productsShow = { display: showProducts ? '' : 'none' }
    const addShow = { display: showAdd ? '' : 'none' }
    const manageShow = { display: showManage ? '' : 'none' }
    const boughtShow = { display: showBought ? '' : 'none' }
    const expiredShow = { display: showExpired ? '' : 'none' }

    const handleProductsShow = () => {
        setShowProducts(true)
        setShowAdd(false)
        setShowManage(false)
        setShowBought(false)
        setShowExpired(false)
    }

    const handleBoughtProduct = () => {
        setShowProducts(false)
        setShowAdd(false)
        setShowManage(false)
        setShowBought(true)
        setShowExpired(false)
    }

    const handleExpired = () => {
        setShowProducts(false)
        setShowAdd(false)
        setShowManage(false)
        setShowBought(false)
        setShowExpired(true)
    }

    const handleAddShow = () => {
        setShowProducts(false)
        setShowAdd(true)
        setShowManage(false)
        setShowBought(false)
        setShowExpired(false)
    }

    const handleManage = () => {
        setShowProducts(false)
        setShowAdd(false)
        setShowManage(true)
        setShowBought(false)
        setShowExpired(false)
    }

    const handleLogout = () => {
        productsService.destroyToken()
        shopsService.destroyToken()
        props.logoutShop()
    }

    // asettaa tuotteiden nimet Select -valikon vaihtoehdoiksi
    let allProductsLabel = []
    allProductsLabel = props.products
        .filter(p => p.shop.id === props.shopLogin.id)
        .filter(p => p.availability === true)
        .map(p => { return { value: p.id, label: p.description } })
    let productIds = selectedProducts.map(p => p.value)
    let filteredProducts = []

    return (
        <div className='container main'>
            <div className='loggedin-header row'>
                <h5 className='col-md-4 partner-pages'><b>Shelp Partner pages</b></h5>
                <h3 className='col-md-4 shopname'>Logged in as {props.shopLogin.name}</h3>
                <div className='col-md-4 logout-shop'>
                    <button id='logoutBtn' onClick={handleLogout} className='btn btn-danger'>Logout</button>
                </div>
            </div>
            <hr />
            <div className='loggedin-buttons'>
                <button className='ui button' id='products' onClick={handleProductsShow}>Products on sale</button>
                <button className='ui button' id='bought' onClick={handleBoughtProduct}>Bought Products</button>
                <button className='ui button' id='expired' onClick={handleExpired}>Expired Products</button>
                <button className='ui button' id='add' onClick={handleAddShow}>Add products</button>
                <button className='ui button' id='manage' onClick={handleManage} >Manage Shop</button>
            </div>

            <div className='info-message'>
                {props.confirm && <Message success header={props.confirm} />}
                {props.alert && <Message error header={props.alert} />}
            </div>
            
            {/* Shows Products on sale */}
            <div style={productsShow}>
                <div>
                    <h3>Products on sale:</h3>
                </div><hr />
                <Select 
                    options={allProductsLabel}
                    placeholder='Search products...'
                    onChange={setSelectedProducts}
                    isMulti
                    isSearchable
                /> <br />
                {allProductsLabel.length === 0 &&
                    <div className='no-products-sale'>
                        <h1>No products on sale</h1>
                        <h5 onClick={handleAddShow}>Add products</h5>
                    </div>
                }
                {selectedProducts.length === 0 &&
                    <div>
                        {props.products
                            .filter(p => p.shop.id === props.shopLogin.id)
                            .filter(p => p.availability === true)
                            .map(p => <ShopProduct key={p.id} product={p} />
                        )}
                    </div>
                }
                {selectedProducts.length > 0 && 
                    <div>
                        {productIds.forEach(v => {
                                filteredProducts = filteredProducts.concat(props.products.filter(p => p.id === v))
                            }
                        )}
                        {filteredProducts
                            .map(p => <ShopProduct key={p.id} product={p} />
                        )}
                    </div>
                }
            </div>

            {/* Shows bought Products */}
            <div style={boughtShow}>
                <div>
                    <h3>Bought products:</h3>
                </div><hr />
                {props.products
                    .filter(p => p.shop.id === props.shopLogin.id)
                    .filter(p => p.expired !== true)
                    .filter(p => p.availability === false)
                    .map(p => <ShopBoughtProduct key={p.id} product={p} />
                )}
            </div>

            {/* Shows expired Products */}
            <div style={expiredShow}>
                <div>
                    <h3>Expired products:</h3>
                </div><hr />
                {props.products
                    .filter(p => p.shop.id === props.shopLogin.id)
                    .filter(p => p.expired === true)
                    .map(p => <ShopExpiredProduct key={p.id} product={p} />
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
                <div>
                    <h3>Manage Shop:</h3>
                </div><hr />
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