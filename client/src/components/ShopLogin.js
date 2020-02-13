import React from 'react'
import { connect } from 'react-redux'
import ShopLoggedIn from './ShopLoggedIn'
import { Link } from 'react-router-dom'
import { Message } from 'semantic-ui-react'
import loginService from '../services/loginService'
import productsService from '../services/productsService'
import { loginShop } from '../reducers/shopLoginReducer'
import { setAlert } from '../reducers/alertReducer'

const ShopLogin = (props) => {

    const login = async (event) => {
        event.preventDefault()

        let name = event.target.name.value
        let password = event.target.password.value

        try {
            const shop = await loginService.login({ name, password })

            window.localStorage.setItem(
                'loggedInShop', JSON.stringify(shop)
            )

            productsService.setToken(shop.token)
            console.log(shop)
            props.loginShop(shop)

        } catch (error) {
            props.setAlert('Wrong username or password', 3)
        }
    }

    if (props.shopLogin) {
        return (
            <ShopLoggedIn />
        )
    } 

    return (
        <div className='container main'>
            <div>
                <h3>Not yet registered?</h3>
                <Link to='register'>
                    <button className='btn btn-primary'>Register</button>
                </Link>
            </div>
            <Message error content={props.alert}/>
            <form onSubmit={login}>
                <div className='form-group'>
                    <label htmlFor='shopName'>Shop Name</label>
                    <input name='name' type='text' className='form-control' id='shopName' />
                </div>
                <div className='form-group'>
                    <label htmlFor='shopPassword'>Password</label>
                    <input name='password' type='password' className='form-control' id='shopPassword' />
                </div>
                <button id='loginBtn' type='submit' className='btn btn-primary'>Login</button>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        shopLogin: state.shopLogin,
        alert: state.alert
    }
}

const mapDispatchToProps = {
    loginShop,
    setAlert
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShopLogin)