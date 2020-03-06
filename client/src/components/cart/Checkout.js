import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PayPalButton from './PayPal'
import productsService from '../../services/productsService'
import { setAlert } from '../../reducers/alertReducer'
import { removeFromCart } from '../../reducers/cartReducer'
import { initializeProducts } from '../../reducers/productsReducer'

const Checkout = (props) => {
    //console.log('PROPS', props)
    const [buyer, setBuyer] = useState({})
    const [showPayPal, setShowPayPal] = useState(false)

    const checkPayPal = () => {
        return showPayPal
    }

    const show = { display: showPayPal ? '' : 'none' }
    const totalPrice = props.cart.reduce((a,p) => a + p.price, 0)
    const totalPriceRounded = Math.round((totalPrice + Number.EPSILON) * 100) / 100

    const handleCustomer = async (event) => {
        event.preventDefault()
        event.persist()

        const databaseProductsInCart = []

        try {
            // tarkistaa että tuotteiden availability on true ostovaiheessa
            const allProducts = await productsService.getAllProducts()
            for (let i = 0; i < props.cart.length; i++) {
                for (let j = 0; j < allProducts.length; j++) {
                    if (props.cart[i].id === allProducts[j].id) {
                        databaseProductsInCart.push(allProducts[j])
                    }
                }
            }
            let alreadySold = databaseProductsInCart.filter(p => p.availability === false)
            if (alreadySold.length > 0) {
                window.alert('One or more of the products in your cart are not available, these products are removed from your cart')
                for (let i = 0; i < alreadySold.length; i++) {
                    props.removeFromCart(alreadySold[i].id)
                    props.initializeProducts()
                }
                return
            }

            const firstName = event.target.buyerFirstName.value
            const lastName = event.target.buyerLastName.value
            const email = event.target.buyerEmail.value
            const address = event.target.buyerAddress.value
            const zip = event.target.buyerPostcode.value
            const phone = event.target.buyerPhone.value
            const city = event.target.buyerCity.value
            const products = props.cart

            const newBuyer = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                address: address,
                zip: zip,
                phone: phone,
                city: city,
                products
            }
            setBuyer(newBuyer)
            setShowPayPal(true)

        } catch (error) {
            console.log('error', error)
            props.setAlert('Payment was not successful, please try again', 5)
        }
    }

    return (
        <div className='container main'>
            <div className='info-message'>
                {props.alert && <Message error header={props.alert} />}
            </div>
            <div className='row'>
                <div className='col-md-8'>
                    <div className='checkout-header'>
                        <h4>Shipping address</h4>
                    </div>
                    <form onSubmit={handleCustomer}>
                        <div className='form-row'>
                            <div className='form-group col-md-6'>
                                <input id='firstName' type='text' name='buyerFirstName' placeholder='Firstname' required className='form-control' />
                            </div>
                            <div className='form-group col-md-6'>
                                <input id='lastName' type='text' name='buyerLastName' placeholder='Lastname' required className='form-control' />
                            </div>
                        </div>
                        <div className='form-row'>
                            <div className='form-group col-md-12'>
                                <input id='email' type='email' name='buyerEmail' placeholder='Email' required className='form-control' />
                            </div>
                            <div className='form-group col-md-12'>
                                <input id='street' type='street' name='buyerAddress' placeholder='Street' required className='form-control' />
                            </div>
                        </div>
                        <div className='form-row'>
                            <div className='form-group col-md-8'>
                                <input id='city' type='city' name='buyerCity' placeholder='City' required className='form-control' />
                            </div>
                            <div className='form-group col-md-4'>
                                <input id='zip' type='zip' name='buyerPostcode' placeholder='Postal code' required className='form-control' />
                            </div>
                        </div>
                        <div className='form-row'>
                            <div className='form-group col-md-12'>
                                <input id='phone' type='text' name='buyerPhone' placeholder='Phone (optional)' className='form-control' />
                            </div>
                        </div>
                        <div className='checkout-apply-button'>
                            <Link to='/cart' className='back-cart-link'>
                                <div className='text'>{`< Back to cart`}</div>
                            </Link>
                            <button
                                className='ui button'
                                id='checkBtn'
                                type='submit'
                                disabled={checkPayPal()}>
                                    Continue to payment
                            </button>
                        </div>
                    </form>
                </div>
                <div className='col-md-4'>
                    <div className='checkout-total'>
                        <p>Total: <b>{totalPriceRounded}</b> €</p>
                    </div>
                    <div style={show}>
                        <PayPalButton buyer={buyer} totalPrice={totalPriceRounded} products={props.cart} />
                    </div>
                    <hr />
                    {props.cart.map(p => 
                        <div key={p.id}>
                            <div className='checkout-product-container'>
                                <div className='checkout-img'>
                                    <div className='img-container-checkout'>
                                        <img src={p.img.location} alt='product' />
                                    </div>
                                </div>
                                <div className='checkout-desc'>
                                    <h6>{p.description}</h6>
                                </div>
                                <div className='checkout-price'>
                                    <p>{p.price} €</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        alert: state.alert,
        products: state.products
    }
}

const mapDispatchToProps = {
    setAlert,
    removeFromCart,
    initializeProducts
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Checkout)