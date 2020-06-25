import React,{useRef} from 'react'
import Brand from '../utils/Brand'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert'


function PasswordChange(props) {

    const pass = useRef('')
    const cnfpass = useRef('')

    const submitForm = (e)=>{
        e.preventDefault()
    }

return (
        <form onSubmit={submitForm} className='col-12 col-lg-10 col-md-10 my-4'>
            <p className='ff-mst fmd col-12'><Brand className='light'/></p>
            <p className=' text-muted col-12 ff-mst'>Create new password for your account.</p>
            <div className='d-flex flex-wrap'>
                <div className='form-group  col-12 col-md-6 col-lg-6'>
                    <label className='fsm text-pr'>Password</label>
                    <input className='form-control' type='password' ref={pass} required maxLength='25' minLength='8'/>
                </div>
                <div className='form-group col-12 col-md-6 col-lg-6'>
                    <label className='fsm text-pr'>Confirm Password</label>
                    <input className='form-control' type='password' ref={cnfpass} required maxLength='25' minLength='8'  />
                </div>
            </div>
            <div className='form-group col-12 d-flex align-items-center '>
                <button className='btn  btn-3 mr-3'>Reset Password</button>
            </div>
            <p className='fsm ff-mst col-12'>Remember Password?<Link to='/login' className='fsm ff-mst text-decoration-none ml-2'>Login.</Link></p>
        </form>
        )
}

export default PasswordChange