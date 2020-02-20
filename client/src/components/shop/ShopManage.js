import React, { useState } from 'react'
import { connect } from 'react-redux'
import shopsService from '../../services/shopsService'
import productsService from '../../services/productsService'
import { setAlert } from '../../reducers/alertReducer'
import { setConfirm } from '../../reducers/confirmReducer'
import { initializeProducts } from '../../reducers/productsReducer'
import { initializeShops } from '../../reducers/shopsReducer'
import { logoutShop } from '../../reducers/shopLoginReducer'
import { loginShop } from '../../reducers/shopLoginReducer'

const ShopManage = (props) => {
    //console.log(props)    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [zip, setZip] = useState('')
    const [city, setCity] = useState('')
    const [phone, setPhone] = useState('')
    const [website, setWebsite] = useState('')

    const [showButtons, setShowButtons] = useState(true)
    const [showEdit, setShowEdit] = useState(false)

    const buttonsShow = { display: showButtons ? '' : 'none' }
    const editShow = { display: showEdit ? '' : 'none' }

    const edit = (shop) => {
        setShowEdit(true)
        setShowButtons(false)
        setName(shop.name)
        setEmail(shop.email)
        setAddress(shop.address)
        setZip(shop.zip)
        setCity(shop.city)
        setPhone(shop.phone)
        setWebsite(shop.website)
    }

    const close = () => {
        setShowEdit(false)
        setShowButtons(true)
    }

    const handleEdit = async (event) => {
        event.preventDefault()
        shopsService.setToken(props.shopLogin.token)

        const editedShop = {
            id: props.shopLogin.id,
            name,
            email,
            address,
            zip,
            city,
            phone,
            website
        }
        const newShopLogin = JSON.parse(JSON.stringify(props.shopLogin))
        newShopLogin.name = editedShop.name

        try {
            await shopsService.editShop(editedShop)
            props.loginShop(newShopLogin)
            props.initializeShops()
            props.setConfirm('Shop details updated successfully!', 5)
        } catch (error) {
            console.log('error', error)
            props.setAlert('Shop details were not edited, please try again', 5)
        }
    }

    const remove = async () => {
        if (window.confirm(`ALERT! This will delete everything, including shop registration, there's no way back. Are you sure?`)) {
            shopsService.setToken(props.shopLogin.token)
            productsService.setToken(props.shopLogin.token)

            const shopProducts = props.products.filter(p => p.shop.id === props.shopLogin.id)
            try {
                for (let i = 0; i < shopProducts.length; i++) {
                    await productsService.removeProduct(shopProducts[i].id)
                    await productsService.removeImg(shopProducts[i].img.id)
                }
                await shopsService.removeShop(props.shopLogin.id)
                props.initializeProducts()
                props.initializeShops()
                productsService.destroyToken()
                shopsService.destroyToken()
                props.logoutShop()
            } catch (error) {
                console.log('error', error)
                props.setAlert('Deletion was not successful, please try again', 5)
            }
        } else { return }
    }

    const shop = props.shops.find(s => s.id === props.shopLogin.id)

    return (
        <div>
            <div>
                <div>
                    <div style={editShow}>
                        <h3>Edit shop details</h3>
                        <form onSubmit={handleEdit} className='row'>
                            <div className='col-md-6'>
                                <label htmlFor='newName'>Shop Name</label>
                                <input type='text' value={name} onChange={e => setName(e.target.value)} className='form-control' id='newName' required />
                            </div>
                            <div className='col-md-6'>
                                <label htmlFor='editEmail'>Shop email</label>
                                <input type='text' value={email} onChange={e => setEmail(e.target.value)} className='form-control' id='editEmail' required />
                            </div>
                            <div className='col-md-12'>
                                <label htmlFor='editAddress'>Address</label>
                                <input type='text' value={address} onChange={e => setAddress(e.target.value)} className='form-control' id='editAddress' required />
                            </div>
                            <div className='col-md-6'>
                                <label htmlFor='shopZip'>Zip Code</label>
                                <input type='text' value={zip} onChange={e => setZip(e.target.value)} className='form-control' id='editZip' required />
                            </div>
                            <div className='col-md-6'>
                                <label htmlFor='editCity'>City</label>
                                <input type='text' value={city} onChange={e => setCity(e.target.value)} className='form-control' id='editCity' required />
                            </div>
                            <div className='col-md-6'>
                                <label htmlFor='editPhone'>Phone number</label>
                                <input type='text' value={phone} onChange={e => setPhone(e.target.value)} className='form-control' id='editPhone' required />
                            </div>
                            <div className='col-md-6'>
                                <label htmlFor='editWebsite'>Website (optional)</label>
                                <input type='text' value={website} onChange={e => setWebsite(e.target.value)} className='form-control' id='editWebsite' />
                            </div>
                            <button id='submitEditBtn' type='submit' className='btn btn-primary'>Submit changes</button>
                        </form>
                        <div className='btn btn-info' onClick={close}>Close</div>
                    </div>
                </div>
                <div style={buttonsShow}>
                    <button id='editShop' className='btn btn-info' onClick={() => edit(shop)}>Edit Shop Details</button>
                    <button id='deleteShop' className='btn btn-danger' onClick={remove}>Delete Everything</button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        shopLogin: state.shopLogin,
        products: state.products,
        shops: state.shops
    }
}

const mapDispatchToProps = {
    setAlert,
    setConfirm,
    initializeProducts,
    initializeShops,
    logoutShop,
    loginShop
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShopManage)