import React, { useState } from 'react'
import { Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAlert } from '../../reducers/alertReducer'
import { setConfirm } from '../../reducers/confirmReducer'
import { initializeShops } from '../../reducers/shopsReducer'
import shopsService from '../../services/shopsService'

const ShopRegister = (props) => {
    const [address, setAddress] = useState('')
    const [zip, setZip] = useState('')
    const [city, setCity] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [passwordAgain, setPasswordAgain] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [website, setWebsite] = useState('')
    
    const [showAddress, setShowAddress] = useState(true)
    const [showAddressBtn, setShowAddressBtn] = useState(true)
    const [showLoginDetails, setShowLoginDetails] = useState(false)
    const [showLoginBtn, setShowLoginBtn] = useState(false)
    const [showShopDetails, setShowShopDetails] = useState(false)
    const [showDetailsBtn, setShowDetailsBtn] = useState(false)
    const [showRegisterBtn, setShowRegisterBtn] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [showOverview, setShowOverview] = useState(false)

    const handleRegistration = async (event) => {
        event.preventDefault()

        if (password !== passwordAgain || password === '' || passwordAgain === '') {
            props.setAlert('Please check that both passwords are identical and not empty', 5)
            return
        }

        const newShop = {
            name: name,
            email: email,
            password: password,
            address: address,
            zip: zip,
            city: city,
            phone: phone,
            // latitude: latitude,
            // longitude: longitude,
            website: website
        }
        //console.log(newShop)
        try {
            const addedShop = await shopsService.addNewShop(newShop)
            setShowSuccess(true)
            setShowAddress(false)
            setShowLoginDetails(false)
            setShowShopDetails(false)
            setShowRegisterBtn(false)
            props.initializeShops()
            props.setConfirm(`Success! ${addedShop.name} is now registered`, 5)
        } catch (error) {
            console.log('error', error)
            props.setAlert('Shop name already in use, please try with another name', 5)
        }
    }

    const handleAddressCheck = () => {
        if (address === '' || zip === '' || city === '') {
            props.setAlert('All the form fields must be filled', 5)
        } else {
            setShowAddress(false)
            setShowAddressBtn(false)
            setShowLoginDetails(true)
            setShowLoginBtn(true)
        }
    }

    const handleLoginDetails = () => {
        if (name === '') {
            props.setAlert('Shop must have a name', 5)
            return
        }
        if (password !== passwordAgain || password === '' || passwordAgain === '') {
            props.setAlert('Please check that both passwords are identical and not empty', 5)
            return
        }
        setShowLoginDetails(false)
        setShowLoginBtn(false)
        setShowShopDetails(true)
        setShowDetailsBtn(true)
    }

    const handleDetailsCheck = () => {
        if (email === '' || phone === '') {
            props.setAlert('Please provide at least shop\'s phone and email information', 5)
        } else {
            setShowDetailsBtn(false)
            setShowOverview(true)
            setShowAddress(true)
            setShowLoginDetails(true)
            setShowRegisterBtn(true)
        }
    }

    const addressShow = { display: showAddress ? '' : 'none' }
    const addressBtnShow = { display: showAddressBtn ? '' : 'none' }

    const loginDetails = { display: showLoginDetails ? '' : 'none' }
    const loginDetailsBtnShow = { display: showLoginBtn ? '' : 'none' }

    const shopDetailsShow = { display: showShopDetails ? '' : 'none' }
    const detailsBtnShow = { display: showDetailsBtn ? '' : 'none' }

    const registerBtnShow = { display: showRegisterBtn ? '' : 'none' }
    const successShow = { display: showSuccess ? '' : 'none' }

    const overviewShow = { display: showOverview ? '' : 'none' }

    
    return (
        <div className='container main register-form'>
            <div className='goback-login-button'>
                <Link to='/login'>
                    <button className='ui teal basic button'>Go back</button>
                </Link>
            </div>
            <div className='register-header'>
                <h2>Start selling with Shelp</h2>
                <p>
                    Throwing food products away is bad business.
                    Let us help you sell your surplus products
                    and turn it into good business.
                </p>
                <p><b>Set up your Shelp account in just minutes
                    by following the next steps!</b>
                </p> <hr />
            </div>
            <form onSubmit={handleRegistration} className='row'>
                {/* Shop location */}
                <div style={overviewShow}>
                    <h2>Overview</h2>
                </div>
                <div style={addressShow} className='row'>
                    <div className='col-md-12'>
                        <h5>Where is your shop located?</h5>
                    </div>
                    <div className='col-md-10'>
                        <label htmlFor='shopAddress'>Address</label>
                        <input type='text' onChange={e => setAddress(e.target.value)} className='form-control register-field' placeholder='Address' id='shopAddress' required />
                    </div>
                    <div className='col-md-5'>
                        <label htmlFor='shopZip'>Zip Code</label>
                        <input type='text' onChange={e => setZip(e.target.value)} className='form-control register-field' placeholder='Zip Code' id='shopZip' required />
                    </div>
                    <div className='col-md-5'>
                        <label htmlFor='shopCity'>City</label>
                        <input type='text' onChange={e => setCity(e.target.value)} className='form-control register-field' placeholder='City' id='shopCity' required />
                    </div>
                    <div style={addressBtnShow} className='register-address-button col-md-12'>
                        <div onClick={handleAddressCheck} className='ui button'>Continue</div>
                    </div>
                </div>
                {/* Login details */}
                <div style={loginDetails} className='row'>
                    <div className='col-md-12'>
                        <h5>Please set your account details</h5>
                    </div>
                    <div className='col-md-10'>
                        <label htmlFor='shopName'>Shop Name (You will login with shop name once registered)</label>
                        <input type='text' onChange={e => setName(e.target.value)} className='form-control register-field' placeholder='Shop Name' id='shopName' required />
                    </div>
                    <div className='col-md-5'>
                        <label htmlFor='shopPsw'>Password</label>
                        <input type='password' onChange={e => setPassword(e.target.value)} className='form-control register-field' placeholder='Password' id='shopPsw' required />
                    </div>
                    <div className='col-md-5'>
                        <label htmlFor='shopPswAgain'>Password Again</label>
                        <input type='password' onChange={e => setPasswordAgain(e.target.value)} className='form-control register-field' placeholder='Password Again' id='shopPswAgain' required />
                    </div>
                    <div style={loginDetailsBtnShow} className='register-logindetails-button col-md-12'>
                        <div onClick={handleLoginDetails} className='ui button'>Continue</div>
                    </div>
                </div>
                {/* Shop details */}
                <div style={shopDetailsShow} className='row'>
                    <div className='col-md-12'>
                        <h5>Please give your shop information</h5>
                    </div>
                    <div className='col-md-10'>
                        <label htmlFor='shopEmail'>Shop Email</label>
                        <input type='text' onChange={e => setEmail(e.target.value)} className='form-control register-field' placeholder='Email' id='shopEmail' required />
                    </div>
                    <div className='col-md-5'>
                        <label htmlFor='shopPhone'>Phone number</label>
                        <input type='text' onChange={e => setPhone(e.target.value)} className='form-control register-field' placeholder='Phone number' id='shopPhone' required />
                    </div>
                    <div className='col-md-5'>
                        <label htmlFor='shopWebsite'>Website (optional)</label>
                        <input type='text' onChange={e => setWebsite(e.target.value)} className='form-control register-field' placeholder='Website (optional)' id='shopWebsite' />
                    </div>
                    <div style={detailsBtnShow} className='register-detail-button col-md-12'>
                        <div onClick={handleDetailsCheck} className='ui button'>Continue</div>
                    </div>
                </div>
                <div style={registerBtnShow} className='register-submit-button'>
                    <button id='submitBtn' type='submit' className='ui button'>Submit</button>
                </div>
                
                <div className='col-md-10 register-messages'>
                    {props.confirm && <Message success header={props.confirm} />}
                    {props.alert && <Message error header={props.alert} />}
                </div>
            </form>
            <div style={successShow}>
                <h2>Your shop <b>{name}</b> is now registered!</h2>
                <h6>
                    You can 
                    <span>
                        <Link to='/login' className='home-span-link'> Login</Link>
                    </span> now.
                </h6>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        alert: state.alert,
        confirm: state.confirm
    }
}

const mapDispatchToProps = {
    setAlert,
    setConfirm,
    initializeShops
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShopRegister)