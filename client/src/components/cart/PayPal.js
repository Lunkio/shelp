import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { PayPalButton } from 'react-paypal-button-v2'
import { withRouter } from 'react-router-dom'
import buyerService from '../../services/buyerService'
import productsService from '../../services/productsService'
import { addProductToPayment } from '../../reducers/paymentReducer'
import { emptyPayment } from '../../reducers/paymentReducer'
import { emptyCart } from '../../reducers/cartReducer'

const PayPal = (props) => {

    const onSuccess = async (payment) => {
        console.log("Success", payment)
        props.emptyPayment() //tyhjentää staten ennen kuin lisää uudet tuotteet

        const newBuyer = { ...props.buyer, paymentID: payment.id, payerID: payment.payer.payer_id}
        //console.log('newbuyer', newBuyer)

        await buyerService.addBuyer(newBuyer)
        for (let i = 0; i < newBuyer.products.length; i++) {
            await productsService.productAvailabilityToFalse(newBuyer.products[i].id, newBuyer.products[i]) // tuotteiden availability falseksi
            props.addProductToPayment(newBuyer.products[i]) // lisää tuotteet paymentReduceriin, jotta cartin voi tyhjentää
        }
        props.emptyCart()
        
        props.history.push('/success')
    }

    const onCancel = (data) => {
        props.history.push('/cancel')
    }

    const onError = (err) => {
        props.history.push('/cancel')
    }

    return (
        <PayPalButton
            amount={props.totalPrice}
            onSuccess={onSuccess}
            onCancel={onCancel}
            onError={onError}
            options={{clientId: process.env.REACT_APP_CLIENT_ID, currency: 'EUR'}}
        />
    )
}

export default compose(
    withRouter,
    connect(null, { addProductToPayment, emptyPayment, emptyCart })
)(PayPal)