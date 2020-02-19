import React from 'react'
import { connect } from 'react-redux'
import SingleProduct from './SingleProduct'

const Home = (props) => {
    //console.log(props)

    return (
        <div className='container main'>
            <div className='introduction'>
                <h1>Welcome to Shelp!</h1>
                <p>Here you can find the best offerings</p>
                <p>Tähän muuta selostusta</p>
                <h2>Fresh offers!</h2>
                <div>
                    {props.products
                        .filter(p => p.availability === true)
                        .map(p => <SingleProduct key={p.id} product={p}/>
                    )}
                </div>
                <p><strong>To see more, see "All Products"</strong></p>
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