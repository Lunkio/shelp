import React from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import info2 from '../images/info2.jpg'
import work1 from '../images/work1.jpg'
import work2 from '../images/work2.jpg'
import work3 from '../images/work3.jpg'

const CustomerInfo = () => {
    return (
        <div className='container main'>
            <div className='info-first-section sections'>
                <div className='info-intro'>
                    <div className='info-first-section-header'>
                        <h1><b>The more you order, the more you save.</b></h1>
                    </div>
                    <p>
                        Our generous discounts on regular prices saves you 
                        money and not needing to visit many shops for offers
                        saves you time. And yeah, the fact that you also 
                        save products from ending up in the trash saves the world.
                    </p>
                    <div className='info-signup-btn'>
                        <Link to='/products'>
                            <button className='ui button'>Discover</button>
                        </Link>
                    </div>
                </div>
                <div className='info-intro-img'>
                    <div className='info-img-container'>
                        <img className='info-img' src={info2} alt='customer'/>
                    </div>
                </div>
            </div>
            <hr />
            <div className='info-second-section sections'>
                <div className='info-second-section-header'>
                    <h2><b>You are two minutes away from saving money and environment</b></h2>
                </div>
                <div className='info-workflow'>
                    <div className='info-workflow-img'>
                        <img src={work1} alt='workflow1'/>
                    </div>
                    <div className='info-workflow-header-text'>
                        <div className='info-workflow-header'>
                            <div className='info-workflow-nr'>1</div>
                            <h4><b>Find cheaper products near you</b></h4>
                        </div>
                        <div className='info-workflow-text'>
                            <p>
                                Whenever you visit Shelp website, 
                                you will see affordable quality products 
                                easily on a map and on a list. 
                                The offering consists of products with 
                                their expiration date closing in that usually 
                                have a 50% discount on regular prices. 
                                Just browse around and pick the most suitable 
                                offer for you.
                            </p>
                        </div>
                    </div>
                </div> <hr/>
                <div className='info-workflow'>
                    <div className='info-workflow-img'>
                        <img src={work2} alt='workflow2'/>
                    </div>
                    <div className='info-workflow-header-text'>
                        <div className='info-workflow-header'>
                            <div className='info-workflow-nr'>2</div>
                            <h4><b>Buy directly within the website</b></h4>
                        </div>
                        <div className='info-workflow-text'>
                            <p>
                                Purchase your desired product easily with 
                                your payment card or PayPal. 
                                You can also add multiple offers to your 
                                order if there's more than one mouth to feed.
                            </p>
                        </div>
                    </div>
                </div> <hr />
                <div className='info-workflow'>
                    <div className='info-workflow-img'>
                        <img src={work3} alt='workflow3'/>
                    </div>
                    <div className='info-workflow-header-text'>
                        <div className='info-workflow-header'>
                            <div className='info-workflow-nr'>3</div>
                            <h4><b>Pick it up before the closing time</b></h4>
                        </div>
                        <div className='info-workflow-text'>
                            <p>
                                Unlike food delivery apps, there's no 
                                waiting involved – Shelp orders are ready 
                                for pickup immediately after your order. 
                                You can choose to grab your products to go 
                                as you are passing by the grocery store.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CustomerInfo