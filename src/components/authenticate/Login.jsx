import React,{useRef,useState} from 'react'
import axios from 'axios'
import Brand from '../utils/Brand'
import {Link} from 'react-router-dom'
import {isEmail}  from '../../utils/validations'
import Alert from '@material-ui/lab/Alert'
import Fade from '@material-ui/core/Fade'
import {connect} from 'react-redux'
import {setCurrentUser} from '../../redux/user/user.actions'
import history from '../../history'
import CircularProgress from '../utils/CircularProgress'

function Login(props){

    const email = useRef('')
    const pass = useRef('')

    const [state,setstate] = useState({
        progress:false,
        error:{exist:false,msg:''}
    })

    const clearError = ()=>setstate({error:{exist:false,msg:''}})

    const submitForm = (e)=>{
        
        e.preventDefault()
        if(isEmail(email.current.value)){
            setstate({...state,progress:true})
            axios.post('/login',{
                email:email.current.value,
                password:pass.current.value
            },{withCredentials:true}).then(result => {
                switch(result.data.status){
                    case 200 : props.setCurrentUser(result.data);history.push('/');break;
                    case 422 : setstate({...state,progress:false,error:{exist:true,msg:'Your account is not verified yet.'}});break;
                    case 423 : setstate({...state,progress:false,error:{exist:true,msg:`validation error type : ${result.status.type}`}});break;
                    case 401 : setstate({...state,progress:false,error:{exist:true,msg:'Invalid Credentials'}});break;
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
    }

    return (
        <form onSubmit={submitForm} className='col-12 col-lg-10 col-md-10 my-4'>
            <p className='ff-mst fmd col-12'>Welcome! to <Brand className='light'/></p>
            <p className=' text-muted col-12 ff-mst'>Sign in to your account.</p>
            {(state.error.exist)?
                <Fade in ={true}>
                    <div className='form-group col-12 col-md-10 col-lg-8'>
                        <Alert severity='error' variant='outlined' >
                            <span className='p-0 fsm ff-mst'>{state.error.msg}</span>
                        </Alert>
                    </div>
                </Fade>:<></>
            }
            <div className='form-group col-12 col-md-10 col-lg-8'>
                <label className='fsm text-pr'>Email</label>
                <input className='form-control' type='email' required ref={email} onFocus={clearError} />
            </div>
            <div className='form-group  col-12 col-md-10 col-lg-8'>
                <label className='fsm text-pr'>Password</label>
                <input className='form-control' type='password' ref={pass} required maxLength='25' minLength='8' onFocus={clearError}/>
                <Link to='/forgotpassword' className='text-decoration-none fsm ff-mst'>Forgot password ?</Link>
            </div>
            <div className='form-group col-12 d-flex align-items-center '>
                {(state.progress)?
                    <div className='mr-3 fsm'><CircularProgress/></div>
                    :
                    <button className='btn  btn-3 mr-3' disabled={state.error.exist || state.progress} onFocus={clearError}>Sign in</button>
                }
                <span className='fsm text-muted mr-3'>or</span>
                <a href='https://inquiry-scuttle.herokuapp.com/auth/google'>
                    <img src='./images/tech_png/google.png' className='rounded-circle img-fluid' style={{width:'24px'}}/>
                </a>
            </div>
            <p className='fsm ff-mst col-12'>Don't have an Account?<Link to='/signup' className='text-decoration-none fsm ff-mst ml-2'>Signup.</Link></p>
        </form>
        )
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser : user => dispatch(setCurrentUser(user))
})

export default  connect(null,mapDispatchToProps)(Login);