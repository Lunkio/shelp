import React from 'react'
import { Message } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { setAlert } from '../reducers/alertReducer'
import { setConfirm } from '../reducers/confirmReducer'
import { initializeShops } from '../reducers/shopsReducer'
import shopsService from '../services/shopsService'

const ShopRegister = (props) => {

    const handleRegistration = async (event) => {
        event.preventDefault()
        event.persist()

        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value
        const passwordAgain = event.target.passwordAgain.value
        const address = event.target.address.value
        const zip = event.target.zip.value
        const city = event.target.city.value
        const phone = event.target.phone.value
        const website = event.target.website.value

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
            event.target.website.value = ''
            props.initializeShops()
            props.setConfirm(`Success! ${addedShop.name} is now registered`, 3)
        } catch (error) {
            console.log('error', error)
            props.setAlert('Shop name already in use, please try with another name', 5)
        }
    }

    return (
        <div className='container main'>
            <form onSubmit={handleRegistration} className='row'>
                <div className='col-md-6'>
                    <label htmlFor='shopName'>Shop Name</label>
                    <input type='text' name='name' className='form-control' placeholder='Shop Name' id='shoName' required />
                </div>
                <div className='col-md-6'>
                    <label htmlFor='shopEmail'>Shop email</label>
                    <input type='text' name='email' className='form-control' placeholder='Email' id='shopEmail' required />
                </div>
                <div className='col-md-6'>
                    <label htmlFor='shopPsw'>Password</label>
                    <input type='password' name='password' className='form-control' placeholder='Password' id='shopPsw' required />
                </div>
                <div className='col-md-6'>
                    <label htmlFor='shopPswAgain'>Password Again</label>
                    <input type='password' name='passwordAgain' className='form-control' placeholder='Password Again' id='shopPswAgain' required />
                </div>
                <div className='col-md-12'>
                    <label htmlFor='shopAddress'>Address</label>
                    <input type='text' name='address' className='form-control' placeholder='Address' id='shopAddress' required />
                </div>
                <div className='col-md-6'>
                    <label htmlFor='shopZip'>Zip Code</label>
                    <input type='text' name='zip' className='form-control' placeholder='Zip Code' id='shopId' required />
                </div>
                <div className='col-md-6'>
                    <label htmlFor='shopCity'>City</label>
                    <input type='text' name='city' className='form-control' placeholder='City' id='shopCity' required />
                </div>
                <div className='col-md-6'>
                    <label htmlFor='shopPhone'>Phone number</label>
                    <input type='text' name='phone' className='form-control' placeholder='Phone number' id='shopPhone' required />
                </div>
                <div className='col-md-6'>
                    <label htmlFor='shopWebsite'>Website (optional)</label>
                    <input type='text' name='website' className='form-control' placeholder='Website (optional)' id='shopWebsite' />
                </div>
                <button id='submitBtn' type='submit' className='btn btn-primary'>Submit</button>
            </form>
            <Message success content={props.confirm} />  
            <Message error content={props.alert} />            
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