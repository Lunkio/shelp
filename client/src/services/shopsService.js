import axios from 'axios'

const url = '/api/shops'

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

export default { getAllShops, addNewShop, editShop }