import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setAlert } from '../../reducers/alertReducer'
import { setConfirm } from '../../reducers/confirmReducer'
import { initializeProducts } from '../../reducers/productsReducer'
import productsService from '../../services/productsService'

const ShopProduct = (props) => {
    //console.log(props)
    let productDiscount = 0
    const [name, setName] = useState('')
    const [price, setPrice] = useState(1)
    const [discount, setDiscount] = useState(productDiscount)
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

        //laskee alennus-%
        const result = price * discount
        const discountedPrice = Math.round((result + Number.EPSILON) * 100) / 100

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
        if (discount === 0) {
            props.setAlert('Please set discount %', 5)
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

    const buttonStyle1 = discount === 0.9 ? 'ui button selected-btn' : 'ui basic teal button not-selected-btn'
    const buttonStyle2 = discount === 0.8 ? 'ui button selected-btn' : 'ui basic teal button not-selected-btn'
    const buttonStyle3 = discount === 0.7 ? 'ui button selected-btn' : 'ui basic teal button not-selected-btn'
    const buttonStyle4 = discount === 0.6 ? 'ui button selected-btn' : 'ui basic teal button not-selected-btn'
    const buttonStyle5 = discount === 0.5 ? 'ui button selected-btn' : 'ui basic teal button not-selected-btn'
    const buttonStyle6 = discount === 0.4 ? 'ui button selected-btn' : 'ui basic teal button not-selected-btn'
    const buttonStyle7 = discount === 0.3 ? 'ui button selected-btn' : 'ui basic teal button not-selected-btn'
    const buttonStyle8 = discount === 0.2 ? 'ui button selected-btn' : 'ui basic teal button not-selected-btn'
    const buttonStyle9 = discount === 0.1 ? 'ui button selected-btn' : 'ui basic teal button not-selected-btn'

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
                        <button className='ui button edit-button' onClick={() => edit(props.product)}>Edit</button>
                        <button className='btn btn-danger' onClick={() => remove(props.product)}>Remove</button>
                    </div>
                </div>
            </div>

            {/* Edit Product */}
            <div style={editShow}>
                <form onSubmit={handleProductEdit}>
                    <hr />
                    <div className='form-group row product-edit-form'>
                        <label className='col-md-2 col-form-label'>Name/description:</label>
                        <div className='col-md-5'>
                            <input type='text' className='form-control' value={name} onChange={e => setName(e.target.value)} />
                        </div>
                    </div>
                    <div className='form-group row product-edit-form'>
                        <label className='col-md-2 col-form-label'>Price:</label>
                        <div className='col-md-5'>
                            <input type='number' className='form-control' value={price} onChange={e => setPrice(e.target.value)} />
                        </div>
                    </div>
                    <div className='form-group row product-edit-form'>
                        <label className='col-md-2 col form-label'>Discount %:</label>
                        <div className='col-md-5'>
                            <div className='discount-buttons'>
                                <div onClick={() => setDiscount(0.9)} className={buttonStyle1}>10 %</div>
                                <div onClick={() => setDiscount(0.8)} className={buttonStyle2}>20 %</div>
                                <div onClick={() => setDiscount(0.7)} className={buttonStyle3}>30 %</div>
                                <div onClick={() => setDiscount(0.6)} className={buttonStyle4}>40 %</div>
                                <div onClick={() => setDiscount(0.5)} className={buttonStyle5}>50 %</div>
                                <div onClick={() => setDiscount(0.4)} className={buttonStyle6}>60 %</div>
                                <div onClick={() => setDiscount(0.3)} className={buttonStyle7}>70 %</div>
                                <div onClick={() => setDiscount(0.2)} className={buttonStyle8}>80 %</div>
                                <div onClick={() => setDiscount(0.1)} className={buttonStyle9}>90 %</div>
                            </div>
                        </div>
                    </div>
                    <div className='form-group row'>
                        <label className='col-md-2 col-form-label'>Select image:</label>
                        <div className='col-md-3'>
                            <input type='file' onChange={editUploadHandler} />
                        </div>
                    </div>
                    <div className='edit-product-buttons'>
                        <div className='ui basic red button' onClick={close}>Cancel</div>
                        <button className='ui button' type='submit'>Edit Product</button>
                    </div>
                    <hr />
                </form>
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