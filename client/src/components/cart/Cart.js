import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import InCartProducts from './InCartProducts'
import { emptyCart } from '../../reducers/cartReducer'

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

    const handleEmptyCart = () => {
        props.emptyCart()
    }

    return (
        <div className='container main'>
            <div className='cart-header'>
                <h1>Shopping Cart</h1> <hr />
            </div>
            <div className='row cart-descriptions'>
                <div className='col-md-9'>
                    <p><b>Product</b></p> <hr />
                </div>
                <div className='col-md-1'>
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
                <div className='col-md-8'>
                    <Link to='/products'>
                        <button className='ui teal basic button'>Continue shopping</button>
                    </Link>                
                </div>
                <div className='col-md-2 cart-total-price'>
                    <h5>Total: <b>{totalPrice}</b> €</h5>
                </div>
                <div className='col-md-2'>
                    <button id='emptyCart' className='btn btn-danger' onClick={handleEmptyCart}>Empty Cart</button>
                </div>
            </div>
            <div style={{'width': '80%', 'margin': '0 auto'}}>
                <hr />
            </div>
            <div className='cart-checkout-button'>
                <Link to='/checkout'>
                    <button className='ui button checkout-button'>Checkout</button>
                </Link>
            </div>
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