import React from 'react'
import { connect } from 'react-redux'
import SingleProduct from './SingleProduct'
import homeImg from '../images/background.jpeg'

const Home = (props) => {
    //console.log(props)
    const freshProducts = props.products.slice(0, 3)

    return (
        <div className='main'>
            <div className='home-image'>
                <img src={homeImg} alt='background image' />
                <div className='introduction'>
                    <h1>Welcome to Shelp!</h1>
                    <p>Every month, people like you use Shelp to save 
                        tens of thousands of food products from ending up 
                        in the trash bin. Buy cheaper and better,
                        saving the world has never tasted this good!
                    </p>
                    <div className='home-buttons'>
                        <button className='ui button'>Discover</button>
                        <button className='ui button'>Start selling</button>
                    </div>
                </div>
            </div>
            <div className='container main'>
                <div className='home-products'>
                    <h2>Fresh offers!</h2>
                    <div>
                        {freshProducts
                            .filter(p => p.availability === true)
                            .map(p => <SingleProduct key={p.id} product={p}/>
                        )}
                    </div>
                    <p><strong>To see more, see "All Products"</strong></p>
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