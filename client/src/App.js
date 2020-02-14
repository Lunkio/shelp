import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Admin from './components/Admin'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Products from './components/Products'
import ShopLogin from './components/shop/ShopLogin'
import ShopRegister from './components/shop/ShopRegister'
import Cart from './components/cart/Cart'
import Checkout from './components/cart/Checkout'
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

    return (
        <div>
            <Router>
                <Navbar />
                <Route exact path='/' render={() => <Home />} />
                <Route path='/products' render={() => <Products />} />
                <Route path='/login' render={() => <ShopLogin />} />
                <Route path='/register' render={() => <ShopRegister />} />
                <Route path='/cart' render={() => <Cart />} />
                <Route path='/checkout' render={() => <Checkout />} />
                <Route path='/admin' render={() => <Admin />} />
            </Router>
        </div>
    )
}

export default connect(null, { initializeProducts, initializeShops, initializeShop })(App)