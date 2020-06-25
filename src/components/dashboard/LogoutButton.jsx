import React,{useState} from 'react'
import axios from 'axios'
import Alert  from '@material-ui/lab/Alert'
import CircularProgress from '../utils/CircularProgress'
import history from '../../history'
import {setCurrentUser} from '../../redux/user/user.actions'
import {connect} from 'react-redux'

function LogoutButton(props){

    const [state,setstate] = useState({progress:false,error:{exist:false,msg:''}})

    const logout = ()=>{
        setstate({...state,progress:true})
        axios.get('/logout',{withCredentials:true})
        .then(result=>{
            props.setCurrentUser(result.data)
            history.push('/') 
        })
        .catch(err=>{
            setstate({...state,progress:true,error:{exist:true,msg:'server error'}})
        })
    }

    return (
            <>
                {(state.progress)?<CircularProgress/>:
                <button className='btn btn-light rounded-pill px-3 py-1' onClick={logout}>Logout</button>}
                {(state.error.exist)?<Alert severity='error' variant='filled'>{state.error.msg}</Alert>:<></>}
            </>
    )
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null,mapDispatchToProps)(LogoutButton)