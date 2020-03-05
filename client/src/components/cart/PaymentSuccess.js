import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { initializeProducts } from '../../reducers/productsReducer'
import { initializeShops } from '../../reducers/shopsReducer'

const PaymentSuccess = (props) => {
    //console.log('SUCCESS PROPS', props)

    if (props.payment.length === 0) {
        return <Redirect to='/' />
    }

    props.initializeProducts()
    props.initializeShops()

    return (
        <div className='container main'>
            <div className='success-header'>
                <h1>Thank you for your purchace!</h1>
                <p>Order ref-nro: <span><b>{props.payment[0].id}</b></span></p>
                <p>Order's total sum: <span><b>{props.payment.reduce((a, p) => a + p.price, 0)}</b> €</span></p>
                <h5>You bought the following product(s):</h5> <br /> <hr />
            </div>
            <div className='row'>
                {props.payment.map(p => 
                    <div key={p.id} className='col-lg-4 col-md-6 col-md-12'>
                        <div className='success-product-container'>
                            <div className='img-container'>
                                <img src={p.img.location} alt='product' />
                            </div>
                            <div className='success-product-desc'>
                                <h4>{p.description}</h4>
                                <hr className='divider' />
                                <p>Shop: <b>{p.shop.name}</b></p>
                                <p>Price: <b>{p.price}</b> €</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        payment: state.payment
    }
}

const mapDistatchToProps = {
    initializeProducts,
    initializeShops
}

export default connect(
    mapStateToProps,
    mapDistatchToProps
)(PaymentSuccess)