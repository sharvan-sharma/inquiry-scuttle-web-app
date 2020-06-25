
import React,{useEffect,useState} from 'react'
import {connect} from 'react-redux'
import {setCurrentUser} from '../redux/user/user.actions'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert'
import history from '../history'
import {Link} from 'react-router-dom'
import PreLoader from '../components/utils/Preloader'
import Brand from '../components/utils/Brand'

function Verify(props){
    const [state,setstate] = useState({flag:0,component:()=><></>})

    const ServerError = ()=>{
        return (
            <Alert variant='filled' severity='error'>
                <p className='h4'>Something Went Wrong At Our End</p>
                <p>Please try again later</p>
            </Alert>
        )
    }


    const ValidationError = ()=>{
        return (
            <Alert variant='filled' severity='error'>
                <p className='h4'>Invalid Token</p>
                <p>The Token associated with the Link attached to your email is Invalid or Malformed</p>
            </Alert>
        )
    }

    const TokenExpireError = ()=>{
        return (
            <Alert variant='filled' severity='error'>
                <p className='h4'>User Does Not Exist</p>
                <p>This can happen because of Not verifying within TimeFrame,Please Register Again</p>
                <p className='fsm'>Note : While Registering if you get 'User Already Exist Message ,Then wait for 10-20 minutes and Try Again</p>
                <p><Link to='/signup' className='btn btn-warning'>Click here to Register</Link></p>
            </Alert>
        )
    }
    
    const relUrl = ()=>{
        switch(props.type){
            case 'verified' : return '/verify'
            default : return '/verify'
        }
    }

    
    useEffect(()=>{
        if(props.token === undefined || props.token.length < 20){
            history.push('/')
        }else{
            axios.post(relUrl(),{token:props.token},{withCredentials:true})
            .then(res=>{
                switch(res.data.status){
                    case 200 : {
                            props.setCurrentUser(res.data)
                            history.push('/')
                            break;
                    }
                    case 423 : {
                            setstate({...state,flag:1,component:()=><ValidationError />})
                            break;
                    }
                    case 422 : {
                            setstate({...state,flag:1,component:()=><TokenExpireError />})
                            break;
                    }
                    case 500 :{
                            setstate({...state,flag:1,component:()=><ServerError/>})
                            break;
                    }
                    default:setstate({...state,flag:0,component:()=><></>})
                }
            })
            .catch(err=>{
                setstate({...state,flag:1,component:()=><ServerError/>})
            })
        }
    },[])

    if(state.flag === 0){
       return <PreLoader/>
    }else if(state.flag === 1){
        return (<div className='full-screen-2 bg-3 p-4 d-flex flex-column justify-content-center align-items-center'>
                        <div className='fxl my-5'>
                            <Brand color='light' />
                        </div>
                        {state.component()}
                </div>)
    }

}

const mapDispatchToProps = dispatch=>({
setCurrentUser:user=>dispatch(setCurrentUser(user)),
})

export default connect(null,mapDispatchToProps)(Verify)