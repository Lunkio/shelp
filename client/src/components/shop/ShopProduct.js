import React from 'react'

const ShopProduct = (props) => {

    return (
        <div>
            <h4>{props.product.description}</h4>
            <div className='img-container'>
                <img src={props.product.img.location} alt='product' id='img' />
            </div>
            <div>
                <p>{props.product.price}<b> €</b></p>
            </div>
        </div>
    )
}

export default ShopProduct