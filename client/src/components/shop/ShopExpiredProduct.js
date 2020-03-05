import React, { useState } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../../services/shared'
import productsService from '../../services/productsService'
import { setAlert } from '../../reducers/alertReducer'
import { setConfirm } from '../../reducers/confirmReducer'
import { initializeProducts } from '../../reducers/productsReducer'
import { initializeShops } from '../../reducers/shopsReducer'

const ShopExpiredProduct = (props) => {
    const [date, setDate] = useState()
    const [showExpiration, setShowExpiration] = useState(true)
    const [showEditExpiration, setShowEditExpiration] = useState(false)

    const expirationShow = { display: showExpiration ? '' : 'none' }
    const editExpirationShow = { display: showEditExpiration ? '' : 'none' }

    const edit = (product) => {
        setDate(product.date)
        setShowExpiration(false)
        setShowEditExpiration(true)
    }

    const remove = async (product) => {
        //console.log(product)
        productsService.setToken(props.shopLogin.token)
        try {
            await productsService.removeProduct(product.id)
            await productsService.removeImg(product.img.id)
            props.setConfirm('Product was removed!', 5)
            props.initializeProducts()
            props.initializeShops()
        } catch (error) {
            console.log('error', error)
            props.setAlert('Product was not removed, please try again', 5)
        }
    }

    return (
        <div className='row product-container'>
            <div className='col-md-2'>
                <div className='img-container'>
                    <img src={props.product.img.location} alt='product' id='img' />
                </div>
            </div>
            <div className='col-md-6'>
                <h4>{props.product.description}</h4><hr className='divider' />
                <h6 style={expirationShow}>Expiration date: <b style={{'color': 'red'}}>{formatDate(props.product.date)}</b></h6>
                <input style={editExpirationShow} type='date' className='form-control' value={date} onChange={e => setDate(e.target.value)} />
            </div>
            <div className='col-md-2'>
                <div className='price-container'>
                    <div className='prices'>
                        <h4>{props.product.price} €</h4>
                        <h6 className='original-price'>{props.product.originalPrice} €</h6>
                    </div>
                    <h5 className='discount'>-{props.product.discount}%</h5>
                </div>
            </div>
            <div className='col-md-2'>
                <div className='shop-product-buttons'>
                    <button className='ui button edit-button' onClick={() => edit(props.product)}>Edit Expiration Date</button>
                    <button className='btn btn-danger' onClick={() => remove(props.product)}>Remove</button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        shopLogin: state.shopLogin
    }
}

const mapDispatchToProps = {
    setAlert,
    setConfirm,
    initializeProducts,
    initializeShops
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShopExpiredProduct)