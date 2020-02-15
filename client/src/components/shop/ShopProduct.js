import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'
import { setAlert } from '../../reducers/alertReducer'
import { setConfirm } from '../../reducers/confirmReducer'
import { initializeProducts } from '../../reducers/productsReducer'
import productsService from '../../services/productsService'

const ShopProduct = (props) => {
    //console.log(props)

    const remove = async (product) => {
        //console.log(product)
        productsService.setToken(props.shopLogin.token)
        try {
            await productsService.removeProduct(product.id)
            await productsService.removeImg(product.img.id)
            props.setConfirm('Product was removed!', 5)
            props.initializeProducts()
        } catch (error) {
            console.log('error', error)
            props.setAlert('Product was not removed, please try again', 5)
        }
    }

    return (
        <div>
            <Message success content={props.confirm} />
            <Message error content={props.alert} />
            <h4>{props.product.description}</h4>
            <div className='img-container'>
                <img src={props.product.img.location} alt='product' id='img' />
            </div>
            <div>
                <p>{props.product.price}<b> €</b></p>
            </div>
            <div>
                <button id='deleteBtn' className='btn btn-danger' onClick={() => remove(props.product)}>Remove</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        shopLogin: state.shopLogin,
        alert: state.alert,
        confirm: state.confirm
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
)(ShopProduct)