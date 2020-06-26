import React,{useEffect,useRef,useState} from 'react'
import Brand from '../utils/Brand'
import {Link} from 'react-router-dom'
import Alert from '@material-ui/lab/Alert'
import generatePasswordPower from '../../utils/generatePasswordPower'
import axios from 'axios'
import {checkName} from '../../utils/validations'
import isEmail from '../../utils/validations/isEmail'
import CircularProgress from '../utils/CircularProgress'

function Signup(){

    const fname = useRef('')
    const lname = useRef('')
    const email = useRef('')
    const pass = useRef('')
    const cnfpass = useRef('')

    const [state,setstate] = useState({
        progress:false,
        cnfpassword:{exist:0,msg:''},
        name:{exist:0,msg:''},
        email:{exist:0,msg:''},
        server:{
            error:{exist:false,msg:''},
            success:{exist:false,msg:''}
        }
    })

    const [meter,setmeter] = useState({
        exist:0,
        component:()=><></>
    })

    const clearError = (type)=>{
        switch(type){
            case 'name':setstate({...state,name:{exist:0,msg:''}});break;
            case 'email':setstate({...state,email:{exist:0,msg:''}});break;
            case 'password': setstate({...state,cnfpassword:{exist:0,msg:''}});break;
            case 'server' :setstate({...state, server:{error:{exist:false,msg:''},success:{exist:false,msg:''}}});break;
            default : console.log('clearError default exec')
        }
    }

    const submitForm = (e)=>{
        e.preventDefault()
        const pwd = pass.current.value
        const cpwd = cnfpass.current.value
        if(!checkName({firstname:fname.current.value,lastname:lname.current.value})){
            setstate({...state,name:{exist:1,msg:'Space is not allowed in firstname'}})
        }else if(!isEmail(email.current.value)){
            setstate({...state,email:{exist:1,msg:'Invalid Email Address'}})
        }else if(cpwd !== pwd.substring(0,cpwd.length)){
            setstate({...state,cnfpassword:{exist:1,msg:'Password fields are not matching'}})
        }else{
            setstate({...state,progress:true})
            axios.post('/register/user',{
                name:{
                    firstname:fname.current.value,
                    lastname:lname.current.value
                },
                email:email.current.value,
                password:cnfpass.current.value
            })
            .then( result => {
                switch(result.data.status){
                    case 200:setstate({...state,progress:false,server:{...state.server,success:{exist:true,msg:'Verification email has been scheduled. check out your email inbox.'}}});break;
                    case 423:setstate({...state,progress:false,server:{...state.server,error:{exist:true,msg:`Validation Error type : ${result.data.type}`}}});break;
                    case 422:setstate({...state,progress:false,server:{...state.server,error:{exist:true,msg:'User with this email already exists'}}});break;
                    case 500:setstate({...state,progress:false,server:{...state.server,error:{exist:true,msg:'Something went wrong at our end!.'}}});break;
                    default:console.log('signup default exec')
                }
            }).catch( err => {
              setstate({...state,progress:false,server:{...state.server,error:{exist:true,msg:'Something went wrong at our end!.'}}})
            })
        }
    }

    

    const power = ()=>{
          generatePasswordPower(pass.current.value,(power)=>{
                switch(power){
                    case 2 : { setmeter({exist:1,component:()=><Alert icon={false}  className='my-3 py-0 fsm' severity="error">Password is weak</Alert>})
                              break;}
                    case 3 : { setmeter({exist:1,component:()=><Alert icon={false}  className='my-3 py-0 fsm' severity="warning">Password is Good</Alert>})
                              break;}
                    case 4 : { setmeter({exist:1,component:()=><Alert icon={false}  className='my-3 py-0 fsm' severity="info">Password is Strong</Alert>})
                              break;}
                    case 5 : { setmeter({exist:1,component:()=><Alert className='my-3 py-0 fsm' severity="success">Password is Secure</Alert>})
                              break;}
                    default : { setmeter({exist:0,component:()=><></>})
                                break;}
                }
               })
  }


  const validateCnfPwd = ()=>{
    const pwd = pass.current.value
    const cpwd = cnfpass.current.value 
    if(cpwd !== pwd.substring(0,cpwd.length)){
      setstate({...state,cnfpassword:{exist:1,msg:'Password fields are not matching'}})
    }else{
      setstate({...state,cnfpassword:{exist:0,msg:''}})
    }
  }

    return (
        <form onSubmit={submitForm} className='col-12 col-lg-10 col-md-10 my-4'>
            <p className='ff-mst fmd col-12'>Get Your Free <Brand className='light'/> Account now</p>
            <p className=' text-muted col-12 ff-mst'>Let's get you all set up so you can verify your personal account.</p>
            {
               (state.server.error.exist || state.server.success.exist)?
               <div className='col-12'>
                    <Alert 
                    severity={(state.server.success.exist)?'success':'error'} 
                    className='my-3 py-0 fsm' 
                    variant='outlined'>
                        {(state.server.success.exist)?state.server.success.msg:state.server.error.msg}
                    </Alert>
               </div>:<></>
            }
            <div className='d-flex flex-wrap'>
                <div className='form-group  col-12 col-md-6 col-lg-6'>
                    <label className='fsm text-pr'>Firstname</label>
                    <input className='form-control' type='text' ref={fname} onFocus={()=>clearError('name')} required maxLength='20' minLength='3'/>
                </div>
                <div className='form-group col-12 col-md-6 col-lg-6'>
                    <label className='fsm text-pr'>Lastname</label>
                    <input className='form-control' type='text' onFocus={()=>clearError('name')} ref={lname} maxLength='20' />
                </div>
            </div>
            {
               (state.name.exist === 1)?
               <div className='col-12'>
                    <Alert severity='error' className='my-3 py-0 fsm' variant='outlined'>{state.name.msg}</Alert>
               </div>:<></>
            }
            <div className='form-group col-12'>
                <label className='fsm text-pr'>Email</label>
                <input className='form-control' type='email' required ref={email} onFocus={()=>clearError('email')} />
            </div>
            {
               (state.email.exist === 1)?
               <div className='col-12'>
                   <Alert severity='error' className='my-3 py-0 fsm' variant='outlined'>{state.email.msg}</Alert>
                </div>:<></>
            }
            <div className='d-flex flex-wrap'>
                <div className='form-group  col-12 col-md-6 col-lg-6'>
                    <label className='fsm text-pr'>Password</label>
                    <input className='form-control' onChange={power} onFocus={()=>clearError('password')} type='password' ref={pass} required maxLength='25' minLength='8'/>
                    {
                        (meter.exist === 1)?meter.component():<></>
                    }
                </div>
                <div className='form-group col-12 col-md-6 col-lg-6'>
                    <label className='fsm text-pr'>Confirm Password</label>
                    <input className='form-control' type='password' onFocus={()=>clearError('password')} onChange={validateCnfPwd} ref={cnfpass} required maxLength='25' minLength='8'  />
                    {
                        (state.cnfpassword.exist === 1)?
                        <div className='col-12 p-0'>
                            <Alert severity='error' className='my-3 py-0 fsm' variant='outlined'>{state.cnfpassword.msg}</Alert>
                        </div>:<></>
                    }
                </div>
            </div>
            <div className='form-group col-12 d-flex align-items-center '>
                {
                    (state.progress)?
                    <div className='mr-3'>
                        <CircularProgress/>
                    </div>:
                    <button className='btn  btn-3 mr-3'
                    onFocus={()=>clearError('server')}
                    disabled = {state.progress || state.email.exist === 1 || state.cnfpassword.exist === 1 || state.name.exist === 1}
                    >
                        Create Account
                    </button>
                }
                <span className='fsm text-muted mr-3'>or</span>
                <a href='http://localhost:5000/auth/google'>
                    <img src='./images/tech_png/google.png' className='rounded-circle img-fluid' style={{width:'24px'}}/>
                </a>
            </div>
            <p className='fsm ff-mst col-12'>Already have an Account?<Link to='/login' className='fsm ff-mst text-decoration-none ml-2'>Login.</Link></p>
        </form>
        
    )
}

export default Signup