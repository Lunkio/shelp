import React from 'react'
import { PayPalButton } from 'react-paypal-button-v2'
import { withRouter } from 'react-router-dom'
import buyerService from '../../services/buyerService'
import productsService from '../../services/productsService'

const PayPal = (props) => {

    const onSuccess = async (payment) => {
        console.log("Success", payment)

        const newBuyer = { ...props.buyer, paymentID: payment.id, payerID: payment.payer.payer_id} //adds paypal-info to newBuyer
        //console.log('newbuyer', newBuyer)

        await buyerService.addBuyer(newBuyer)
        for (let i = 0; i < newBuyer.products.length; i++) { //loops through buyers' items and sets availability to false
            await productsService.productAvailabilityToFalse(newBuyer.products[i].id, newBuyer.products[i])
        }
        
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
    );
}

export default withRouter(PayPal)