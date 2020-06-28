import React,{useState,useEffect} from 'react'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import Alert from '@material-ui/lab/Alert'
import DeleteInquiry from './inquiryTable/DeleteInquiry'
import beautifyDate from '../../utils/beautifyDate'
import ReplyBox from './inquiry/ReplyBox'

function Inquiry(props){

    const [state,setstate] = useState({
        loading:true,
        error:{exist:false,msg:''},
        inquiry:{}
    })

    useEffect(()=>{
        axios.post('/userapi/read/inquiry',{inquiry_id:props.inquiry_id},{withCredentials:true})
        .then( result => {
            switch(result.data.status){
                case 200 :setstate({...state,loading:false,inquiry:result.data.inquiry});break;
                case 401 :setstate({...state,loading:false,error:{exist:true,msg:'unauthorised'}});break;
                case 423 :setstate({...state,loading:false,error:{exist:true,msg:'Invalid Inquiry id'}});break;
                case 500 :setstate({...state,loading:false,error:{exist:true,msg:'something went wrong'}});break;
                default : console.log('def exec while reading inquiry')
            }
        })
        .catch(err => {
            setstate({...state,loading:false,error:{exist:true,msg:'something went wrong'}})
        })
    },[])

    if(state.loading){
        return (<div className='col-12 d-flex justify-content-center align-items-center' style={{height:'50vh'}}>
                    <Loader type="Bars" color="black" height={50} width={50} />
                </div>)
    }else if(state.error.exist){
        return (<div className='col-12 d-flex justify-content-center align-items-center' style={{height:'50vh'}}>
                    <Alert  severity='error' variant='outlined'>{state.error.msg}</Alert>
                </div>)
    }else{
        return (
            <>
            <div className='border-bottom border-gray p-0 d-flex align-items-center'>
                <Link to='/' className='text-decoration-none text-black'>
                        <IconButton size='medium'>
                            <ArrowBackIcon fontSize='small' />
                        </IconButton>
                </Link>
                <DeleteInquiry inquiry_id={props.inquiry_id} /> 
                {
                    (state.inquiry.replied)?<label className='m-0 fsm btn btn-info ff-mst'>Already Replied!</label>:<></>
                }
            </div>
            <div className='col-12  d-flex justify-content-center '>
                <div className='col-12 col-md-11 col-lg-11 '> 
                        <p className='flg py-2'>
                            {state.inquiry.subject}
                        </p>
                        <div className='py-2 d-flex justify-content-between'>
                            <div>
                                <span className='ff-rbt mr-2'><b>{state.inquiry.name.firstname} {state.inquiry.name.lastame || ''}</b></span>
                                <span>{'<'+state.inquiry.email+'>'}</span>
                            </div>
                            <div>
                                {beautifyDate(state.inquiry.createdAt)}
                            </div>
                        </div>
                        <p className='py-2'>
                            {state.inquiry.message}
                        </p>
                        <ReplyBox email={state.inquiry.email} name={state.inquiry.name} inquiry_id={props.inquiry_id}/>
                </div>
            </div>
            </>
        )
    }
}

export default Inquiry