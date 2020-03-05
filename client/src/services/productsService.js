import axios from 'axios'

const url = '/api/products'

let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const destroyToken = () => {
    token = null
}

const getAllProducts = async () => {
    const response = await axios.get(url)
    return response.data
}

const addNewProduct = async (product) => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.post(url, product, config)
    return response.data
}

const updateProduct = async (id, product) => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.put(`${url}/${id}`, product, config)
    return response.data
}

const removeProduct = async (id) => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.delete(`${url}/${id}`, config)
    return response.data
}

const productAvailabilityToFalse = async (id, product) => {
    const productToFalse = { ...product, availability: false }
    const response = await axios.put(`${url}/availability/${id}`, productToFalse)
    return response.data
}

const productExpired = async (id) => {
    // const expiredToTrue = { ...product, expired: true }
    const response = await axios.put(`${url}/expired/${id}`)
    return response.data
}

const uploadImg = async (img) => {
    const response = await axios.post(`${url}/image`, img)
    return response.data
}

const removeImg = async (id) => {
    const response = await axios.delete(`${url}/images/${id}`)
    return response.data
}

export default { setToken, destroyToken, getAllProducts, addNewProduct, updateProduct, removeProduct, productAvailabilityToFalse, productExpired, uploadImg, removeImg }