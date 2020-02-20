import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setAlert } from '../../reducers/alertReducer'
import { setConfirm } from '../../reducers/confirmReducer'
import { initializeProducts } from '../../reducers/productsReducer'
import productsService from '../../services/productsService'

const ShopAddProduct = (props) => {
    //console.log(props)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(1)
    const [uploadedImage, setUploadedImage] = useState(null)

    const uploadHandler = (event) => { setUploadedImage(event.target.files[0]) }

    const handleNewProduct = async (event) => {
        event.preventDefault()

        const productForm = new FormData()
        productForm.append('img', uploadedImage)

        const newProduct = {
            description: name,
            price: price,
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
            setUploadedImage(null)
            props.initializeProducts()
            props.setConfirm(`Product ${addedProduct.description} added successfully!`, 3)            
        } catch (error) {
            console.log('error', error)
            props.setAlert('Product wasn\'t added, please try again', 5)
            await productsService.deleteImg(imageId)
        }
    }

    return (
        <div>
            <form onSubmit={handleNewProduct}>
                Name/description: <input type='text' id='desc' value={name} onChange={e => setName(e.target.value)} /> <br />
                Price: <input type='number' id='price' value={price} onChange={e => setPrice(e.target.value)} /> <br />                
                Select image <input type='file' id='img' onChange={uploadHandler} /> <br />
                <button id='submitBtn' className='btn btn-info' type='submit'>Upload</button>
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
    initializeProducts
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShopAddProduct)