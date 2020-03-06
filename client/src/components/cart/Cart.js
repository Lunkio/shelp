import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import InCartProducts from './InCartProducts'
import { emptyCart } from '../../reducers/cartReducer'
import Footer from '../Footer'

const Cart = (props) => {
    //console.log(props)

    if (props.cart.length === 0) {
        return (
            <div className='container main empty-cart'>
                <h1>Cart is empty</h1>
                <Link to='/products'>
                    <button className='ui button'>Discover offers</button>
                </Link>
            </div>
        )
    }

    const totalPrice = props.cart.reduce((a,p) => a + p.price, 0)
    const priceWithoutDiscount = props.cart.reduce((a,p) => a + p.originalPrice, 0)
    const savedPrice = priceWithoutDiscount - totalPrice

    const handleEmptyCart = () => {
        props.emptyCart()
    }

    return (
        <div className='container main'>
            <div className='cart-header'>
                <h1>Shopping Cart</h1> <hr />
            </div>
            <div className='row cart-descriptions'>
                <div className='col-md-8'>
                    <p><b>Product</b></p> <hr />
                </div>
                <div className='col-md-2'>
                    <p><b>Price</b></p> <hr />
                </div>
                <div className='col-md-2'>
                    <p><b>Remove</b></p> <hr />
                </div>
            </div>
            <div>
                {props.cart.map(product =>
                    <InCartProducts key={product.id} product={product} />    
                )}
            </div>
            <div className='row cart-buttons'>
                <div className='col-md-5 cart-continue-empty-buttons'>
                    <Link to='/products'>
                        <button className='ui teal basic button'>Continue shopping</button>
                    </Link>
                    <button id='emptyCart' className='btn btn-danger' onClick={handleEmptyCart}>Empty Cart</button>
                </div>
                <div className='col-md-5 cart-price-container'>
                    <div className='cart-prices'>
                        <h4>Total: <b>{Math.round((totalPrice + Number.EPSILON) * 100) / 100}</b> €</h4>
                        <h6>You save {Math.round((savedPrice + Number.EPSILON) * 100) / 100} €</h6>
                    </div>
                </div>
                <div className='col-md-2 checkout-button'>
                    <Link to='/checkout'>
                        <button className='ui button'>Checkout</button>
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = {
    emptyCart
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart)