import React from 'react'
import { Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAlert } from '../../reducers/alertReducer'
import { setConfirm } from '../../reducers/confirmReducer'
import { initializeShops } from '../../reducers/shopsReducer'
import shopsService from '../../services/shopsService'

const ShopRegister = (props) => {

    const handleRegistration = async (event) => {
        event.preventDefault()
        event.persist()

        let name = event.target.name.value
        let email = event.target.email.value
        let password = event.target.password.value
        let passwordAgain = event.target.passwordAgain.value
        let address = event.target.address.value
        let zip = event.target.zip.value
        let city = event.target.city.value
        let phone = event.target.phone.value
        let latitude = event.target.latitude.value
        let longitude = event.target.longitude.value
        let website = event.target.website.value

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
            latitude: latitude,
            longitude: longitude,
            website: website
        }
        //console.log(newShop)
        try {
            const addedShop = await shopsService.addNewShop(newShop)
            event.target.name.value = ''
            event.target.email.value = ''
            event.target.password.value = ''
            event.target.passwordAgain.value = ''
            event.target.address.value = '' 
            event.target.zip.value = ''
            event.target.city.value = ''
            event.target.phone.value = ''
            event.target.latitude.value = null
            event.target.longitude.value = null
            event.target.website.value = ''
            props.initializeShops()
            props.setConfirm(`Success! ${addedShop.name} is now registered`, 5)
        } catch (error) {
            console.log('error', error)
            props.setAlert('Shop name already in use, please try with another name', 5)
        }
    }

    return (
        <div className='container main'>
            <div className='goback-login-button'>
                <Link to='/login'>
                    <button className='ui teal basic button'>Go back</button>
                </Link>
            </div>
            <div className='register-header'>
                <h1>Increase your revenue and reduce food waste.</h1>
                <p>
                    Throwing food products away is bad business.
                    Let us help you sell your surplus products
                    and turn it into good business.
                </p>
                <p><b>Set up your Shelp account in just minutes
                    by filling the form below!
                </b></p> <hr />
            </div>
            <form onSubmit={handleRegistration} className='row'>
                <div className='col-md-6'>
                    <label htmlFor='shopName'>Shop Name (You will login with shop name once registered)</label>
                    <input type='text' name='name' className='form-control register-field' placeholder='Shop Name' id='shopName' required />
                </div>
                <div className='col-md-6'>
                    <label htmlFor='shopEmail'>Shop Email</label>
                    <input type='text' name='email' className='form-control register-field' placeholder='Email' id='shopEmail' required />
                </div>
                <div className='col-md-6'>
                    <label htmlFor='shopPsw'>Password</label>
                    <input type='password' name='password' className='form-control register-field' placeholder='Password' id='shopPsw' required />
                </div>
                <div className='col-md-6'>
                    <label htmlFor='shopPswAgain'>Password Again</label>
                    <input type='password' name='passwordAgain' className='form-control register-field' placeholder='Password Again' id='shopPswAgain' required />
                </div>
                <div className='col-md-12'>
                    <label htmlFor='shopAddress'>Address</label>
                    <input type='text' name='address' className='form-control register-field' placeholder='Address' id='shopAddress' required />
                </div>
                <div className='col-md-6'>
                    <label htmlFor='shopZip'>Zip Code</label>
                    <input type='text' name='zip' className='form-control register-field' placeholder='Zip Code' id='shopZip' required />
                </div>
                <div className='col-md-6'>
                    <label htmlFor='shopCity'>City</label>
                    <input type='text' name='city' className='form-control register-field' placeholder='City' id='shopCity' required />
                </div>
                <div className='col-md-6'>
                    <label htmlFor='shopPhone'>Phone number</label>
                    <input type='text' name='phone' className='form-control register-field' placeholder='Phone number' id='shopPhone' required />
                </div>
                <div className='col-md-6'>
                    <label htmlFor='shopWebsite'>Website (optional)</label>
                    <input type='text' name='website' className='form-control register-field' placeholder='Website (optional)' id='shopWebsite' />
                </div>
                <div className='col-md-12 coordinates-info'>
                    <h6>If you want your shop to be shown on the map, you need to give latitude and longitude values.</h6>
                </div>
                <div className='col-md-12 coordinates-zone'>
                    <div className='col-md-6'>
                        <label htmlFor='shopLatitude'>Latitude (optional)</label>
                        <input type='text' name='latitude' className='form-control register-field' placeholder='Latitude (optional)' id='shopLatitude' />
                    </div>
                    <div className='col-md-6'>
                        <label htmlFor='shopLongitude'>Longitude (optional)</label>
                        <input type='text' name='longitude' className='form-control register-field' placeholder='Longitude (optional)' id='shopLongitude' />
                    </div>
                </div>
                <div className='col-md-12 register-messages'>
                    {props.confirm && <Message success header={props.confirm} />}
                    {props.alert && <Message error header={props.alert} />}
                </div>
                <div className='register-submit-button'>
                    <button id='submitBtn' type='submit' className='ui button'>Submit</button>
                </div>
            </form>
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