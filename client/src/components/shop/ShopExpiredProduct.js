import React, { useState } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../../services/shared'
import productsService from '../../services/productsService'
import { setAlert } from '../../reducers/alertReducer'
import { setConfirm } from '../../reducers/confirmReducer'
import { initializeProducts } from '../../reducers/productsReducer'
import { initializeShops } from '../../reducers/shopsReducer'

const ShopExpiredProduct = (props) => {
    const [date, setDate] = useState('')
    const [showExpiration, setShowExpiration] = useState(true)
    const [showEditExpiration, setShowEditExpiration] = useState(false)
    const [showEditButtons, setShowEditButtons] = useState(true)

    const expirationShow = { display: showExpiration ? '' : 'none' }
    const editExpirationShow = { display: showEditExpiration ? '' : 'none' }
    const editButtonsShow = { visibility: showEditButtons ? 'visible' : 'hidden' }

    const edit = (product) => {
        setDate(product.date)
        setShowExpiration(false)
        setShowEditExpiration(true)
        setShowEditButtons(false)
    }

    const handleDateEdit = async (product) => {
        const editedProduct = {
            description: product.description,
            price: product.price,
            discount: product.discount,
            originalPrice: product.originalPrice,
            date: date,
            availability: true,
            expired: false,
            img: product.img.id
        }
        //console.log('editedProduct', editedProduct)

        // tarkistaa että tuotteen pvm vähintään nykyinen pvm
        let currentTime = new Date()
        let formattedDate = new Date(date)
        formattedDate.setHours(23)
        formattedDate.setMinutes(59)
        formattedDate.setSeconds(59)
        if (currentTime > formattedDate) {
            props.setAlert('Expiration date must be at least current date', 5)
            return
        }

        productsService.setToken(props.shopLogin.token)
        try {
            await productsService.updateProduct(product.id, editedProduct)
            props.initializeProducts()
            props.initializeShops()
            props.setConfirm('Product\'s date edited successfully!', 5)

        } catch (error) {
            console.log('error')
            props.setAlert('Date was not updated, please try again', 5)
        }
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

    const handleCancel = () => {
        setShowExpiration(true)
        setShowEditExpiration(false)
        setShowEditButtons(true)
    }

    const handleOneDay = () => {
        let dateNow = new Date(date)
        let UNIXdate = dateNow.setDate(dateNow.getDate() +1)
        let plusDay = new Date(UNIXdate).toISOString().slice(0,10)
        setDate(plusDay)
    }

    return (
        <div className='row product-container'>
            <div className='col-md-2'>
                <div className='img-container'>
                    <img src={props.product.img.location} alt='product' />
                </div>
            </div>
            <div className='col-md-6 col-sm-12'>
                <h4>{props.product.description}</h4><hr className='divider' />
                <h6 style={expirationShow}>Expiration date: <b style={{'color': 'red'}}>{formatDate(props.product.date)}</b></h6>
                <div style={editExpirationShow} className='row expired-edit'>
                    <input type='date' className='form-control col-xl-4 col-lg-12 col-md-12' value={date} onChange={e => setDate(e.target.value)} />
                    <div className='col-xl-8 col-lg-12 col-md-12 expiry-set-buttons'>
                        <div>
                            <div onClick={handleOneDay} className='ui basic teal button'>+1 Day</div>
                            <div onClick={() => handleDateEdit(props.product)} className='ui button set-date-button'>Set Date</div>
                        </div>
                        <div>
                            <div onClick={handleCancel} className='ui basic red button'>Cancel</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='img-container-small-screen'>
                <img src={props.product.img.location} alt='product' />
            </div>
            <div className='col-md-1 col-sm-12 price-container-shop'>
                <div className='price-container shop-prices'>
                    <div className='prices'>
                        <h5>{props.product.price}€</h5>
                        <h6 className='original-price'>{props.product.originalPrice}€</h6>
                    </div>
                    <h5 className='discount'>-{props.product.discount}%</h5>
                </div>
            </div>
            <div className='col-md-3 col-sm-12' style={editButtonsShow}>
                <div className='shop-expire-edit-button'>
                    <button className='btn btn-info expire-edit-button' onClick={() => edit(props.product)}>Edit expiration date</button>
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