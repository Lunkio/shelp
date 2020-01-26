import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Products from './components/Products'
import ShopLogin from './components/ShopLogin'
import Cart from './components/cart/Cart'
import Checkout from './components/cart/Checkout'
import productsService from './services/productsService'
import { initializeProducts } from './reducers/productsReducer'

const App = (props) => {

    useEffect(() => {
        productsService.getAll()
            .then(products => {
                props.initializeProducts(products)
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <Router>
                <Navbar />
                <Route exact path='/' render={() => <Home />} />
                <Route path='/products' render={() => <Products />} />
                <Route path='/login' render={() => <ShopLogin />} />
                <Route path='/cart' render={() => <Cart />} />
                <Route path='/checkout' render={() => <Checkout />} />
            </Router>
        </div>
    )
}

export default connect(null, { initializeProducts })(App)