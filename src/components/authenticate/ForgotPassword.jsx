import React,{useRef,useState} from 'react'
import Brand from '../utils/Brand'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {isEmail}  from '../../utils/validations'
import Alert from '@material-ui/lab/Alert'
import Fade from '@material-ui/core/Fade'
import CircularProgress from '../utils/CircularProgress'


function ForgotPassword (props){

    const email = useRef('')
    
    const [state,setstate] = useState({
        progress:false,
        error:{exist:false,msg:''},
        success:{exist:false,msg:''}
    })

    const clearError = ()=>setstate({...state,error:{exist:false,msg:''},success:{exist:false,msg:''}})

    const SuccessMessage = 'Password Reset Email has been scheduled.Check out your mail inbox.'

    const submitForm = (e)=>{
        if(isEmail(email.current.value)){
            setstate({...state,progress:true})
            axios.post('/forgotpassword',{
                email:email.current.value,
            },{withCredentials:true}).then(result => {
                switch(result.data.status){
                    case 200 : setstate({...state,progress:false,success:{exist:true,msg:SuccessMessage}});break;
                    case 422 : setstate({...state,progress:false,error:{exist:true,msg:'Your account is not verified yet.'}});break;
                    case 423 : setstate({...state,progress:false,error:{exist:true,msg:`validation error type : ${result.status.type}`}});break;
                    case 401 : setstate({...state,progress:false,error:{exist:true,msg:'Entered Email is not registered with us'}});break;
                    case 455 : setstate({...state,progress:false,error:{exist:true,msg:'Your account is set to inactive.'}});break;
                    case 500 : setstate({...state,progress:false,error:{exist:true,msg:'Something Went Wrong!'}});break;
                    default : console.log('default exec login')
                }
            }).catch( err => {
                setstate({...state,progress:false,error:{exist:true,msg:'Something Went Wrong!'}})
            })
        }else{
            setstate({...state,error:{exist:true,msg:'Invalid Email Address'}})
        }
        e.preventDefault()
    }

return (
        <form onSubmit={submitForm} className='col-12 col-lg-10 col-md-10 my-4'>
            <p className='ff-mst fmd col-12'><Brand className='light'/></p>
            <p className=' text-muted col-12  ff-mst'>Enter Registered Email Address</p>
            {(state.error.exist || state.success.exist)?
                <Fade in ={true}>
                    <div className='form-group col-12 col-md-10 col-lg-8'>
                        <Alert severity={(state.success.exist)?'success':'error'} variant='outlined' >
                            <span className='p-0 fsm ff-mst'>
                                {(state.success.exist)?state.success.msg:state.error.msg}
                            </span>
                        </Alert>
                    </div>
                </Fade>:<></>
            }
            <div className='form-group col-12 col-md-10 col-lg-8'>
                <label className='fsm text-pr'>Email</label>
                <input className='form-control' type='email' required ref={email} onFocus={clearError} />
            </div>
            <div className='form-group col-12 d-flex align-items-center '>
                {(state.progress)?
                    <div className='mr-3 fsm'><CircularProgress/></div>
                    :
                    <button className='btn  btn-3 mr-3' type='submit' disabled={state.progress || state.error.exist} onFocus={clearError} >Get Password Reset Link</button>
                }
            </div>
            <p className='fsm ff-mst col-12'>Already have an Account?<Link to='/login' className='fsm ff-mst text-decoration-none ml-2'>Login.</Link></p>
        </form>
)
}

export default ForgotPassword