import React from 'react'

const Footer = () => {
    return (
        <footer className='page-footer font-small footer'>
            <hr className='footer-hr' />
            <div className='footer-copyright'>© Shelp 2020</div>
            <div className='footer-contact row'>
                <div className='footer-email col-md-6 col-sm-6'>
                    <i className='fas fa-at footer-icon' />
                    <p> support@shelp.fi</p>
                </div>
                <div className='footer-phone col-md-6 col-sm-6'>
                    <i className='fas fa-phone-square footer-icon' />
                    <p> 050-12345678</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer