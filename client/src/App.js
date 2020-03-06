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
            let availableProducts = allProducts.filter(p => p.availability === true)
            const currentTime = new Date() //hae nykyhetki
            // aseta tuotteiden pvm samaan muotoon kuin nykyhetki
            let dates = availableProducts
                .map(p => { return { date: p.date, id: p.id } })
                .map(p => { return { date: new Date(p.date), id: p.id } })
            for (let i = 0; i < dates.length; i++) {
                dates[i].date.setHours(23)
                dates[i].date.setMinutes(59)
                dates[i].date.setSeconds(59)
            }
            // etsi tuotteet joiden viim. käyttöpäivä mennyt ja aseta expired: true
            for (let i = 0; i < dates.length; i++) {
                if (currentTime >= dates[i].date) {
                    await productsService.productExpired(dates[i].id)
                }
            }
            props.initializeProducts()
        }
        checkExpirationDates()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            </Router>
        </div>
    )
}

export default connect(null, { initializeProducts, initializeShops, initializeShop })(App)