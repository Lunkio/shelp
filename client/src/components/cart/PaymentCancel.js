import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const PaymentCancel = (props) => {

    if (props.cart.length === 0) {
        return <Redirect to='/' />
    }

    return (
        <div className='container main'>
            <h1>Oops! Something went wrong</h1>
            <h3>Payment was cancelled/interrupted</h3>
            <h3>Please try again</h3>
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
)(PaymentCancel)