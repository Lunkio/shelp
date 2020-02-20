import React, {useState, useEffect } from 'react'
import { connect } from 'react-redux'
import buyerService from '../../services/buyerService'
import productsService from '../../services/productsService'
import { setAlert } from '../../reducers/alertReducer'
import { setConfirm } from '../../reducers/confirmReducer'
import { initializeProducts } from '../../reducers/productsReducer'

const ShopBoughtProduct = (props) => {
    //console.log(props)
    const [buyers, setBuyers] = useState([])

    useEffect(() => {
        async function getData() {
            const allBuyers = await buyerService.getAllBuyers()
            setBuyers(allBuyers)
        }
        getData()
    }, [])

    if (buyers.length === 0) {
        return null
    }

    const buyer = buyers.find(b => {
        let ids = b.products.map(p => p.id)
        for (let i = 0; i < ids.length; i++) {
            if (ids[i] === props.product.id) {
                return b
            }
        }
        return null
    })
    //console.log(buyer)

    const handleRemove = async (product) => {
        productsService.setToken(props.shopLogin.token)
        try {
            await productsService.removeProduct(product.id)
            await productsService.removeImg(product.img.id)
            props.setConfirm('Bought product is now removed from database!', 5)
            props.initializeProducts()
        } catch (error) {
            console.log('error', error)
            props.setAlert('Product was not removed, please try again', 5)
        }
    }

    return (
        <div>
            <h4>{props.product.description}</h4>
            <div className='img-container'>
                <img src={props.product.img.location} alt='product' id='img' />
            </div>
            <div>
                <p>{props.product.price}<b> €</b></p>
            </div>
            <div>
                {buyer.firstName} {buyer.lastName}
            </div>
            <div>
                {/* <button id='editBtn' className='btn btn-info' onClick={() => edit(props.product)}>Edit</button> */}
                <button id='deleteBoughtBtn' className='btn btn-danger' onClick={() => handleRemove(props.product)}>Picked up/Remove</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        shopLogin: state.shopLogin
    }
}

const mapDispatchToProps = {
    setAlert,
    setConfirm,
    initializeProducts
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShopBoughtProduct)