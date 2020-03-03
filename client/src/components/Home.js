import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import SingleProduct from './SingleProduct'
import homeImg from '../images/background.jpeg'

const Home = (props) => {
    //console.log(props)
    const freshProducts = props.products.slice(0, 3)

    return (
        <div className='main'>
            <div className='home-image'>
                <img src={homeImg} alt='background' />
                <div className='introduction'>
                    <h1>Welcome to Shelp!</h1>
                    <p>
                        Every month, people like you use Shelp to save 
                        tens of thousands of food products from ending up 
                        in the trash bin. Buy cheaper and better,
                        saving the world has never tasted this good!
                    </p>
                    <div className='home-buttons'>
                        <div className='button-text'>
                            <Link to='/customerinfo'>
                                <button className='ui button'>Order</button>
                            </Link>
                            <p>
                                <b>Ordering</b> with Shelp saves you
                                hundreds of euros every year.
                            </p>
                        </div>
                        <div className='button-text'>
                            <Link to='/partnerinfo'>
                                <button className='ui button'>Sell</button>
                            </Link>
                            <p>
                                <b>Selling</b> with Shelp increases your
                                revenue by 2-6%.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='home-intro'>
                    <h3><b>Save as much as you can eat</b></h3>
                    <p>
                        For consumers, using Shelp means discovering
                        new products that grocery stores offer at 
                        around 50% discount and creating a more 
                        sustainable environment while at it.
                    </p> <hr />
                    <h2><b>Our freshest offers!</b></h2>
                    <div>
                        {freshProducts
                            .filter(p => p.availability === true)
                            .map(p => <SingleProduct key={p.id} product={p}/>
                        )}
                    </div> <br />
                    <p><strong>To discover more, see 
                        <span>
                            <Link to='/products' className='home-span-link'> "All Products"</Link>
                        </span>
                    </strong></p>
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