import React, { useState } from 'react'
import { connect } from 'react-redux'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { addToCart } from '../reducers/cartReducer'

const MapBox = (props) => {
    //console.log(props)
    const [clickedShop, setClickedShop] = useState(null)
    const [view, setView] = useState({
        latitude: 60.169857,
        longitude: 24.938379,
        width: '100vw',
        height: '100vh',
        zoom: 12
    })

    const checkIfInCart = (product) => {
        return props.cart.find(p => p.id === product.id)
    }

    const shopsWithProducts = props.shops.filter(s => s.latitude !== null || s.longitude !== null).filter(s => s.products.length > 0)
    const shopsWithoutProducts = props.shops.filter(s => s.latitude !== null || s.longitude !== null).filter(s => s.products.length === 0)

    return (
        <div className='main map-container'>
            <div className='map-side-window'>
                <div className='map-side-header'>
                    <h3>Fresh offers</h3>
                </div>
                {props.products.map(p =>
                    <div key={p.id}>
                        <div className='map-product-container'>
                            <div className='map-product-details'>
                                <h5><b>{p.description}</b></h5>
                                <p><i className='fas fa-store'/> {p.shop.name}</p>
                            </div>
                            <div className='map-price-cart-button'>
                                <div className='price-container'>
                                    <p><b>{p.price}</b> €</p>
                                    <h6 className='original-price'>{p.originalPrice} €</h6>
                                    <h5 className='discount'>-{p.discount}%</h5>
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
            {/* <div> */}
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
                                        setClickedShop(shop)
                                    }}
                                >
                                    <div className='marker-product-amount'><p>{shop.products.length}</p></div>
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
                                    setClickedShop(shop)
                                }}
                            />
                        </Marker>
                    )}

                    {clickedShop &&
                        <Popup 
                            latitude={clickedShop.latitude}
                            longitude={clickedShop.longitude}
                            onClose={() => setClickedShop(null)}
                        >
                            <div>
                                {clickedShop.name}
                            </div>
                        </Popup>
                    }
                </ReactMapGL>
            {/* </div> */}
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