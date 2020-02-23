import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { initializeProducts } from '../../reducers/productsReducer'

const PaymentSuccess = (props) => {
    console.log('SUCCESS PROPS', props)

    if (props.payment.length === 0) {
        return <Redirect to='/' />
    }

    props.initializeProducts()

    return (
        <div className='container main'>
            <h1>PAYMENT SUCCESSFUL</h1>
            <h2>Thank you for your purchace!</h2>                
            <p>Order's total sum: <span>{props.payment.reduce((a, p) => a + p.price, 0)} €</span></p>
            <p>Order ref-nro: <span>{props.payment[0].id}</span></p>
            <h4>You bought the following product(s):</h4>
            <div className='row'>
                {props.payment.map(p => 
                    <div key={p.id} className='col-lg-3 col-md-4 col-sm-6 img-container'>
                        <img src={p.img.location} alt='product' />
                        <p>{p.price} €</p>
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
    initializeProducts
}

export default connect(
    mapStateToProps,
    mapDistatchToProps
)(PaymentSuccess)