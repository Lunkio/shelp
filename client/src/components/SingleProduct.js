import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addToCart } from '../reducers/cartReducer'
import Modal from './Modal'

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
                        <img className='single-product-img' onClick={modalSwitch} src={props.product.img.location} alt='product' id='img' />
                    </div>
                </div>
                <div className='col-md-6 product-shop-desc'>
                    <h3>{props.product.description}</h3> <hr />
                    <p><i className='fas fa-store'/> <b>{props.product.shop.name}</b></p>
                    <p><i className='fas fa-map-marker-alt' /> {props.product.shop.address}, {props.product.shop.zip} {props.product.shop.city}</p>
                    <p><i className='fas fa-phone' /> {props.product.shop.phone} {props.product.shop.website}</p>
                </div>
                <div className='col-md-2'>
                    <h3>{props.product.price} €</h3>
                </div>
                <div className='col-md-2'>
                    <button
                        className='ui button cart-button'
                        // className='ui green basic button cart-button'
                        id='buyBtn'
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