import React from 'react'
import {Link } from 'react-router-dom'

export default function Page404 () {
    return (
        <div className='d-flex col-12 bg-pr justify-content-center full-screen-2 align-items-center'>
            <div className='col-12 col-md-8 col-lg-6 d-flex flex-column align-items-center justify-content-center'>
                <div className='col-12'>
                    <p className='ff-mst text-white text-center' style={{fontSize:'4rem'}}><b>404</b></p>
                    <p className='ff-rbt text-white flg text-center'>We think you've lost</p>
                </div>
                <div className='col-12 d-flex flex-column justify-content-center p-2'>
                    <p className='text-white text-center'>The requested resource doesn't belong to us.</p>
                    <div className='d-flex justify-content-center'>
                        <Link to='/' className='btn btn-light ff-rbt'>Let's back to <b>I</b>nquiry <b>S</b>cuttle</Link>
                    </div>
               </div>
            </div>
        </div>
    )
}