import React from 'react'
import { connect } from 'react-redux'
import { Icon } from 'semantic-ui-react'
import { removeFromCart } from '../../reducers/cartReducer'

const InCartProducts = (props) => {

    const remove = (product) => {
        props.removeFromCart(product.id)
    }

    return (
        <div className='row cart-product-container'>
            <div className='col-md-2'>
                <div className='cart-img-container'>
                    <img src={props.product.img.location} alt='cart product' id='cartProduct' />
                </div>
            </div>
            <div className='col-md-6 cart-product-desc'>
                <h4>{props.product.description}</h4> <hr className='divider' />
                <p><i className='fas fa-store'/> <b>{props.product.shop.name}</b></p>
                <p><i className='fas fa-map-marker-alt' /> {props.product.shop.address}, {props.product.shop.zip} {props.product.shop.city}</p>
                <p><i className='fas fa-phone' /> {props.product.shop.phone} {props.product.shop.website !== '' && <span><i className='fas fa-globe' /> {props.product.shop.website}</span>}</p>
            </div>            
            <div className='col-md-2 price-container'>
                <h4>{props.product.price} €</h4>
                <h6 className='original-price'>{props.product.originalPrice} €</h6>
                <h5 className='discount'>-{props.product.discount}%</h5>
            </div>
            <div className='col-md-2'>
                <div id='cartRemoveBtn' className='cart-remove-button' onClick={() => remove(props.product)}><Icon name='remove circle' size='large' /></div>
            </div>
        </div>
    )
}

export default connect(null, { removeFromCart })(InCartProducts)