import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'

const PaymentCancel = (props) => {

    if (props.cart.length === 0) {
        return <Redirect to='/' />
    }

    return (
        <div className='container main'>
            <div className='cancel-container' data-testid='cancel'>
                <h1>Oops! Something went wrong</h1>
                <h3>Payment was cancelled/interrupted</h3>
                <h3>Please try again</h3>
                <Link to='/cart'>
                    <button className='ui button cancel-button'>Back to cart</button>
                </Link>
            </div>
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