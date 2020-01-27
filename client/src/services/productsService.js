import axios from 'axios'

const url = '/api/products'

const getAllProducts = async () => {
    const response = await axios.get(url)
    return response.data
}

export default { getAllProducts }