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

export default { setToken, destroyToken, getAllProducts, addNewProduct, updateProduct, removeProduct }