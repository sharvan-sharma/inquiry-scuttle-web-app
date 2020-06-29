import React,{useState} from 'react'
import { Checkbox } from '@material-ui/core'
import { setInquiries } from '../../redux/inquires/inquires.actions'
import {connect} from 'react-redux'
import SelectForm  from './SelectForm'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'
import Tooltip from '@material-ui/core/Tooltip'
import ErrorIcon from '@material-ui/icons/Error'

function Filters(props){
    
    const [state,setstate] = useState({
        read:[true,false],
        replied:[true,false],
        formsIdArray:[],
        mindate:null,
        maxdate:null
    })

    const [fstate,setfstate] = useState({
        progress:{on:false,btn:null},
        error:{exist:false,msg:'',btn:null}
    })

    const addToFormsIdArray = (id)=>{
        let arr = state.formsIdArray
        arr.push(id)
        setstate({...state,formsIdArray:arr})
    }

    const remFromFormsIdArray = (id)=>{
        let arr = state.formsIdArray.filter(ele => ele != id )
        setstate({...state,formsIdArray:arr})
    }

    const applyFilter = (filters,type) => {
        console.log(filters)
        setfstate({...fstate,progress:{on:true,btn:type}})
        axios.post('/userapi/filter',filters,{withCredentials:true})
        .then( result => {
            switch(result.data.status){
                case 200 :props.setInquiries(result.data.array);props.setopen(false);break;
                case 500:setfstate({...fstate,progress:{on:false,btn:null},error:{exist:false,msg:'something went wrong',btn:fstate.progress.btn}});break;
                case 401:setfstate({...fstate,progress:{on:false,btn:null},error:{exist:false,msg:'unauthorised',btn:fstate.progress.btn}})
                case 423:setfstate({...fstate,progress:{on:false,btn:null},error:{exist:false,msg:`validation error ${result.data.type}`,btn:fstate.progress.btn}})
                default : console.log('filters exec def')
            }
        })
        .catch( err => {
            setfstate({...fstate,progress:{on:false,btn:null},error:{exist:false,msg:'something went wrong',btn:fstate.progress.btn}})
        })
    }

    const clearFilter = () => {
        applyFilter({
             read:[true,false],
            replied:[true,false],
            formsIdArray:[],
            mindate:null,
            maxdate:null
        },'clear')
        setstate({...state, 
            read:[true,false],
            replied:[true,false],
            formsIdArray:[],
            mindate:null,
            maxdate:null})
    }

    return (
        <div className='text-black col-12 col-md-10 col-lg-8'>
            <div className="col-12 py-2">
                <SelectForm addToFormsIdArray={addToFormsIdArray} remFromFormsIdArray={remFromFormsIdArray}/>
            </div>
            {
                (state.formsIdArray.length === 0)?<></>:
                <div className='d-flex col-12 py-2 text-dark'>
                    <span className='mr-2'>Total Forms Selected :</span>
                    <span className='ff-mst'><b>{state.formsIdArray.length}</b></span>
                </div>
            }
            <div className='d-flex text-dark col-12 py-2'>
                <div>
                    <Checkbox checked = {state.read.includes(true)} onChange={(e)=>{
                        if(e.target.checked){
                            let arr = state.read
                            arr.push(true)
                            setstate({...state,read:arr})
                        }else{
                            let arr = state.read.filter(ele=> ele !== true)
                            setstate({...state,read:arr})
                        }
                    }}/> Already read
                </div>
                <div>
                    <Checkbox  checked = {state.read.includes(false)} onChange={(e)=>{
                        if(e.target.checked){
                            let arr = state.read
                            arr.push(false)
                            setstate({...state,read:arr})
                        }else{
                            let arr = state.read.filter(ele=> ele !== false)
                            setstate({...state,read:arr})
                        }
                    }}/> Unread
                </div>
            </div>
            <div className='d-flex text-dark col-12 py-2'>
                    <div>
                        <Checkbox checked = {state.replied.includes(true)} onChange={(e)=>{
                        if(e.target.checked){
                            let arr = state.replied
                            arr.push(true)
                            setstate({...state,replied:arr})
                        }else{
                            let arr = state.replied.filter(ele=> ele !== true)
                            setstate({...state,replied:arr})
                        }
                    }}/> Replied
                    </div>
                    <div>
                        <Checkbox checked = {state.replied.includes(false)} onChange={(e)=>{
                        if(e.target.checked){
                            let arr = state.replied
                            arr.push(false)
                            setstate({...state,replied:arr})
                        }else{
                            let arr = state.replied.filter(ele=> ele !== false)
                            setstate({...state,replied:arr})
                        }
                    }}/> Not Replied
                    </div>
            </div>
            <div className='d-flex text-dark flex-wrap col-12 py-2'>
                <div className='col-12 col-lg-6 col-md-6 pr-2 p-0'>
                    <label>From</label>
                    <input type='date' onChange={(e)=>setstate({...state,mindate:e.target.value})} className='form-control'/> 
                </div>
                <div className='col-12 col-lg-6 col-md-6  p-0'>
                    <label>To</label>
                    <input type='date' onChange={(e)=>setstate({...state,maxdate:e.target.value})} className='form-control'/>
                </div>
            </div>
            <div className='col-12 py-2'>
                {
                    (fstate.progress.on && fstate.progress.btn === 'apply')?
                    <CircularProgress size={20}/>:
                    <>
                    <button className='btn btn-primary fsm mr-2' onClick={()=>applyFilter(state,'apply')}>
                        Apply
                    </button>
                    {
                        (fstate.error.exist && fstate.error.btn === 'apply')?
                        <Tooltip arrow title={fstate.error.msg}>
                            <ErrorIcon className='text-danger'/>
                        </Tooltip>:<></>
                    }
                    </>
                }
                {
                    (fstate.progress.on && fstate.progress.btn === 'clear')?
                    <CircularProgress size={20}/>:
                    <>
                    <button className='btn btn-danger fsm' onClick={clearFilter}>
                        Reset
                    </button>
                    {
                        (fstate.error.exist && fstate.error.btn === 'clear')?
                        <Tooltip arrow title={fstate.error.msg}>
                            <ErrorIcon className='text-danger'/>
                        </Tooltip>:<></>
                    }
                    </>
                }
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    setInquiries : array => dispatch(setInquiries(array))
})



export default connect(null,mapDispatchToProps)(Filters)




