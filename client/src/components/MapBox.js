import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import ReactMapGL, { Marker } from 'react-map-gl'
import { addToCart } from '../reducers/cartReducer'
import { formatDate } from '../services/shared'

const MapBox = (props) => {
    //console.log(props)
    const [sideHeader, setSideHeader] = useState('Discover offers')
    const [showBack, setShowBack] = useState(false)
    const [showShop, setShowShop] = useState(false)
    const [showList, setShowList] = useState(true)
    const [showEmpty, setShowEmpty] = useState(false)
    const [showProducts, setShowProducts] = useState([])
    const [clickedShop, setClickedShop] = useState({
        address: 'none',
        zip: 'none',
        city: 'none',
        phone: 'none',
        website: 'none'
    })
    const [view, setView] = useState({
        latitude: 60.169857,
        longitude: 24.938379,
        width: '100vw',
        height: '100vh',
        zoom: 12
    })

    useEffect(() => {
        setShowProducts(props.products.filter(p => p.availability === true))
    }, [props.products])

    const shopsWithProducts = props.shops.filter(s => s.latitude !== null || s.longitude !== null).filter(s => s.products.length > 0)
    const shopsWithoutProducts = props.shops.filter(s => s.latitude !== null || s.longitude !== null).filter(s => s.products.length === 0)

    const handleShow = () => {
        setSideHeader('Discover offers')
        setShowBack(false)
        setShowShop(false)
        setShowList(true)
        setShowEmpty(false)
        setShowProducts(props.products.filter(p => p.availability === true))
    }
    
    const showShopProducts = (shop) => {
        setShowProducts(props.products.filter(p => p.shop.id === shop.id).filter(p => p.availability === true))
        setSideHeader(shop.name)
        setShowBack(true)
        setShowList(true)
        setShowEmpty(false)
    }

    const showShopDetails = (shop) => {
        setSideHeader(shop.name)
        setShowShop(true)
        setClickedShop(shop)
        setShowBack(true)
    }

    const showEmptyList = () => {
        setShowEmpty(true)
        setShowList(false)
    }

    const checkIfInCart = (product) => {
        return props.cart.find(p => p.id === product.id)
    }

    const handleClick = (shop) => {
        showShopProducts(shop)
        showShopDetails(shop)
    }

    let backShow = { visibility: showBack ? '' : 'hidden' }
    let shopShow = { display: showShop ? '' : 'none' }
    let listShow = { display: showList ? '' : 'none' }
    let emptyShow = { display: showEmpty ? '' : 'none' }

    return (
        <div className='main map-container'>
            <div className='map-side-window'>
                <div className='map-side-header'>
                    <div style={backShow} className='map-back-button' onClick={handleShow}>{`< Show all`}</div>
                    <h3>{sideHeader}</h3>
                </div>
                <div style={shopShow} className='map-shop-details'>
                    <div className='map-shop-address'>{clickedShop.address}, {clickedShop.zip} {clickedShop.city}</div>
                    <div className='map-shop-phone'><i className='fas fa-phone' /> {clickedShop.phone}</div>
                    <div className='map-shop-website'>{clickedShop.website !== '' && <span><i className='fas fa-globe' /> {clickedShop.website}</span>}</div>
                </div>
                <div className='map-no-products' style={emptyShow}>
                    <h5>This shop has currently no offers, please check again later</h5>
                </div>
                <div style={listShow}>
                    {showProducts.map(p =>
                        <div key={p.id}>
                            <div className='map-product-container'>
                                <div onClick={() => handleClick(p.shop)} className='map-product-details'>
                                    <div className='map-name-discount'>
                                        <h5><b>{p.description}</b></h5>
                                        <h5 className='map-discount'>-{p.discount}%</h5>
                                    </div>
                                    <p className='map-shop-name'><i className='fas fa-store'/> {p.shop.name}</p>
                                    <h6 className='map-expiration'>Expiration date: <span className='expiration-date'><b>{formatDate(p.date)}</b></span></h6>
                                </div>
                                <div className='map-price-cart-button'>
                                    <div className='map-price-container'>
                                        <div className='map-prices'>
                                            <h5>{p.price} €</h5>
                                            <h6 className='map-original-price'>{p.originalPrice} €</h6>
                                        </div>
                                    </div>
                                    <button
                                        className='ui button map-cart-button'
                                        disabled={checkIfInCart(p)}
                                        onClick={() => props.addToCart(p)}>
                                            {checkIfInCart(p) ? <p>In cart</p> : <p>Add to Cart</p>}
                                    </button>
                                </div>
                            </div>
                            <hr className='map-product-divider' />
                        </div>
                    )}
                </div>
            </div>
            <ReactMapGL
                className='map'
                {...view}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
                onViewportChange={view => { setView(view) }}
                mapStyle='mapbox://styles/lunkio/ck74chdp3094a1ip59po50vd1'
            >
                {shopsWithProducts.map(shop => 
                    <div key={shop.id}>
                        <Marker
                            latitude={shop.latitude}
                            longitude={shop.longitude}
                        >
                            <i 
                                className='fas fa-map-marker-alt map-marker-products'
                                onClick={e => {
                                    e.preventDefault()
                                    showShopProducts(shop)
                                    showShopDetails(shop)
                                }}
                            >
                                <div className='marker-product-amount'><p>{props.products.filter(p => p.shop.id === shop.id).filter(p => p.availability === true).length}</p></div>
                            </i>
                        </Marker>
                    </div>
                )}
                {shopsWithoutProducts.map(shop => 
                    <Marker 
                        key={shop.id}
                        latitude={shop.latitude}
                        longitude={shop.longitude}
                    >
                        <i 
                            className='fas fa-map-marker-alt map-marker-noProducts'
                            onClick={e => {
                                e.preventDefault()
                                showShopDetails(shop)
                                showEmptyList()
                            }}
                        />
                    </Marker>
                )}
            </ReactMapGL>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        shops: state.shops,
        products: state.products,
        cart: state.cart
    }
}

const mapDispatchToProps = {
    addToCart
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapBox)