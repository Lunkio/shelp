import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Products from './components/Products'
import ShopLogin from './components/shop/ShopLogin'
import ShopRegister from './components/shop/ShopRegister'
import Cart from './components/cart/Cart'
import Checkout from './components/cart/Checkout'
import PaymentSuccess from './components/cart/PaymentSuccess'
import PaymentCancel from './components/cart/PaymentCancel'
import MapBox from './components/MapBox'
import PartnerInfo from './components/PartnerInfo'
import CustomerInfo from './components/CustomerInfo'
// import Footer from './components/Footer'
import productsService from './services/productsService'
import { initializeProducts } from './reducers/productsReducer'
import { initializeShops } from './reducers/shopsReducer'
import { initializeShop } from './reducers/shopLoginReducer'

const App = (props) => {

    useEffect(() => {
        props.initializeProducts()
        props.initializeShops()
        props.initializeShop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // poistaa tuotteet, joiden expiration date on vanhempi kuin nykyinen pvm
    useEffect(() => {
        async function checkExpirationDates() {
            const allProducts = await productsService.getAllProducts()
            console.log('allProducts', allProducts)
            const currentTime = new Date()
            console.log(currentTime)
            let dates = allProducts.map(p => p.date).map(d => new Date(d))
            for (let i = 0; i < dates.length; i++) {
                dates[i].setHours(23)
                dates[i].setMinutes(59)
                dates[i].setSeconds(59)
            }
            console.log('dates', dates)

            for (let i = 0; i < dates.length; i++) {
                if (currentTime >= dates[i]) {
                    console.log('old dates', dates[i])
                }
            }
        }
        checkExpirationDates()
    }, [])

    return (
        <div>
            <Router>
                <Navbar />
                <Route exact path='/' render={() => <Home />} />
                <Route path='/products' render={() => <Products />} />
                <Route path='/partnerinfo' render={() => <PartnerInfo />} />
                <Route path='/customerinfo' render={() => <CustomerInfo />} />
                <Route path='/login' render={() => <ShopLogin />} />
                <Route path='/register' render={() => <ShopRegister />} />
                <Route path='/cart' render={() => <Cart />} />
                <Route path='/checkout' render={() => <Checkout />} />
                <Route path='/map' render={() => <MapBox />} />
                <Route path='/success' render={() => <PaymentSuccess />} />
                <Route path='/cancel' render={() => <PaymentCancel />} />
                {/* <Footer /> */}
            </Router>
        </div>
    )
}

export default connect(null, { initializeProducts, initializeShops, initializeShop })(App)