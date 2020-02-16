import React from 'react'
import { connect } from 'react-redux'
import { removeFromCart } from '../../reducers/cartReducer'

const InCartProducts = (props) => {

    const remove = (product) => {
        props.removeFromCart(product.id)
    }

    return (
        <div className='cart-product-container'>
            <div className='img-container'>
                <img src={props.product.img.location} alt='cart product' id='cartProduct' />
            </div>
            <div>
                <h4>{props.product.description}</h4>
            </div>            
            <div>
                <p><b>{props.product.price}</b> €</p>
            </div>
            <div>
                <button id='cartRemoveBtn' className='btn btn-danger' onClick={() => remove(props.product)}>Remove from cart</button>
            </div>
        </div>
    )
}

export default connect(null, { removeFromCart })(InCartProducts)