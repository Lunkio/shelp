import React from 'react'
import { connect } from 'react-redux'
import { addToCart } from '../reducers/cartReducer'

const SingleProduct = (props) => {
    //console.log(props.cart)

    const checkIfInCart = (product) => {
        if (props.cart.find(p => p.id === product.id)) {
            return true
        }
        return false
    }

    return (
        <div>
            {props.product.description}
            <button 
                disabled={checkIfInCart(props.product)}
                onClick={() => props.addToCart(props.product)}>
                    {checkIfInCart(props.product) ? <p>In cart</p> : <p>Add to Cart</p>}
            </button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}

export default connect(mapStateToProps, { addToCart })(SingleProduct)