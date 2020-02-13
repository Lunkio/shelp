import React, { useState } from 'react'

const ShopAddProduct = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)

    return (
        <div className='container main'>
            <form>
                Price: <input type='number' id='price' value={price} min='0.01' max='999' onChange={e => setPrice(e.target.value)} />
                Name/description: <input type='text' id='desc' value={name} onChange={e => setName(e.target.value)} />
                <button className='btn btn-info' type='submit'>Upload</button>
            </form>
        </div>
    )
}

export default ShopAddProduct