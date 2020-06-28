import React,{useState,useEffect} from 'react'
import Loader from 'react-loader-spinner'
import Alert from '@material-ui/lab/Alert'
import {connect} from 'react-redux'
import {setInquiries} from '../../redux/inquires/inquires.actions'
import axios from 'axios'
import InquiryTile from './inquiryTable/InquiryTile'
import BottomBar from './inquiryTable/BottomBar'

function InquiryTable(props){

    const [state,setstate] = useState({
        loading:true,
        error:{exist:false,msg:''},
        delArray:[]
    })

    useEffect(()=>{
        axios.post('/userapi/read/inquires',{},{withCredentials:true})
        .then( result => {
            switch(result.data.status){
                case 200 :props.setInquiries(result.data.inquiriesArray);setstate({...state,loading:false});break;
                case 401 :setstate({...state,loading:false,error:{exist:true,msg:'Unauthorised'}});break;
                case 423 :setstate({...state,loading:false,error:{exist:true,msg:`Validation error type: ${result.data.type}`}});break;
                case 500 :setstate({...state,loading:false,error:{exist:true,msg:'something went wrong at our end'}});break;
                default : console.log('default exec read all inquires')
            }
        }).catch( err => {
            setstate({...state,loading:false,error:{exist:true,msg:'something went wrong at our end'}})
        })
    },[])


    const remAll = ()=>setstate({...state,delArray:[]})

    const addToDelArray = (id)=>{
        let arr = state.delArray
        arr.push(id)
        setstate({...state,delArray:arr})
    }

    const remToDelArray = (id)=>{
        let arr = state.delArray.filter(ele=>ele !== id)
        setstate({...state,delArray:arr})
    }

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
            <div className='table-responsive'>
               <table className="table">
                    {/* <thead className="thead-dark">
                        <tr>
                            <th scope="col">
                                <Checkbox size='small' />
                            </th>
                            <th scope="col">Name</th>
                            <th scope="col">Form - type</th>
                            <th scope="col">Form - id</th>
                            <th scope="col">Date of creation</th>
                        </tr>
                    </thead> */}
                    <tbody>
                        {
                            Object.entries(props.inquiries).map(item=>{
                                const checked = (state.delArray.includes(item[0]))?true:false
                                return <InquiryTile 
                                        addToDelArray={addToDelArray}
                                        remToDelArray={remToDelArray}
                                        key={item[0]} 
                                        inquiry={item[1]} 
                                        checked={checked} />
                            })
                        }
                    </tbody>
                </table>
            </div>
            {
                (Object.entries(props.inquiries).length === 0)?
                  <div className='col-12 p-2'>
                      <Alert severity='info' variant='outlined'>'No Inquiry Found</Alert>
                  </div>
                  :
                  <></>
               }
            <BottomBar delArray={state.delArray} remAll={remAll} />
            
        </>)
    }
}

const mapStateToProps = state => ({
    inquiries:state.inquiries.inquiries
})

const mapDispatchToProps = dispatch => ({
    setInquiries: inquiriesArray => dispatch(setInquiries(inquiriesArray))
})

export default connect(mapStateToProps,mapDispatchToProps)(InquiryTable)