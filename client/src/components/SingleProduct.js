import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addToCart } from '../reducers/cartReducer'
import Modal from './Modal'
import { formatDate } from '../services/shared'

const SingleProduct = (props) => {
    //console.log(props)
    const [modalOpen, setModalOpen] = useState(false)

    const checkIfInCart = (product) => {
        return props.cart.find(p => p.id === product.id)
    }

    const modalSwitch = () => {
        if (modalOpen) {
            setModalOpen(false)
        } else {
            setModalOpen(true)
        }
    }

    return (
        <div>
            {modalOpen && <Modal img={props.product.img.location} modalSwitch={modalSwitch}/>}
            <div className='row product-container'>
                <div className='col-md-2'>
                    <div className='img-container'>
                        <img className='single-product-img' onClick={modalSwitch} src={props.product.img.location} alt='product' data-testid='img' />
                    </div>
                </div>
                <div className='col-md-6 product-shop-desc'>
                    <div className='product-header-date'>
                        <h3 data-testid='desc'>{props.product.description}</h3> <h6>Expiration date: <span data-testid='expiration' className='expiration-date'><b>{formatDate(props.product.date)}</b></span></h6>
                    </div> <hr />
                    <div className='product-shop-small-screen-container'>
                        <div className='product-shop-desc-texts'>
                            <p className='product-shop-desc-text' data-testid='shopname'><i className='fas fa-store'/> <b>{props.product.shop.name}</b></p>
                            <p className='product-shop-desc-text' data-testid='shopaddress'><i className='fas fa-map-marker-alt' /> {props.product.shop.address}, {props.product.shop.zip} {props.product.shop.city}</p>
                            <p className='product-shop-desc-text' data-testid='shopphone'><i className='fas fa-phone' /> {props.product.shop.phone} {props.product.shop.website !== '' && <span><i className='fas fa-globe' /> {props.product.shop.website}</span>}</p>
                        </div>
                        <div className='img-container-small-screen'>
                            <img className='single-product-img' onClick={modalSwitch} src={props.product.img.location} alt='product' />
                        </div>
                    </div>
                </div>
                <div className='col-md-2'>
                    <div className='price-container'>
                        <div className='prices'>
                            <h3 data-testid='price'>{props.product.price}€</h3>
                            <h6 className='original-price' data-testid='originalprice'>{props.product.originalPrice}€</h6>
                        </div>
                        <h5 className='discount' data-testid='discount'>-{props.product.discount}%</h5>
                    </div>
                </div>
                <div className='col-md-2 cart-button-container'>
                    <button
                        className='ui button cart-button'
                        data-testid='cartbutton'
                        disabled={checkIfInCart(props.product)}
                        onClick={() => props.addToCart(props.product)}>
                            {checkIfInCart(props.product) ? <p>In cart</p> : <p>Add to Cart</p>}
                    </button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}

export default connect(mapStateToProps, { addToCart })(SingleProduct)