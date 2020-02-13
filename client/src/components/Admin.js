import React from 'react'
import { connect } from 'react-redux'

const Admin = (props) => {
    return (
        <div className='container main'>
            <div>
                <h1>Shops</h1>
                {props.shops.map(shop => 
                    <h4 key={shop.id}>{shop.name}</h4>    
                )}
            </div>
            {/* <div>
                <h1>Products</h1>
            </div> */}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
        shops: state.shops
    }
}

export default connect(
    mapStateToProps
)(Admin)