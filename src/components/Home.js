import React from 'react'
import { connect } from 'react-redux'
import SingleProduct from './SingleProduct'

const Home = (props) => {
    console.log(props)

    return (
        <div className='container main'>
            <div className='introduction'>
                <h1>Welcome to Shelp!</h1>
                <p>Here you can find the best offerings</p>
                <p>Tähän muuta selostusta</p>
                <div>
                    {props.products.map(product =>
                        <SingleProduct key={product.id} product={product}/>
                    )}
                </div>
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
    mapStateToProps,
)(Home)