import React from 'react'
import Navbar from '../components/landing/Navbar'
import MidArea from '../components/landing/MidArea'
import {Link} from 'react-router-dom'
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import CodeIcon from '@material-ui/icons/Code';
import TwitterIcon from '@material-ui/icons/Twitter';

export default function LandingPage(){
    return (
        <>
        <Navbar/>
        <div className='col-12 p-0 d-flex flex-column align-items-center bg-pr' >
            <div className='col-12 col-lg-11 col-md-11'> 
                <MidArea/>
            </div>
            <div className='d-flex bg-white justify-content-center align-items-center flex-column rounded p-4 col-12'  >
                <p className='text-center text-dark ff-mst pt-4  fmd'>Our Customers</p>
                <div className='d-flex flex-wrap justify-content-center align-items-center '>
                    <div className='p-4 col-12 col-md-4 col-lg-4 d-flex justify-content-center'>
                        <a href='https://salesicon-crm.web.app'>
                            <img src='/images/partner/salesicon.jpg' className='img-fluid'/>
                        </a>
                    </div>
                    <div className='p-4 col-12 col-md-4 col-lg-4 d-flex justify-content-center'>
                        <a href='https://noteskeeper-md.web.app'>
                            <img src='/images/partner/noteskeeper.jpg' className='img-fluid'/>
                        </a>
                    </div>
                    <div className='p-4 col-12 col-md-4 col-lg-4 d-flex justify-content-center'>
                        <a href='https://scrypt-oauth.web.app'>
                            <img src='/images/partner/crypt.jpg' className='img-fluid'/>
                        </a>
                    </div>
                </div>
            </div>
            <div className ='d-flex flex-wrap justify-content-center p-4 col-12 bg-black'   >
                <div className='col-12 col-md-4 col-lg-2 text-white my-2'>
                    <p className='ff-rbt'>
                        &copy; {(new Date()).getFullYear()}
                    </p>
                    <p className='fmd ff-mst'>
                        <b>I</b>nquiry
                        <b>S</b>cuttle
                    </p>
                </div>
                <div className='col-12 col-md-4 col-lg-2 my-2'>
                    <p className='ff-mst text-white-50'>Important Links</p>
                    <ul className='list-unstyled'>
                        <li><Link to='/login' className='text-decoration-none fsm text-white-50'>Dashboard</Link></li>
                        <li><Link to='/about' className='text-decoration-none fsm text-white-50'>About</Link></li>
                        <li><Link to='/contact'  className='text-decoration-none fsm text-white-50'>Contact</Link></li>
                    </ul>
                </div>
                <div className='col-12 col-md-4 col-lg-2 my-2'>
                    <p className='ff-mst text-white-50 d-flex align-items-center'>
                        <GitHubIcon fontSize='small' className='mr-2'/>
                        <span>Repository Links</span>
                    </p>
                    <ul className='list-unstyled'>
                        <li><a href='https://github.com/sharvan-sharma/Inquiry-Scuttle-Frontend-Application' className='text-decoration-none fsm text-white-50'>Frontend Application</a></li>
                        <li><a href='https://github.com/sharvan-sharma/Inquiry-Scuttle-backend-API' className='text-decoration-none fsm text-white-50'>Backend API</a></li>
                    </ul>
                </div>
                <div className='col-12 col-md-6 col-lg-4 my-2' >
                    <p className='ff-mst text-white-50 d-flex align-items-center'>
                        <CodeIcon fontSize='small' className='mr-2'/>
                        <span>{`Developer & Designer`}</span>
                    </p>
                    <p className='fsm text-white-50 mb-0'>Sharvan Sharma</p>
                    <ul className='list-unstyled d-flex flex-wrap text-white-50'>
                        <li>
                            <a href='https://github.com/sharvan-sharma' className='text-decoration-none fsm text-white-50'>
                                <GitHubIcon fontSize='small' className='mr-1'/>
                            </a>
                        </li>
                        <li>
                            <a href='https://www.linkedin.com/in/sharvan-sharma-b65452178/' className='text-decoration-none fsm text-white-50'>
                                <LinkedInIcon fontSize='small' className='mr-1'/>
                            </a>
                        </li>
                        <li>
                            <a href='https://twitter.com/Sharvan40875598' className='text-decoration-none fsm text-white-50'>
                                <TwitterIcon  fontSize='small' className='mr-1'/>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      
        </>
    )
}