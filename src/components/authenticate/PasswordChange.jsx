import React,{useRef,useState} from 'react'
import Brand from '../utils/Brand'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert'
import generatePasswordPower from '../../utils/generatePasswordPower'
import CircularProgress from '../utils/CircularProgress'
import {connect} from 'react-redux'
import {setCurrentUser}  from '../../redux/user/user.actions'
import history from '../../history'

function PasswordChange(props) {

    const pass = useRef('')
    const cnfpass = useRef('')

    const [state,setstate] = useState({
            progress:false,
            cnfpassword:{exist:0,msg:''},
            server:{
                error:{exist:false,msg:''}
            }
        })

    const [meter,setmeter] = useState({
        exist:0,
        component:()=><></>
    })    

    const clearError = (type)=>{
        switch(type){
            case 'password': setstate({...state,cnfpassword:{exist:0,msg:''}});break;
            case 'server' :setstate({...state, server:{error:{exist:false,msg:''}}});break;
            default : console.log('clearError default exec')
        }
    }

    const submitForm = (e)=>{
        e.preventDefault()
        const pwd = pass.current.value
        const cpwd = cnfpass.current.value
        if(cpwd !== pwd.substring(0,cpwd.length)){
            setstate({...state,cnfpassword:{exist:1,msg:'Password fields are not matching'}})
        }else{
            setstate({...state,progress:true})
            axios.post('/changepassword',{
                email:props.email,
                password:cnfpass.current.value
            },{withCredentials:true})
            .then( result => {
                console.log(result)
                switch(result.data.status){
                    case 200:props.setCurrentUser(result.data);history.push('/');break;
                    case 401:history.push('/');break;
                    case 423:setstate({...state,progress:false,server:{...state.server,error:{exist:true,msg:`Validation Error type : ${result.data.type}`}}});break;
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
            <p className='ff-mst fmd col-12'><Brand className='light'/></p>
            <p className=' text-muted col-12 ff-mst'>Create new password for your account.</p>
            <div className='d-flex flex-wrap'>
                <div className='form-group  col-12 col-md-6 col-lg-6'>
                    <label className='fsm text-pr'>Password</label>
                    <input className='form-control' type='password' onFocus={()=>clearError('password')} onChange={power}  ref={pass} required maxLength='25' minLength='8'/>
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
                    disabled = {state.progress ||  state.cnfpassword.exist === 1 }
                    >
                        ResetPassword
                    </button>
                }
            </div>
            <p className='fsm ff-mst col-12'>Remember Password?<Link to='/login' className='fsm ff-mst text-decoration-none ml-2'>Login.</Link></p>
        </form>
        )
}

const mapDispatchToProps = dispatch =>({
setCurrentUser:user=>dispatch(setCurrentUser(user))
})

export default connect(null,mapDispatchToProps)(PasswordChange)