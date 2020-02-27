import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setAlert } from '../../reducers/alertReducer'
import { setConfirm } from '../../reducers/confirmReducer'
import { initializeProducts } from '../../reducers/productsReducer'
import { initializeShops } from '../../reducers/shopsReducer'
import productsService from '../../services/productsService'

const ShopAddProduct = (props) => {
    //console.log(props)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(1)
    const [discount, setDiscount] = useState(0)
    const [uploadedImage, setUploadedImage] = useState(null)
    //console.log('uploadedimage', uploadedImage)

    const uploadHandler = (event) => { setUploadedImage(event.target.files[0]) }

    const handleNewProduct = async (event) => {
        event.preventDefault()

        const productForm = new FormData()
        productForm.append('img', uploadedImage)

        //laskee alennus-%
        const result = price * (1 - discount)
        let discountedPrice = Math.round((result + Number.EPSILON) * 100) / 100
        let discountToInt = discount * 100

        if (discount === 0) { 
            discountedPrice = price
            discountToInt = 0
        }

        const newProduct = {
            description: name,
            price: discountedPrice,
            discount: discountToInt,
            originalPrice: price,
            availability: true,
            shop: props.shopLogin.id
        }

        if (name === '') {
            props.setAlert('Product needs a name or a short description', 5)
            return
        }

        let imageId = ''
        productsService.setToken(props.shopLogin.token)

        try {
            const addedImg = await productsService.uploadImg(productForm)
            //console.log('addedImg', addedImg)
            imageId = addedImg.id
            newProduct.imgId = addedImg.id
            const addedProduct = await productsService.addNewProduct(newProduct)
            setName('')
            setPrice(1)
            //setUploadedImage(null)
            setDiscount(0)
            props.initializeProducts()
            props.initializeShops()
            props.setConfirm(`Product ${addedProduct.description} added successfully!`, 3)            
        } catch (error) {
            console.log('error', error)
            props.setAlert('Product wasn\'t added, please try again', 5)
            await productsService.deleteImg(imageId)
        }
    }

    const buttonStyle0 = discount === 0 ? 'ui button selected-btn' : 'ui basic teal button not-selected-btn'
    const buttonStyle1 = discount === 0.1 ? 'ui button selected-btn' : 'ui basic teal button not-selected-btn'
    const buttonStyle2 = discount === 0.2 ? 'ui button selected-btn' : 'ui basic teal button not-selected-btn'
    const buttonStyle3 = discount === 0.3 ? 'ui button selected-btn' : 'ui basic teal button not-selected-btn'
    const buttonStyle4 = discount === 0.4 ? 'ui button selected-btn' : 'ui basic teal button not-selected-btn'
    const buttonStyle5 = discount === 0.5 ? 'ui button selected-btn' : 'ui basic teal button not-selected-btn'
    const buttonStyle6 = discount === 0.6 ? 'ui button selected-btn' : 'ui basic teal button not-selected-btn'
    const buttonStyle7 = discount === 0.7 ? 'ui button selected-btn' : 'ui basic teal button not-selected-btn'
    const buttonStyle8 = discount === 0.8 ? 'ui button selected-btn' : 'ui basic teal button not-selected-btn'
    const buttonStyle9 = discount === 0.9 ? 'ui button selected-btn' : 'ui basic teal button not-selected-btn'

    return (
        <div>
            <form onSubmit={handleNewProduct}>
                <div className='form-group row product-edit-form'>
                    <label className='col-md-2 col-form-label'>Name/description:</label>
                    <div className='col-md-5'>
                        <input type='text' className='form-control' id='desc' value={name} onChange={e => setName(e.target.value)} />
                    </div>
                </div>
                <div className='form-group row product-edit-form'>
                    <label className='col-md-2 col-form-label'>Price:</label>
                    <div className='col-md-5'>
                        <input type='number' className='form-control' id='price' value={price} onChange={e => setPrice(e.target.value)} />
                    </div>
                </div>
                <div className='form-group row product-edit-form'>
                    <label className='col-md-2 col form-label'>Discount %:</label>
                    <div className='col-md-5'>
                        <div className='discount-buttons'>
                            <div onClick={() => setDiscount(0)} className={buttonStyle0}>0 %</div>
                            <div onClick={() => setDiscount(0.1)} className={buttonStyle1}>10 %</div>
                            <div onClick={() => setDiscount(0.2)} className={buttonStyle2}>20 %</div>
                            <div onClick={() => setDiscount(0.3)} className={buttonStyle3}>30 %</div>
                            <div onClick={() => setDiscount(0.4)} className={buttonStyle4}>40 %</div>
                            <div onClick={() => setDiscount(0.5)} className={buttonStyle5}>50 %</div>
                            <div onClick={() => setDiscount(0.6)} className={buttonStyle6}>60 %</div>
                            <div onClick={() => setDiscount(0.7)} className={buttonStyle7}>70 %</div>
                            <div onClick={() => setDiscount(0.8)} className={buttonStyle8}>80 %</div>
                            <div onClick={() => setDiscount(0.9)} className={buttonStyle9}>90 %</div>
                        </div>
                    </div>
                </div>
                <div className='form-group row'>
                    <label className='col-md-2 col-form-label'>Select image:</label>
                    <div className='col-md-3'>
                        <input type='file' id='img' onChange={uploadHandler} />
                    </div>
                </div>
                <div className='add-product-button'>
                    <button id='submitBtn' className='ui button' type='submit'>Upload</button>
                </div>
            </form>
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
    initializeProducts,
    initializeShops
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShopAddProduct)