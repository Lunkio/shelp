import React, { useState } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import SingleProduct from './SingleProduct'

const Products = (props) => {
    //console.log(props)
    const [selectedShop, setSelectedShop] = useState([])
    console.log(selectedShop)

    let allShops = []
    allShops = props.shops.map(s => { return { value: s.name, label: s.name } })
    //console.log(allShops)

    if (selectedShop.length === 0) {
        return (
            <div className='container main'>
                <div>
                    <p>Search shop:</p>
                    <Select 
                        options={allShops}
                        placeholder='Select shop'
                        onChange={setSelectedShop}
                        isMulti
                        isSearchable                    
                    />
                </div>
                <div>
                    {props.products
                        .map(p => <SingleProduct key={p.id} product={p}/>
                    )}
                </div>
            </div>
        )
    } else {
        return (
            <div className='container main'>
                <div>
                    <p>Search shop:</p>
                    <Select 
                        options={allShops}
                        placeholder='Select shop'
                        onChange={setSelectedShop}
                        isMulti
                        isSearchable                    
                    />
                </div>
                <div>
                    {props.products
                        // .filter(p => p.shop.name === selectedShop.value)
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