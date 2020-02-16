import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Checkout = () => {
    return (
        <div className='container main'>
            <div className='row'>
                <div className='col-md-8'>
                    <form>
                        <div className='form-row'>
                            <div className='form-group col-md-6'>
                                <input id='firstName' type='text' name='buyerFirstName' placeholder='Firstname' required className='form-control' />
                            </div>
                            <div className='form-group col-md-6'>
                                <input id='lastName' type='text' name='buyerLastName' placeholder='Lastname' required className='form-control' />
                            </div>
                        </div>
                        <input id='email' type='email' name='buyerEmail' placeholder='Email' required className='form-control' /><br />
                        <input id='street' type='street' name='buyerAddress' placeholder='Street' required className='form-control' /><br />
                        <div className='form-row'>
                            <div className='form-group col-md-8'>
                                <input id='city' type='city' name='buyerCity' placeholder='City' required className='form-control' />
                            </div>
                            <div className='form-group col-md-4'>
                                <input id='zip' type='zip' name='buyerPostcode' placeholder='Postal code' required className='form-control' /><br />
                            </div>
                        </div>
                    </form>
                </div>
                <div className='col-md-4'>
                    tänne puolelle tuotteet
                </div>
            </div>
            <div>
                <Link to='/cart'>
                    <button>Back to Cart</button>
                </Link>
            </div>
        </div>
    )
}

export default connect()(Checkout)