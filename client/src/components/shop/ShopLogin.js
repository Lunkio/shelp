import React, { useState } from 'react'
import { connect } from 'react-redux'
import ShopLoggedIn from './ShopLoggedIn'
import { Link } from 'react-router-dom'
import { Message } from 'semantic-ui-react'
import loginService from '../../services/loginService'
import productsService from '../../services/productsService'
import { loginShop } from '../../reducers/shopLoginReducer'
import { setAlert } from '../../reducers/alertReducer'

const ShopLogin = (props) => {
    //console.log(props)
    const [passwordReveal, setPasswordReveal] = useState(true)

    const login = async (event) => {
        event.preventDefault()

        let name = event.target.name.value
        let password = event.target.password.value

        try {
            const shop = await loginService.login({ name, password })
            productsService.setToken(shop.token)
            props.loginShop(shop)

        } catch (error) {
            console.log('error', error)
            props.setAlert('Wrong username or password', 3)
        }
    }

    if (props.shopLogin) {
        return (
            <ShopLoggedIn />
        )
    }

    //paljastaa salasanan
    const passwordType = passwordReveal ? 'password' : 'text'
    const handlePasswordReveal = () => {
        if (passwordReveal) {
            setPasswordReveal(false)
        } else {
            setPasswordReveal(true)
        }
    }

    return (
        <div className='container main login-form'>
            <div className='login-header'>
                <h2>Login as Shelp Partner</h2>
            </div>
            <form onSubmit={login}>
                <div className='form-group'>
                    <label htmlFor='shopName'>Shop Name</label>
                    <input name='name' type='text' className='form-control' id='shopName' />
                </div>
                <div className='form-group'>
                    <label htmlFor='shopPassword'>Password</label>
                    <input name='password' type={passwordType} className='form-control' id='shopPassword' />
                </div>
                <div className='show-password'>
                    <input type='checkbox' onClick={handlePasswordReveal} id='showPassword'/>Show password
                </div>
                <div className='login-button'>
                    <button id='loginBtn' type='submit' className='ui button'>Login</button>
                </div>
            </form>
            <div className='info-message'>
                {props.alert && <Message error header={props.alert} />}
            </div>
            <div className='test-login-credentials'>
                <p className='test-credential-intro'>You can login with test credentials:</p>
                <p><i>Shop Name: <b>Test Shop</b></i></p>
                <p><i>Password: <b>bigsecret</b></i></p>
                <p>...or register your own shop by clicking <b>"Sign up"</b>.</p>
            </div>
            <div className='signup-container'>
                <p>Not yet a partner?</p>
                <Link to='register'>
                    <button className='ui grey basic button' data-testid='signup'>Sign up</button>
                </Link>
            </div>
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