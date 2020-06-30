import React,{useRef,useState} from 'react'
import Brand from '../components/utils/Brand'
import MailIcon from '@material-ui/icons/Mail'
import TextField from '@material-ui/core/TextField'
import SendIcon from '@material-ui/icons/Send';
import CircularProgress from '../components/utils/CircularProgress'
import ErrorIcon from '@material-ui/icons/Error'
import Tooltip from '@material-ui/core/Tooltip'
import {isEmail,plainName} from '../utils/validations'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert'

export default function Contact () {


    const [state,setstate] = useState({
        progress:false,
        error:{exist:false,msg:''},
        success:{exist:false,msg:''},
        msg:{val:'',rem:500},
        email:'',
        name:''
    })

    const handleChange = (e)=>{
        const msg = e.target.value
        if(msg.length < 500){
            setstate({...state,msg:{val:msg,rem:500-msg.length}})
        }else{
            setstate({...state,msg:{val:state.msg.val,rem:0}})
        }
    }
    const clearError = ()=>setstate({...state,error:{exist:false,msg:''},success:{exist:false,msg:''}})

    const submitForm = (e)=>{
        e.preventDefault()
        if(!isEmail(state.email)){
            setstate({...state,error:{exist:true,msg:'Please Enter a valid Email Address'}})
        }else if(!plainName(state.name)){
            setstate({...state,error:{exist:true,msg:'Please Enter a valid name with atleast 3 characters without space'}})
        }else{
        setstate({...state,progress:true})
        const data = {
                form_client_id:'5ef0acb902629f2c4864eab9-5ef1daabbe481e2c90811e56-1593326725265-inquiry-scuttle-form',
                inquiry:{
                    name:{
                        firstname:state.name.split(' ')[0],
                        middlename:'',
                        lastname:''
                    },
                    email:state.email,
                    message:state.msg.val
                }
            }
        axios.post('http://localhost:5000/clientapi/create/inquiry?form_type=csa',data)
        .then(result =>{
                switch(result.data.status){
                    case 200:{
                        setstate({
                            progress:false,
                            error:{exist:false,msg:''},
                            success:{exist:true,msg:'Successfully recieved your message. We will get back to you as soon as We can.'},
                            msg:{val:'',rem:500,open:false},
                            name:'',
                            email:''
                        });
                        break;
                    }
                    case 423:setstate({...state,progress:false,error:{exist:true,msg:`data validation error type: ${result.data.type}`}});break
                    case 422:setstate({...state,progress:false,error:{exist:true,msg:`Page Under Maintenance`}});break;
                    case 500:setstate({...state,progress:false,error:{exist:true,msg:'something went wrong at scuttle end.'}});break;
                    default:console.log('contact page default exec')
                }
            }).catch(err=>{
                setstate({...state,progress:false,error:{exist:true,msg:'something went wrong at scuttle end.'}})
            })
        }
    }

    return (
        <div className='d-flex bg-pr '>
            <div className='col-12 col-md-6 col-lg-6 text-white d-flex justify-content-center pc '>
                <div className='col-12 col-md-10 col-lg-10 full-screen d-flex justify-content-around flex-column'>
                    <div className='fxl'>
                        <Brand color='dark'/>
                    </div>
                    <div >
                       <p className='fxl ff-mst mb-0'>Let's talk</p>
                       <p className='ff-mst'>
                            Ask us anything about Inquiry Scuttle or just say hi...
                       </p>
                       <a href="https://www.freepik.com/free-photos-vectors/technology">
                          <img src = '/images/illustrations/contact.jpg' className='rounded img-fluid pc' />
                       </a>
                    </div>
                    <a href="mailto:inquiry.scuttle.service@gmail.com" className='d-flex text-decoration-none text-white align-items-center'>
                        <MailIcon/> inquiry.scuttle.service@gmail.com
                    </a>
                </div>
            </div>
            <div className='col-12 col-md-6 col-lg-6 bg-white d-flex justify-content-center'>
                <form onSubmit={submitForm} className='col-12 col-md-10 col-lg-10 full-screen d-flex flex-column justify-content-center'>
                    <div className='fxl mbl'>
                        <Brand color='light'/>
                    </div>
                    <div className='mbl '>
                       <p className='fmd mb-0'>Let's talk</p>
                       <p className='ff-mst fsm text-pr'>
                            Ask us anything about Inquiry Scuttle or just say hi...
                       </p>
                    </div>
                    <div className='pc '>
                       <p className='ff-mst text-pr'>
                            Write us some few words...
                       </p>
                    </div>
                    <div className='my-2'>
                        <TextField 
                        id="standard-basic" 
                        onChange={(e)=>setstate({...state,name:e.target.value})}
                        required 
                        value={state.name}
                        onFocus={clearError}
                        inputProps={{maxLength:20}} 
                        label="Name" 
                        fullWidth/>
                    </div>
                    <div className='my-2'>
                        <TextField
                          id="standard-basic"
                          onChange={(e)=>setstate({...state,email:e.target.value})}
                          required 
                          value={state.email}
                          type='email'
                          label="Email"
                          fullWidth/></div>
                    <div className='my-2'>
                        {
                            (state.msg.rem === 500)?<></>:
                            <p className='fsm text-pr '>Remaining Characters {state.msg.rem}/500</p>
                        }
                        <TextField
                         id="standard-basic" 
                         label="Message" 
                         value={state.msg.val}
                         onChange={handleChange}
                         onFocus={clearError}
                         fullWidth multiline rowsMax={4}/>
                    </div>
                    <div className='my-2 d-flex align-items-center'>
                    {
                        (state.progress)?
                        <CircularProgress size={30}/>
                        :
                        <>
                        {
                            (state.error.exist)?
                            <Tooltip arrow title={state.error.msg}>
                                <ErrorIcon className='text-danger' />
                            </Tooltip>:<></>
                        }
                        <button type='submit' onFocus={clearError} className='btn btn-3'>Send <SendIcon/></button>
                        </>
                    }
                    </div>
                    {
                        (state.success.exist)?
                        <div className='my-2 d-flex align-items-center'>
                            <Alert severity='info' variant='outlined'>{state.success.msg}</Alert>
                        </div>:<></>
                    }
                    <a href="mailto:inquiry.scuttle.service@gmail.com" className='mbl d-flex text-decoration-none text-pr align-items-center'>
                        <MailIcon/> inquiry.scuttle.service@gmail.com
                    </a>
                </form>
            </div>
        </div>
    )
}