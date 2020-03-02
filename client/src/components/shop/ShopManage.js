import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import shopsService from '../../services/shopsService'
import productsService from '../../services/productsService'
import { setAlert } from '../../reducers/alertReducer'
import { setConfirm } from '../../reducers/confirmReducer'
import { initializeProducts } from '../../reducers/productsReducer'
import { initializeShops } from '../../reducers/shopsReducer'
import { logoutShop } from '../../reducers/shopLoginReducer'
import { loginShop } from '../../reducers/shopLoginReducer'
import ReactMapGL, { Marker } from 'react-map-gl'

const ShopManage = (props) => {
    //console.log(props)    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [zip, setZip] = useState('')
    const [city, setCity] = useState('')
    const [phone, setPhone] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [website, setWebsite] = useState('')

    const [showButtons, setShowButtons] = useState(true)
    const [showEdit, setShowEdit] = useState(false)
    const [showMap, setShowMap] = useState(false)
    const [view, setView] = useState({
        latitude: 60.169857,
        longitude: 24.938379,
        width: '20vw',
        height: '38vh',
        zoom: 15
    })

    useEffect(() => {
        setView({
            latitude: latitude,
            longitude: longitude,
            width: '20vw',
            height: '38vh',
            zoom: 15
        })
    }, [latitude, longitude])

    const buttonsShow = { display: showButtons ? '' : 'none' }
    const editShow = { display: showEdit ? '' : 'none' }
    const mapShow = { display: showMap ? '' : 'none' }

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
        if (shop.latitude === null) {
            setLatitude('')
        } else { setLatitude(shop.latitude) }
        if (shop.longitude === null) {
            setLongitude('')
        } else { setLongitude(shop.longitude) }
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
            latitude,
            longitude,
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

    const getCoordinates = async () => {
        setShowMap(false)
        setLatitude('')
        setLongitude('')
        if (address === '' || zip === '' || city === '') {
            props.setAlert('To get the coordinates, please type shop\'s address, zip code and city', 5)
            return
        }
        const encodedAddress = encodeURI(`${address}, ${zip}, ${city}, Finland`)
        try {
            const result = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?types=address&access_token=${process.env.REACT_APP_MAPBOX}`)
            // tarkistaa että kyseinen osoite on olemassa, jos ei niin return
            if (result.data.features[0].relevance !== 1) {
                props.setAlert('Couldn\'t get the coordinates, please check that given address is correct. If this doesn\'t help, leave coordinate fields empty and contact us at support@shelp.fi', 10)
                return
            }
            setLatitude(result.data.features[0].center[1])
            setLongitude(result.data.features[0].center[0])
            setShowMap(true)
        } catch(error) {
            console.log('error', error)
            props.setAlert('Couldn\'t get the coordinates, please check that given address is correct. If this doesn\'t help, leave coordinate fields empty and contact us at support@shelp.fi', 10)
        }
    }

    const clearCoordinates = () => {
        setShowMap(false)
        setLatitude('')
        setLongitude('')
    }

    const shop = props.shops.find(s => s.id === props.shopLogin.id)

    return (
        <div>
            <div>
                <div style={editShow}>
                    <div className='edit-shop-header'>
                        <h3>Edit shop details</h3>
                        <div className='ui basic teal button' onClick={close}>Close</div>
                    </div>
                    <form onSubmit={handleEdit} className='row'>
                        <div className='col-md-6'>
                            <label htmlFor='newName'>Shop Name</label>
                            <input type='text' value={name} onChange={e => setName(e.target.value)} className='form-control edit-field' id='newName' required />
                        </div>
                        <div className='col-md-6'>
                            <label htmlFor='editEmail'>Shop email</label>
                            <input type='text' value={email} onChange={e => setEmail(e.target.value)} className='form-control edit-field' id='editEmail' required />
                        </div>
                        <div className='col-md-12'>
                            <label htmlFor='editAddress'>Address</label>
                            <input type='text' value={address} onChange={e => setAddress(e.target.value)} className='form-control edit-field' id='editAddress' required />
                        </div>
                        <div className='col-md-6'>
                            <label htmlFor='shopZip'>Zip Code</label>
                            <input type='text' value={zip} onChange={e => setZip(e.target.value)} className='form-control edit-field' id='editZip' required />
                        </div>
                        <div className='col-md-6'>
                            <label htmlFor='editCity'>City</label>
                            <input type='text' value={city} onChange={e => setCity(e.target.value)} className='form-control edit-field' id='editCity' required />
                        </div>
                        <div className='col-md-6'>
                            <label htmlFor='editPhone'>Phone number</label>
                            <input type='text' value={phone} onChange={e => setPhone(e.target.value)} className='form-control edit-field' id='editPhone' required />
                        </div>
                        <div className='col-md-6'>
                            <label htmlFor='editWebsite'>Website (optional)</label>
                            <input type='text' value={website} onChange={e => setWebsite(e.target.value)} className='form-control edit-field' id='editWebsite' />
                        </div>
                        <div className='col-md-12 coordinates-info'>
                            <h6>If you want your shop to be shown on the map, you need to give latitude and longitude values.
                                You need to fill at least "address", "zip code" and "city" fields to find the coordinates using 
                                "Get Coordinates" -button.
                            </h6>
                        </div>
                        <div className='coordinates-zone col-md-12'>
                            <div className='coordinates-fields'>
                                <div className='col-md-6'>
                                    <label htmlFor='editLatitude'>Latitude (optional)</label>
                                    <input type='text' value={latitude} onChange={e => setLatitude(e.target.value)} className='form-control edit-field' placeholder='Latitude (optional)' id='editLatitude' />
                                </div>
                                <div className='col-md-6'>
                                    <label htmlFor='editLongitude'>Longitude (optional)</label>
                                    <input type='text' value={longitude} onChange={e => setLongitude(e.target.value)} className='form-control edit-field' placeholder='Longitude (optional)' id='editLongitude' />
                                </div>
                            </div>
                            <div className='get-coordinates-map-container'>
                                <div className='left-of-register-map'>
                                    <div onClick={getCoordinates} className='ui teal button'>Get Coordinates</div>
                                    <div className='clear-coordinates-container' style={mapShow}>
                                        <p className='coordinates-text'>If the location is not correct on the map, clear the coordinates and 
                                        leave both latitude and longitude fields empty. Please contact us at <b>support@shelp.fi</b> for help.
                                        </p>
                                        <div onClick={clearCoordinates} className='ui basic red button'>Clear coordinates</div>
                                    </div>
                                </div>
                                {showMap && 
                                    <ReactMapGL
                                        className='register-map'
                                        {...view}
                                        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
                                        onViewportChange={view => { setView(view) }}
                                        mapStyle='mapbox://styles/lunkio/ck74chdp3094a1ip59po50vd1'
                                    >
                                        {showMap && 
                                            <Marker
                                                latitude={latitude}
                                                longitude={longitude}
                                            >
                                                <i className='fas fa-map-marker-alt map-marker-register'/>
                                            </Marker>
                                        }
                                    </ReactMapGL>
                                }
                            </div>
                        </div>
                        <div className='edit-submit-button'>
                            <button id='submitEditBtn' type='submit' className='ui button'>Submit changes</button>
                        </div>
                    </form>
                </div>
            </div>
            <div style={buttonsShow} className='zones-container'>
                <div className='edit-zone'>
                    <div>
                        <p><b>Edit shop details</b></p>
                        <p>Change and update your shop details</p>
                    </div>
                    <button id='editShop' className='btn btn-info' onClick={() => edit(shop)}>Edit Shop Details</button>
                </div> <hr />
                <div>
                    <h3>Danger Zone</h3>
                    <div className='danger-zone'>
                        <div>
                            <p><b>Delete everything</b></p>
                            <p>Once you delete this shop, everything including 
                                its products will be deleted forever.
                            </p>
                        </div>
                        <button id='deleteShop' className='btn btn-danger' onClick={remove}>Delete Everything</button>
                    </div>
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