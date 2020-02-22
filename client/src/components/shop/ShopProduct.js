import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setAlert } from '../../reducers/alertReducer'
import { setConfirm } from '../../reducers/confirmReducer'
import { initializeProducts } from '../../reducers/productsReducer'
import productsService from '../../services/productsService'

const ShopProduct = (props) => {
    //console.log(props)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(1)
    const [uploadedImage, setUploadedImage] = useState(null)
    const [currentProduct, setCurrentProduct] = useState(null)

    const [showProducts, setShowProducts] = useState(true)
    const [showEdit, setShowEdit] = useState(false)

    const productsShow = { display: showProducts ? '' : 'none' }
    const editShow = { display: showEdit ? '' : 'none' }

    const close = () => {
        setShowEdit(false)
        setShowProducts(true)
    }

    const edit = (product) => {
        setShowProducts(false)
        setShowEdit(true)
        setName(product.description)
        setPrice(product.price)
        setCurrentProduct(product)
    }

    const editUploadHandler = (event) => { setUploadedImage(event.target.files[0]) }

    const handleProductEdit = async (event) => {
        event.preventDefault()

        const productForm = new FormData()
        productForm.append('img', uploadedImage)

        const editedProduct = {
            description: name,
            price: price,
            availability: true,
            shop: props.shopLogin.id
        }

        if (name === '') {
            props.setAlert('Product needs a name or a short description', 5)
            return
        }

        productsService.setToken(props.shopLogin.token)
        let imageId = currentProduct.img.id

        try {
            if (uploadedImage !== null) {
                await productsService.removeImg(currentProduct.img.id)
                const newImage = await productsService.uploadImg(productForm)
                imageId = newImage.id
            }
            editedProduct.img = imageId
            await productsService.updateProduct(currentProduct.id, editedProduct)
            props.initializeProducts()
            props.setConfirm('Product edited successfully!', 5)
            setShowProducts(true)
            setShowEdit(false)
        } catch (error) {
            console.log('error', error)
            props.setAlert('Could not edit product, please try again', 5)
        }
    }

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
            <div style={productsShow} className='row'>
                <div className='col-md-2'>
                    <div className='img-container'>
                        <img src={props.product.img.location} alt='product' id='img' />
                    </div>
                </div>
                <div className='col-md-6'>
                    <h4>{props.product.description}</h4>
                </div>
                <div className='col-md-2'>
                    <p>{props.product.price} €</p>
                </div>
                <div className='col-md-2'>
                    <div className='shop-product-buttons'>
                        <button id='editBtn' className='btn btn-info' onClick={() => edit(props.product)}>Edit</button>
                        <button id='deleteBtn' className='btn btn-danger' onClick={() => remove(props.product)}>Remove</button>
                    </div>
                </div>
            </div>

            {/* Edit Product */}
            <div style={editShow}>
                <form onSubmit={handleProductEdit}>
                    Name/description: <input type='text' id='editDesc' value={name} onChange={e => setName(e.target.value)} /> <br />
                    Price: <input type='number' id='editPrice' value={price} onChange={e => setPrice(e.target.value)} /> <br />                
                    Select image <input type='file' id='editImg' onChange={editUploadHandler} /> <br />
                    <button id='submitEditBtn' className='btn btn-info' type='submit'>Edit Product</button>
                </form>
                <div id='closeEditBtn' className='btn btn-info' onClick={close}>Close</div>
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
)(ShopProduct)