import React from 'react'
import { connect } from 'react-redux'
import SingleProduct from './SingleProduct'

const Products = (props) => {
    return (
        <div className='container main'>
            <div>
                {props.products.map(product => 
                    <SingleProduct key={product.id} product={product}/>
                )}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(
    mapStateToProps
)(Products)