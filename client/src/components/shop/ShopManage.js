import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'
import shopsService from '../../services/shopsService'
import productsService from '../../services/productsService'
import { setAlert } from '../../reducers/alertReducer'
import { setConfirm } from '../../reducers/confirmReducer'
import { initializeProducts } from '../../reducers/productsReducer'
import { initializeShops } from '../../reducers/shopsReducer'

const ShopManage = (props) => {
    console.log(props)

    const remove = async () => {
        if (window.confirm(`ALERT! This will delete everything, including shop registration, there's no way back. Are you sure?`)) {
            shopsService.setToken(props.shopLogin.token)
            productsService.setToken(props.shopLogin.token)

            const shopProducts = props.products.filter(p => p.shop.id === props.shopLogin.id)
            console.log('shopProducts', shopProducts)
            try {
                for (let i = 0; i < shopProducts.length; i++) {
                    await productsService.removeProduct(shopProducts[i].id)
                    await productsService.removeImg(shopProducts[i].img.id)
                }
                await shopsService.removeShop(props.shopLogin.id)
                props.initializeProducts()
                props.initializeShops()
                productsService.destroyToken()
                shopsService.destroyToken()
                window.location.reload()
            } catch (error) {
                console.log('error', error)
                props.setAlert('Deletion was not successful, please try again', 5)
            }
        } else {
            return
        }
    }

    return (
        <div>
            <Message success content={props.confirm} />
            <Message error content={props.alert} />
            <div>
                <button id='deleteShop' className='btn btn-danger' onClick={remove}>Delete Everything</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        shopLogin: state.shopLogin,
        products: state.products,
        alert: state.alert,
        confirm: state.confirm
    }
}

const mapDispatchToProps = {
    setAlert,
    setConfirm,
    initializeProducts,
    initializeShops
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShopManage)