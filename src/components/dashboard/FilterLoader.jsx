import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {setFilters} from '../../redux/filters/filters.action'
import Loader from 'react-loader-spinner'
import Alert from '@material-ui/lab/Alert'
import Filters from './Filters'
import axios from 'axios'

function FilterLoader(props){

    const [state,setstate] = useState({  
            loading:true,
            error:{exist:false,msg:''}
        })

 
    
    useEffect(()=>{
        if(!props.fetched){
            axios.get('/userapi/loadfilters',{withCredentials:true})
            .then( result => {
                switch(result.data.status){
                    case 200:props.setFilters(result.data.obj);setstate({...state,loading:false});break;
                    case 401:setstate({...state,loading:false,error:{exist:true,msg:'unauthorised'}});break;
                    case 500:setstate({...state,loading:false,error:{exist:true,msg:'something went wrong'}});break;
                    default :console.log('filterloader error')
                }
            })
            .catch( err=>{
                setstate({...state,loading:false,error:{exist:true,msg:'something went wrong'}})
            })
        }else{
            setstate({...state,loading:false})
        }
    },[])

     if(state.loading){
        return (<div className='d-flex justify-content-center align-items-center col-12 col-md-6 col-lg-4 rounded shadow  bg-white ' style={{height:'50vh',position:'absolute',top:'100%'}}>
                    <Loader type="Bars" color="black" height={50} width={50} />
                </div>)
    }else if(state.error.exist){
        return (<div className='d-flex justify-content-center align-items-center col-12 col-md-6 col-lg-4 d-flex  rounded shadow   bg-white ' style={{height:'50vh',position:'absolute',top:'100%'}}>
                    <Alert  severity='error' variant='outlined'>{state.error.msg}</Alert>
                </div>)
    }else{
        return (<div className='d-flex justify-content-center align-items-center col-12 col-md-6 col-lg-4  d-flex  rounded shadow  bg-white ' style={{height:'50vh',overflowY:'auto',position:'absolute',top:'100%'}}>
                    <Filters applied={props.applied} handleFilterUpdate={props.handleFilterUpdate} filter={props.filter}/>
                </div>)
    }

}

const mapDispatchToProps = dispatch => ({
    setFilters: obj => dispatch(setFilters(obj))
})

const mapStateToProps = state => ({
    fetched:state.filter.fetched
})

export default connect(mapStateToProps,mapDispatchToProps)(FilterLoader)