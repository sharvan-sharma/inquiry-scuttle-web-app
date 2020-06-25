import React,{useState,useEffect} from 'react';
import axios from 'axios'
import {Switch,Route} from 'react-router-dom'
import {setCurrentUser} from './redux/user/user.actions'
import {connect} from 'react-redux'
import LandingPage from './containers/LandingPage'
import About from './containers/About'
import Authenticate from './containers/Authenticate'
import Contact from './containers/Contact'
import Verify from './containers/Verify'
import Page404 from './containers/Page404'
import DashboardRouter from './containers/DashboardRouter'
import Preloader from './components/utils/Preloader'
import ServerError from './components/utils/ServerError'
import querystring from 'query-string'
import ResetPassword from './components/authenticate/ResetPassword'
import 'jquery/src/jquery'
import 'popper.js/dist/popper'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import './styles/main.css'

function App(props){

  const [state,setstate] = useState({
    loading:true,
    error:false
  })

  useEffect(()=>{
    axios.get('/checklogin',{withCredentials:true})
    .then(result => {
      setTimeout(()=>{
        if(result.data.status === 200){
          props.setCurrentUser(result.data)
        }
        setstate({...state,loading:false})
      },2000)
    })
    .catch(err => {
        setstate({...state,error:true,loading:false})      
    })

    return ()=>{
      props.setCurrentUser({logged_in:false,email:null,photo:null,name:{}})
    }    
  },[])  


  if(state.loading){
    return <Preloader/>
  }else if(state.error){
    return <ServerError/>
  }else{
    if(props.logged_in){
      return (
        <Switch>
          <Route path='/' component={DashboardRouter} />
          <Route component={Page404} />
        </Switch>
      )
    }else{
      return (
        <Switch>
          <Route exact path = '/' component={LandingPage} />
          <Route exact path = '/login' component = {()=><Authenticate screen={0}/>} />
          <Route exact path = '/signup' component = {()=><Authenticate screen={1}/>} />
          <Route exact path = '/forgotpassword' component = {()=><Authenticate screen={2}/>} />
          <Route path = '/verify' component={(prop)=>{
                 const val = querystring.parse(prop.location.search)
                 const token = val.token
                 return <Verify token = {token} />
          }}/>
          <Route path = '/resetpassword' component={(prop)=>{
                 const val = querystring.parse(prop.location.search)
                 const token = val.token
                 return <ResetPassword screen={3} token = {token} />
          }}/>
          <Route exact path='/contact' component={Contact} />
          <Route exact path='/about' component={About} />
          <Route component={Page404}/>
        </Switch>
      )
    }
  }
}

const mapStateToProps = state => ({
  logged_in: state.user.logged_in
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(App)
