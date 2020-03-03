import React from 'react'
import { Link } from 'react-router-dom'
import info1 from '../images/info1.jpg'
import revenue from '../images/revenue.svg'
import happy from '../images/happy.svg'
import earth from '../images/earth.svg'

const PartnerInfo = () => {
    return (
        <div className='container main'>
            <div className='info-first-section sections'>
                <div className='info-intro'>
                    <div className='info-first-section-header'>
                        <h1><b>Increase your revenue and reduce waste.</b></h1>
                    </div>
                    <p>Throwing away products is bad business. Running out of
                        products and having empty shelves is also bad business. 
                        Let us help you sell your surplus products and turn it 
                        into good business.
                    </p>
                    <div className='info-signup-btn'>
                        <Link to='/register'>
                            <button className='ui button'>Sign up</button>
                        </Link>
                    </div>
                    <div className='info-already-account'>
                        <h6><b>Already have an account? <Link className='info-login-link' to='/login'>Login in</Link></b></h6>
                    </div>
                </div>
                <div className='info-intro-img'>
                    <div className='info-img-container'>
                        <img className='info-img' src={info1} alt='shop'/>
                    </div>
                </div>
            </div>
            <hr />
            <div className='info-second-section sections'>
                <div className='info-second-section-header'>
                    <h2><b>Benefits of joining Shelp</b></h2>
                </div>
                <div className='info-benefits'>
                    <div className='first-benefit benefits'>
                        <div className='benefit-image-container'>
                            <img src={revenue} alt='revenue' />
                        </div>
                        <h4 className='benefit-header'>Increased revenue</h4>
                        <p>Shelp turns the lost revenue from your unsold products
                            into an extra revenue stream by bringing in 
                            customers who pay real money for your surplus products. 
                            One sold product brings on average 4 euros to your 
                            bank account – you'll do the math on what it means 
                            for your bottom line!
                        </p>
                    </div>
                    <div className='second-benefit benefits'>
                        <div className='benefit-image-container'>
                            <img src={happy} alt='happy' />
                        </div>
                        <h4 className='benefit-header'>New customers</h4>
                        <p>70% of our users have found new products and offers
                            while using Shelp. Selling surplus products with us 
                            doesn't cannibalize your regular sales, as buying 
                            Shelp products brings awareness and new
                            buying habits.
                        </p>
                    </div>
                    <div className='third-benefit benefits'>
                        <div className='benefit-image-container'>
                            <img src={earth} alt='earth' />
                        </div>
                        <h4 className='benefit-header'>Reduction of waste</h4>
                        <p>Following our best practices, you are likely to 
                            sell more than half of your surplus products 
                            with Shelp. Every product sold and not thrown 
                            away reduces unnecessary emissions caused by 
                            food production and shows you care about 
                            the environment.
                        </p>
                    </div>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default PartnerInfo