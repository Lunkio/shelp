import React from 'react'
import { Link } from 'react-router-dom'

const ShopLogin = () => {
    return (
        <div className='container main'>
            <div>
                <h3>Not yet registered?</h3>
                <Link to='register'>
                    <button className='btn btn-primary'>Register</button>
                </Link>
            </div>
            <form>
                <div className='form-group'>
                    <label htmlFor='shopid'>Shop id</label>
                    <input type='text' className='form-control' id='shopid' />
                </div>
                <div className='form-group'>
                    <label htmlFor='shopPassword'>Password</label>
                    <input type='password' className='form-control' id='shopPassword' />
                </div>
            </form>
        </div>
    )
}

export default ShopLogin