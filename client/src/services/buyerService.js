import axios from 'axios'

const baseUrl = '/api/buyers'

let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getAllBuyers = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const addBuyer = async (buyer) => {
    const response = await axios.post(baseUrl, buyer)
    return response.data
}

const removeBuyer = async (id) => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}

export default { setToken, getAllBuyers, addBuyer, removeBuyer }