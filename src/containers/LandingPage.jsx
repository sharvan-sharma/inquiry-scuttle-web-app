import React from 'react'
import Navbar from '../components/landing/Navbar'

export default function LandingPage(){
    return (
        <div className='d-flex full-screen-2 flex-column align-items-center bg-pr ' style={{height:'200vh'}}>
            <div className='col-12 col-lg-11 col-md-11'>
                <Navbar/>
            </div>
        </div>
    )
}