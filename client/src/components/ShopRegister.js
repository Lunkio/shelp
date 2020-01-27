import React from 'react'

const ShopRegister = () => {

    const handleRegistration = (event) => {
        event.preventDefault()

        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value
        const passwordAgain = event.target.passwordAgain.value
        const address = event.target.address.value
        const zip = event.target.zip.value
        const city = event.target.city.value
        const phone = event.target.phone.value
        const website = event.target.website.value

        if (password !== passwordAgain) {
            window.alert('Password doesn\'t match, please check both password fields')
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
                <button type='submit' className='btn btn-primary'>Submit</button>
            </form>
        </div>
    )
}

export default ShopRegister