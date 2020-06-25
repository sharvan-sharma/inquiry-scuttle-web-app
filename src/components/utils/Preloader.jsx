import React from 'react'
import Loader from 'react-loader-spinner'
import Brand from './Brand'

function Preloader () {
    return (
        <div className='full-screen d-flex flex-column bg-pr justify-content-center align-items-center'>
            <div className='fxl my-4'>
                <Brand color='dark' />
            </div>
            <Loader type="BallTriangle" color="white" height={50} width={50} />
        </div>
    )
}

export default Preloader