import React from 'react'

const Modal = (props) => {
    return (
        <div className='modal-container'>
            <div className='img-modal-container' onClick={props.modalSwitch}>
                <img className='modal-img' src={props.img} alt='big product' onClick={props.modalSwitch}/>
                <button className='ui button modal-close-button' onClick={props.modalSwitch}>Close</button>
            </div>
        </div>
    )
}

export default Modal