import React from 'react'
import { Link } from 'react-router-dom'

const Checkout = () => {
    return (
        <div className='container main'>
            <div>
                <Link to='/cart'>
                    Back to Cart
                </Link>
            </div>
            Checkout
        </div>
    )
}

export default Checkout