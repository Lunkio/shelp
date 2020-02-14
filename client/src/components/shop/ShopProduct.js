import React from 'react'

const ShopProduct = (props) => {

    return (
        <div>
            {props.product.description}
            {props.product.price}
        </div>
    )
}

export default ShopProduct