import axios from 'axios'

const url = '/api/shops'

let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const destroyToken = () => {
    token = null
}

const getAllShops = async () => {
    const response = await axios.get(url)
    return response.data
}

const addNewShop = async (shop) => {
    const response = await axios.post(url, shop)
    return response.data
}

const editShop = async (shop) => {
    const response = await axios.put(`${url}/${shop.id}`, shop)
    return response.data
}

const removeShop = async (id) => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.delete(`${url}/${id}`, config)
    return response.data
}

export default { setToken, destroyToken, getAllShops, addNewShop, editShop, removeShop }