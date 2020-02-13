import React from 'react'

const ShopProduct = (props) => {

    return (
        <div>
            {props.product.description}
            {props.products.price}
        </div>
    )
}

export default ShopProduct