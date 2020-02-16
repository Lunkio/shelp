import React from 'react'
import { connect } from 'react-redux'
import { addToCart } from '../reducers/cartReducer'

const SingleProduct = (props) => {
    //console.log(props)

    const checkIfInCart = (product) => {
        return props.cart.find(p => p.id === product.id)
    }

    return (
        <div>
            <div>
                <h4>{props.product.description}</h4>
            </div>
            <div className='img-container'>
                <img src={props.product.img.location} alt='product' id='img' />
            </div>
            <div>
                <div>
                    <p><b>{props.product.price}</b> €</p>
                </div>
                <button
                    className='ui green basic button'
                    id='buyBtn'
                    disabled={checkIfInCart(props.product)}
                    onClick={() => props.addToCart(props.product)}>
                        {checkIfInCart(props.product) ? <p>In cart</p> : <p>Add to Cart</p>}
                </button>
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