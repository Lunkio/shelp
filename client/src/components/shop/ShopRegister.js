import React, { useState } from 'react'
import { Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAlert } from '../../reducers/alertReducer'
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
    
    const [showIntroduction, setShowIntroduction] = useState(true)
    const [showAddress, setShowAddress] = useState(true)
    const [showAddressBtn, setShowAddressBtn] = useState(true)
    const [showLoginDetails, setShowLoginDetails] = useState(false)
    const [showLoginBtn, setShowLoginBtn] = useState(false)
    const [showShopDetails, setShowShopDetails] = useState(false)
    const [showDetailsBtn, setShowDetailsBtn] = useState(false)
    const [showRegisterBtn, setShowRegisterBtn] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [showOverview, setShowOverview] = useState(false)
    const [showProgress, setShowProgress] = useState(true)

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
            await shopsService.addNewShop(newShop)
            setShowSuccess(true)
            setShowAddress(false)
            setShowLoginDetails(false)
            setShowShopDetails(false)
            setShowRegisterBtn(false)
            setShowIntroduction(false)
            setShowProgress(false)
            props.initializeShops()
        } catch (error) {
            console.log('error', error)
            props.setAlert('Shop name already in use, please try with another name', 5)
        }
    }

    const handleAddressCheck = () => {
        if (address === '' || zip === '' || city === '') {
            props.setAlert('All the fields must be filled', 5)
        } else {
            setShowAddress(false)
            setShowAddressBtn(false)
            setShowLoginDetails(true)
            setShowLoginBtn(true)
        }
    }

    const handleLoginDetails = async () => {
        try {
            const shops = await shopsService.getAllShops()
            const shopNames = shops.map(s => s.name).map(n => n.toLowerCase())
            const lowerCaseName = name.toLowerCase()
            if (shopNames.includes(lowerCaseName)) {
                props.setAlert('Shop name already in use, please try with another name', 5)
                return
            }
        } catch (error) {
            console.log('error')
            props.setAlert('Something went wrong, please try again', 5)
        }
        if (name === '') {
            props.setAlert('Please type your shop name', 5)
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

    const goBackToAddress = () => {
        setShowAddress(true)
        setShowAddressBtn(true)
        setShowLoginDetails(false)
        setShowLoginBtn(false)
    }

    const goBackToDetails = () => {
        setShowLoginDetails(true)
        setShowLoginBtn(true)
        setShowShopDetails(false)
        setShowDetailsBtn(false)
    }

    const addressShow = { display: showAddress ? '' : 'none' }
    const addressBtnShow = { display: showAddressBtn ? '' : 'none' }

    const loginDetails = { display: showLoginDetails ? '' : 'none' }
    const loginDetailsBtnShow = { display: showLoginBtn ? '' : 'none' }

    const shopDetailsShow = { display: showShopDetails ? '' : 'none' }
    const detailsBtnShow = { display: showDetailsBtn ? '' : 'none' }

    const registerBtnShow = { display: showRegisterBtn ? '' : 'none' }
    const successShow = { display: showSuccess ? '' : 'none' }

    const introductionShow = { display: showIntroduction ? '' : 'none' }
    const overviewShow = { display: showOverview ? '' : 'none' }
    const progressShow = { display: showProgress ? '' : 'none' }

    const firstProgress = showAddressBtn ? 'progress-ball-active' : 'progress-ball-nonactive'
    const secondProgress = showLoginBtn ? 'progress-ball-active' : 'progress-ball-nonactive'
    const thirdProgress = showDetailsBtn ? 'progress-ball-active' : 'progress-ball-nonactive'
    const fourthProgress = showOverview ? 'progress-ball-active' : 'progress-ball-nonactive'
    
    return (
        <div className='container main register-container'>
            <div style={introductionShow}>
                <div className='goback-login-button'>
                    <Link to='/login'>
                        <button className='ui grey basic button'>Go back</button>
                    </Link>
                </div>
                <div className='register-header'>
                    <div>
                        <h2>Start selling with Shelp</h2>
                        <p>
                            Throwing food products away is bad business.
                            Let us help you sell your surplus products
                            and turn it into good business.
                        </p>
                        <p><b>Set up your Shelp account in just minutes
                            by following the next steps!</b>
                        </p><hr />
                    </div> 
                </div>
                <div className='register-progress' style={progressShow}>
                    <div className={firstProgress}></div>
                    <div className={secondProgress}></div>
                    <div className={thirdProgress}></div>
                    <div className={fourthProgress}></div>
                </div>
                <div className='register-overview' style={overviewShow}>
                    <h2>Overview</h2>
                    <h6>Check all the details and then press 'Submit' to register your Shop</h6>
                </div>
            </div>
            <form onSubmit={handleRegistration} className='row register-form'>
                {/* Shop location */}
                <div style={addressShow} className='row register-fields'>
                    <div className='register-question col-md-12' style={addressBtnShow}>
                        <h6><b>Where is your shop located?</b></h6>
                    </div>
                    <div className='col-md-12'>
                        <label htmlFor='shopAddress'>Address</label>
                        <input type='text' onChange={e => setAddress(e.target.value)} className='form-control register-field' placeholder='Address' id='shopAddress' required />
                    </div>
                    <div className='col-md-6'>
                        <label htmlFor='shopZip'>Zip Code</label>
                        <input type='text' onChange={e => setZip(e.target.value)} className='form-control register-field' placeholder='Zip Code' id='shopZip' required />
                    </div>
                    <div className='col-md-6'>
                        <label htmlFor='shopCity'>City</label>
                        <input type='text' onChange={e => setCity(e.target.value)} className='form-control register-field' placeholder='City' id='shopCity' required />
                    </div>
                    <div style={addressBtnShow} className='register-continue-button col-md-12'>
                        <div onClick={handleAddressCheck} className='ui basic teal button'>Continue</div>
                    </div>
                </div>
                {/* Login details */}
                <div style={loginDetails} className='row register-fields'>
                    <div className='register-question col-md-12' style={loginDetailsBtnShow}>
                        <h6><b>Please set your account details</b></h6>
                    </div>
                    <div className='col-md-12'>
                        <label htmlFor='shopName'>Shop Name (You will login with shop name once registered)</label>
                        <input type='text' onChange={e => setName(e.target.value)} className='form-control register-field' placeholder='Shop Name' id='shopName' required />
                    </div>
                    <div className='col-md-6'>
                        <label htmlFor='shopPsw'>Password</label>
                        <input type='password' onChange={e => setPassword(e.target.value)} className='form-control register-field' placeholder='Password' id='shopPsw' required />
                    </div>
                    <div className='col-md-6'>
                        <label htmlFor='shopPswAgain'>Password Again</label>
                        <input type='password' onChange={e => setPasswordAgain(e.target.value)} className='form-control register-field' placeholder='Password Again' id='shopPswAgain' required />
                    </div>
                    <div style={loginDetailsBtnShow} className='register-continue-button col-md-12'>
                        <div onClick={goBackToAddress} className='ui basic grey button'>Back</div>
                        <div onClick={handleLoginDetails} className='ui basic teal button'>Continue</div>
                    </div>
                </div>
                {/* Shop details */}
                <div style={shopDetailsShow} className='row register-fields'>
                    <div className='register-question col-md-12' style={detailsBtnShow}>
                        <h6><b>Please give your shop information</b></h6>
                    </div>
                    <div className='col-md-12'>
                        <label htmlFor='shopEmail'>Shop Email</label>
                        <input type='text' onChange={e => setEmail(e.target.value)} className='form-control register-field' placeholder='Email' id='shopEmail' required />
                    </div>
                    <div className='col-md-6'>
                        <label htmlFor='shopPhone'>Phone number</label>
                        <input type='text' onChange={e => setPhone(e.target.value)} className='form-control register-field' placeholder='Phone number' id='shopPhone' required />
                    </div>
                    <div className='col-md-6'>
                        <label htmlFor='shopWebsite'>Website (optional)</label>
                        <input type='text' onChange={e => setWebsite(e.target.value)} className='form-control register-field' placeholder='Website (optional)' id='shopWebsite' />
                    </div>
                    <div style={detailsBtnShow} className='register-continue-button col-md-12'>
                        <div onClick={goBackToDetails} className='ui basic grey button'>Back</div>
                        <div onClick={handleDetailsCheck} className='ui basic teal button'>Continue</div>
                    </div>
                </div>
                <div style={registerBtnShow} className='col-md-12 register-submit-button'>
                    <button id='submitBtn' type='submit' className='ui button'>Submit</button>
                </div>
                <div className='col-md-10 register-messages'>
                    {props.alert && <Message error header={props.alert} />}
                </div>
            </form>
            <div style={successShow} className='register-success'>
                <h2><b>{name}</b> is now registered!</h2>
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
        alert: state.alert
    }
}

const mapDispatchToProps = {
    setAlert,
    initializeShops
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShopRegister)