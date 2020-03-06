import React, { useState } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import SingleProduct from './SingleProduct'
import Footer from './Footer'

const Products = (props) => {
    console.log(props)
    const [selectedShops, setSelectedShops] = useState([])
    //console.log(selectedShop)
    if (selectedShops === null) {
        setSelectedShops([])
        return null
    }

    if (props.products.length === 0) {
        return (
            <div className='container main'>
                <div className='no-products-onsale'>
                    <h2>There are currently no products on sale, please check again later</h2>
                </div>
                <Footer />
            </div>
        )
    }

    // asettaa kauppojen nimet Select -valikon vaihtoehdoiksi
    let allShops = []
    allShops = props.shops.map(s => { return { value: s.name, label: s.name } })

    if (selectedShops.length === 0) {        
        return (
            <div className='container main'>
                <div>
                    <p>Search shop:</p>
                    <Select 
                        options={allShops}
                        placeholder='Select shop(s)'
                        onChange={setSelectedShops}
                        isMulti
                        isSearchable                    
                    />
                </div>
                <div>
                    {props.products
                        .filter(p => p.availability === true)
                        .map(p => <SingleProduct key={p.id} product={p}/>
                    )}
                </div>
                <Footer />
            </div>
        )
    } else {

        let filteredShops = []
        let shopNames = selectedShops.map(s => s.label)

        return (
            <div className='container main'>
                <div>
                    <p>Search shop:</p>
                    <Select 
                        options={allShops}
                        placeholder='Select shop(s)'
                        onChange={setSelectedShops}
                        isMulti
                        isSearchable                    
                    />
                </div>
                <div>
                    {shopNames.forEach(v => {
                            filteredShops = filteredShops.concat(props.products.filter(p => p.shop.name === v))
                            //console.log('filtered', filteredShops)
                        }                            
                    )}
                    {filteredShops
                        .filter(p => p.availability === true)
                        .map(p => <SingleProduct key={p.id} product={p}/>
                    )}
                </div>
                {filteredShops.length === 0 &&
                    <div className='no-shop-results'>
                        <h1>No search results...</h1>
                        <h6>Try with different shop(s)</h6>
                    </div>
                }
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
        shops: state.shops
    }
}

export default connect(
    mapStateToProps
)(Products)