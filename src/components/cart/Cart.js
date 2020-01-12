import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import InCartProducts from './InCartProducts'

const Cart = (props) => {

    if (props.cart.length === 0) {
        return (
            <div className='container main'>
                <h2>Cart is empty</h2>
            </div>
        )
    }

    return (
        <div className='container main'>
            <div>
                <Link to='/products'>
                    Continue shopping
                </Link>
                <Link to='/checkout'>
                    Checkout
                </Link>
            </div>
            <div>
                {props.cart.map(product =>
                    <InCartProducts key={product.id} product={product} />    
                )}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}

export default connect(
    mapStateToProps
)(Cart)