import React from 'react'
import {Redirect} from 'react-router-dom'
import Login from '../components/authenticate/Login'
import ForgotPassword from '../components/authenticate/ForgotPassword'
import Signup from '../components/authenticate/Signup'
import PasswordChange from '../components/authenticate/PasswordChange'

const TabScreen = (props)=>{
    switch(props.screen){
        case 0 : return <Login/>
        case 1 : return <Signup />
        case 2 : return <ForgotPassword />
        case 3 : return <PasswordChange email={props.email} />
        default : return <Redirect to='/'/>
    }
}

export default function Authenticate (props) {
 return (
     <>
        <div className='bg-white full-screen col-12 col-md-6 col-lg-6 d-flex align-items-center justify-content-center shadow' style={{zIndex:1}} >
                <TabScreen screen={props.screen} email={props.email || ''} />
        </div>
        <div className='full-screen d-flex justify-content-end bg-pr col-12' style={{position:'fixed',top:0,left:0}}>
            <div className='pc col-12 col-md-6 col-lg-6' >
                
            </div>
        </div>
    </>
 )  
}

