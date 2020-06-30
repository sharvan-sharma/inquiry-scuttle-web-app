import React from 'react'
import Navbar from '../components/landing/Navbar'
import MidArea from '../components/landing/MidArea'

export default function LandingPage(){
    return (
        <>
        <div className='d-flex full-screen-2 flex-column align-items-center bg-pr ' style={{minHeight:'100vh'}}>
            <div className='col-12 col-lg-11 col-md-11'>
                <Navbar/>
                <MidArea/>
            </div>
        </div>
        <div className='d-flex justify-content-center align-items-center flex-column rounded p-4 col-12' >
                <p className='text-center text-dark ff-mst pt-4  fmd'>Our Customers</p>
                <div className='d-flex justify-content-center align-items-center '>
                    <div className='p-4'>
                        <a href='https://salesicon-crm.web.app'><img src='/images/partner/salesicon.jpg' className='img-fluid'/></a>
                    </div>
                    <div className='p-4'>
                        <a href='https://noteskeeper-md.web.app'><img src='/images/partner/noteskeeper.jpg' className='img-fluid'/></a>
                    </div>
                    <div className='p-4'>
                        <a href='https://scrypt-oauth.web.app'><img src='/images/partner/crypt.jpg' className='img-fluid'/></a>
                    </div>
                </div>
            </div>
        </>
    )
}