import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import SingleProduct from './SingleProduct'
import homeImg from '../images/background.jpeg'
import Footer from './Footer'

const Home = (props) => {
    //console.log(props)
    const [noProducts, setNoProducts] = useState(false)

    useEffect(() => {
        props.products.length === 0 ? setNoProducts(true) : setNoProducts(false)
    }, [props.products])

    // näyttää viisi tuotetta joiden expiration date kauimpana umpeutumisesta
    const productDatesAndId = props.products
        .filter(p => p.availability === true)
        .map(p => { return {date: new Date(p.date), id: p.id} })
        .sort((a,b) => b.date - a.date)
        .slice(0,5)

    let freshProducts = []
    for (let i = 0; i < productDatesAndId.length; i++) {
        freshProducts = freshProducts.concat(props.products.filter(p => p.id === productDatesAndId[i].id))
    }

    return (
        <div className='main container-fluid home-container'>
            <div className='home-header-image-container'>
                <div className='home-image-container'>
                    <img src={homeImg} alt='background'/>
                </div>
                <div className='introduction'>
                    <div>
                        <h1 className='introduction-header'>Welcome to Shelp!</h1>
                        <p className='introduction-text'>
                            Every month, people like you use Shelp to save 
                            tens of thousands of food products from ending up 
                            in the trash bin. Buy cheaper and better,
                            saving the world has never tasted this good!
                        </p>
                    </div>
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
            <div className='container home-intro-container'>
                <div className='home-intro'>
                    <h3><b>Save as much as you can eat</b></h3>
                    <p>
                        For consumers, using Shelp means discovering
                        new products that grocery stores offer at 
                        around 50% discount and creating a more 
                        sustainable environment while at it.
                    </p> <hr />
                    {/* Näyttää myynnissä olevat tuotteet */}
                    {!noProducts &&
                        <div>
                            <h2><b>Our freshest offers!</b></h2>
                            <div>
                                {freshProducts
                                    .map(p => <SingleProduct key={p.id} product={p}/>
                                )}
                            </div>
                            <p><strong>To discover more, see 
                                <span>
                                    <Link to='/products' className='home-span-link'> "All Products"</Link>
                                </span>
                            </strong></p>
                        </div>
                    }
                    {/* Näkymä jos ei tuotteita myynnissä */}
                    {noProducts &&
                        <div>
                            <h4><b>There are currently no products on sale, please check again later</b></h4>
                        </div>
                    }
                </div>
                <Footer />
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