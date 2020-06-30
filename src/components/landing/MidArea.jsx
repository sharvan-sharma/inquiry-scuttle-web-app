import React from 'react'

export default function MidArea(){
    return (
        <div className='col-12 p-0 d-flex justify-content-center align-items-center' style={{minHeight:'60vh'}}>
            <div>
             <div style={{marginTop:'15vh'}}/>
             <div className='col-12 d-flex p-0' >
                <div className='col-12 col-md-6 col-lg-4 p-0'>
                    <div className='py-4'>
                        <p className='fxl text-white ff-mst'>Inquiry Management Service</p>
                        <p className='text-white'>
                            Service to handle the inquiries from inquiry forms on your Application.
                        </p>
                        <button className='btn btn-light rounded '>
                            Let' Get Started
                        </button>
                    </div>
                </div>
                <div className='col-12 col-md-6 col-lg-8 pc d-flex justify-content-end'>
                    <div className='col-12 col-md-10 col-lg-8'>
                        <img src='./images/dashboard.jpg' className='img-fluid rounded shadow-lg'/>
                    </div>
                    
                </div>
            </div>
            <div style={{marginTop:'10vh'}} />
            <div className='d-flex flex-wrap col-12 p-0 rounded shadow bg-white' style={{minHeight:'20vh'}}>
                <div className='col-12 col-md-6 col-lg-4 p-4'>
                    <p className='text-center fmd ff-mst'><b>Create project</b></p>
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
                    <p className='text-center fmd ff-mst'><b>Manage Inquires</b></p>
                    <p className='fsm ff-rbt text-center'>
                        Read Inquiries specific to each form and directly reply from the application.
                    </p>
                </div>
            </div>
            </div>
        </div>
       
    )
}