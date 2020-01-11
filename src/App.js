import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Products from './components/Products'
import ShopLogin from './components/ShopLogin'
import Cart from './components/cart/Cart'

const App = () => {
    return (
        <div>
            <Router>
                <Navbar />
                <Route exact path='/' render={() => <Home />} />
                <Route path='/products' render={() => <Products />} />
                <Route path='/login' render={() => <ShopLogin />} />
                <Route path='/cart' render={() => <Cart />} />
            </Router>
        </div>
    )
}

export default App