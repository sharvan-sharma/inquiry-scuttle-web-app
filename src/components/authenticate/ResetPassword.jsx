import React,{useEffect,useState} from 'react'
import Brand from '../utils/Brand'
import Preloader from '../utils/Preloader'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert'
import Authenticate from '../../containers/Authenticate'

function ResetPassword(props){

    const [state,setstate] = useState({
        loading:true,
        error:{exist:false,msg:''},
        email:null
    })

    useEffect(()=>{
        if(!props.token || props.token.length < 160){
            setstate({...state,loading:false,error:{exist:true,msg:'Token specified in the request is Invalid'}})
        }else{
            axios.post('/verify/resetpassword',{
                token:props.token   
            }).then( result => {
                switch(result.data.status){
                    case 200:setstate({...state,loading:false,email:result.data.email});break;
                    case 423:setstate({...state,loading:false,error:{exist:true,msg:`valiadtion error type! ${result.data.type}`}});break;
                    case 422:setstate({...state,loading:false,error:{exist:true,msg:'Token specified in the Request is Expired. Please Regenerate Password Reset Link'}});break;
                    case 500:setstate({...state,loading:false,error:{exist:true,msg:'Something went wrong at our end!'}});break;
                    default :console.log('default exec at resetpassword check')
                }
            }).catch( err => {
                setstate({...state,loading:false,error:{exist:true,msg:'Something went wrong at our end!'}})
            })
        }
    },[])

    if(state.loading){
        return <Preloader/>
    }else if(state.error.exist){
        return (
            <div className='d-flex justify-content-center align-items-center full-screen bg-white' style={{zIndex:10,position:'fixed',top:0,left:0}}>
                <div className='col-12 col-lg-6 col-md-8 '>
                    <div className='fxl my-2 d-flex justify-content-center'>
                        <Brand color='light'/>
                    </div>
                    <Alert severity='error' variant='outlined'>{state.error.msg}</Alert>
                </div>
            </div>
        )
    }else{
        return <Authenticate  screen={3} email={state.email} />
    }
}

export default ResetPassword