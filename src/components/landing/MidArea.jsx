import React from 'react'
import {Link} from 'react-router-dom'

export default function MidArea(){
    return (
        <div className='col-12 p-0' >
            <div style={{marginTop:'15vh'}}/>
            <div className='col-12 d-flex flex-wrap-reverse p-0' >
                <div className='col-12 col-md-6 col-lg-4 p-0'>
                    <div className='py-4'>
                        <p className='fxl text-white ff-mst'>Inquiry Management Service</p>
                        <p className='text-white'>
                            Service to handle the inquiries from inquiry forms on your Application.
                        </p>
                        <Link to='/login' className='text-decoration-none btn btn-light rounded '>
                            Let' Get Started
                        </Link>
                    </div>
                </div>
                <div className='col-12 col-md-6 col-lg-8 d-flex justify-content-end p-0'>
                    <div className='col-12 col-md-10 col-lg-8 p-0'>
                        <img src='./images/dashboard2.jpg' className='img-fluid rounded shadow-lg'/>
                    </div>
                </div>
            </div>
            <div style={{marginTop:'10vh'}} />
            <div className='d-flex flex-wrap col-12 p-4 rounded shadow bg-white'>
                <div className='col-12 col-md-6 col-lg-4 p-4'>
                    <p className='text-center fmd ff-mst'><b>Create Projects</b></p>
                    <p className='fsm ff-rbt text-center'>
                        Create your application as project or create multiple projects for your application.
                    </p>
                </div>
                <div className='col-12 col-md-6 col-lg-4 p-4'>
                    <p className='text-center fmd ff-mst'><b>Add Forms</b></p>
                    <p className='fsm ff-rbt text-center'>
                        Add forms to your projects and use the credentials while creating Inquiry forms for your application.
                    </p>
                </div>
                <div className='col-12 col-md-6 col-lg-4 p-4'>
                    <p className='text-center fmd ff-mst'><b>Manage Inquiries</b></p>
                    <p className='fsm ff-rbt text-center'>
                        Read inquiries specific to each form and directly reply from the application.
                    </p>
                </div>
            </div>
            <div style={{marginBottom:'10vh'}} />
        </div>
       
    )
}