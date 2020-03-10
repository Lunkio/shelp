import React from 'react'
import { connect } from 'react-redux'
import { Icon } from 'semantic-ui-react'
import { removeFromCart } from '../../reducers/cartReducer'
import { formatDate } from '../../services/shared'

const InCartProducts = (props) => {

    const remove = (product) => {
        props.removeFromCart(product.id)
    }

    return (
        <div className='row cart-product-container'>
            <div className='col-md-2'>
                <div className='cart-img-container'>
                    <img src={props.product.img.location} alt='cart product' data-testid='incart-img' />
                </div>
            </div>
            <div className='col-md-6 cart-product-desc'>
                <div className='product-header-date'>
                    <h4>{props.product.description}</h4> <h6>Expiration date: <span className='expiration-date'><b>{formatDate(props.product.date)}</b></span></h6>
                </div> <hr className='divider' />
                <div className='product-shop-small-screen-container'>
                    <div className='product-shop-desc-texts'>
                        <p><i className='fas fa-store'/> <b>{props.product.shop.name}</b></p>
                        <p><i className='fas fa-map-marker-alt' /> {props.product.shop.address}, {props.product.shop.zip} {props.product.shop.city}</p>
                        <p><i className='fas fa-phone' /> {props.product.shop.phone} {props.product.shop.website !== '' && <span><i className='fas fa-globe' /> {props.product.shop.website}</span>}</p>
                    </div>
                    <div className='img-container-small-screen'>
                        <img src={props.product.img.location} alt='cart product'/>
                    </div>
                </div>
            </div>            
            <div className='col-md-2 price-container'>
                <div className='prices'>
                    <h4>{props.product.price}€</h4>
                    <h6 className='original-price'>{props.product.originalPrice}€</h6>
                </div>
                <h5 className='discount'>-{props.product.discount}%</h5>
            </div>
            <div className='col-md-2 cart-remove-item-icon'>
                <div className='cart-remove-button' onClick={() => remove(props.product)} data-testid='remove-from-cart'><Icon name='remove circle' size='large' /></div>
                <div className='cart-remove-text-small-screen'>Remove</div>
            </div>
        </div>
    )
}

export default connect(null, { removeFromCart })(InCartProducts)