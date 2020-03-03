import React, { useState } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import SingleProduct from './SingleProduct'

const Products = (props) => {
    //console.log('PrOPS', props)
    const [selectedShops, setSelectedShops] = useState([])
    //console.log(selectedShop)
    if (selectedShops === null) {
        setSelectedShops([])
        return null
    }

    let allShops = []
    allShops = props.shops.map(s => { return { value: s.name, label: s.name } })
    //console.log(allShops)

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