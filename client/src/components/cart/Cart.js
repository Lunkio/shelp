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
            <div>
                <Link to='/products'>
                    <button>Continue shopping</button>
                </Link>                
            </div>
            <div>
                {props.cart.map(product =>
                    <InCartProducts key={product.id} product={product} />    
                )}
            </div>
            <div>
                <button id='emptyCart' className='btn btn-danger' onClick={handleEmptyCart}>Empty Cart</button>
            </div>
            <div>
                <h5>Total: <b>{totalPrice}</b> €</h5>
            </div>
            <div>
                <Link to='/checkout'>
                    <button>Checkout</button>
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