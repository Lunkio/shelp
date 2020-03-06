import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Loader } from 'semantic-ui-react'
import { setAlert } from '../../reducers/alertReducer'
import { setConfirm } from '../../reducers/confirmReducer'
import { initializeProducts } from '../../reducers/productsReducer'
import { initializeShops } from '../../reducers/shopsReducer'
import productsService from '../../services/productsService'
// import defaultImage from '../../images/defaultImage.jpg'

const ShopAddProduct = (props) => {
    //console.log(props)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(1)
    const [discount, setDiscount] = useState(0)
    const [amount, setAmount] = useState(1)
    const [uploadedImage, setUploadedImage] = useState(null)
    const [date, setDate] = useState('')
    //console.log('uploadedimage', uploadedImage)
    const [showLoader, setShowLoader] = useState(false)
    const [showForm, setShowForm] = useState(true)

    let currentTime = new Date()
    let currentDate = currentTime.toISOString().slice(0,10)

    useEffect(() => {
        setDate(currentDate)
    }, [currentDate])

    const uploadHandler = (event) => { setUploadedImage(event.target.files[0]) }

    const handleNewProduct = async (event) => {
        event.preventDefault()

        if (uploadedImage === null) {
            props.setAlert('Please add an image to the product', 5)
            return
        }

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
            date: date,
            availability: true,
            expired: false,
            shop: props.shopLogin.id
        }

        if (name === '') {
            props.setAlert('Product needs a name or a short description', 5)
            return
        }

        // tarkistaa että tuotteen pvm vähintään nykyinen pvm
        let currentTime = new Date()
        let formattedDate = new Date(date)
        formattedDate.setHours(23)
        formattedDate.setMinutes(59)
        formattedDate.setSeconds(59)
        if (currentTime > formattedDate) {
            props.setAlert('Expiration date must be at least current date', 5)
            return
        }

        let imageId = ''
        productsService.setToken(props.shopLogin.token)

        try {
            setShowForm(false)
            setShowLoader(true)
            for (let i = 0; i < amount; i++) {
                let addedImg = await productsService.uploadImg(productForm)
                //console.log('addedImg', addedImg)
                imageId = addedImg.id
                newProduct.imgId = addedImg.id
                await productsService.addNewProduct(newProduct)
            }
            setName('')
            setPrice(1)
            setDiscount(0)
            setAmount(1)
            setDate(currentDate)
            setShowLoader(false)
            setShowForm(true)
            props.initializeProducts()
            props.initializeShops()
            props.setConfirm(`Product(s) added successfully!`, 5)            
        } catch (error) {
            setShowLoader(false)
            setShowForm(true)
            console.log('error', error)
            props.setAlert('Product wasn\'t added, please try again', 5)
            await productsService.removeImg(imageId)
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

    const loaderShow = { display: showLoader ? '' : 'none' }
    const formShow = { display: showForm ? '' : 'none' }

    const handleDateTomorrow = () => {
        let today = new Date()
        let UNIXtomorrow = today.setDate(today.getDate() +1)
        let tomorrow = new Date(UNIXtomorrow).toISOString().slice(0,10)
        setDate(tomorrow)
    }

    const handleOneDay = () => {
        let dateNow = new Date(date)
        let UNIXdate = dateNow.setDate(dateNow.getDate() +1)
        let plusDay = new Date(UNIXdate).toISOString().slice(0,10)
        setDate(plusDay)
    }

    return (
        <div>
            <div className='loader' style={loaderShow}>
                <Loader active size='big' content='Please wait' />
            </div>
            <form onSubmit={handleNewProduct} style={formShow}>
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
                <div className='form-group row product-edit-form'>
                    <label className='col-md-2 col-form-label'>Select image:</label>
                    <div className='col-md-3'>
                        <input type='file' id='img' onChange={uploadHandler} />
                    </div>
                </div>
                <div className='form-group row product-edit-form'>
                    <label className='col-md-2 col-form-label'>How many?</label>
                    <div className='col-md-1'>
                        <input type='number' className='form-control' id='amount' value={amount} onChange={e => setAmount(e.target.value)} />
                    </div>
                </div>
                <div className='form-group row'>
                    <label className='col-md-2 col-form-label'>Expiration date:</label>
                    <div className='col-md-2'>
                        <input type='date' className='form-control' id='date' value={date} onChange={e => setDate(e.target.value)} />
                    </div>
                    <div className='col-md-3'>
                        <div onClick={handleDateTomorrow} className='ui basic teal button'>Tomorrow</div>
                        <div onClick={handleOneDay} className='ui basic teal button'>+1 Day</div>
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