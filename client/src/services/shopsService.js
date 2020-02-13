import axios from 'axios'

const url = '/api/shops'

const getAllShops = async () => {
    const response = await axios.get(url)
    return response.data
}

export default { getAllShops }