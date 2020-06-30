import React,{useState} from 'react'
import { setInquiries } from '../../redux/inquires/inquires.actions'
import {connect} from 'react-redux'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'
import Tooltip from '@material-ui/core/Tooltip'
import ErrorIcon from '@material-ui/icons/Error'
import RadioFilter from './filter/RadioFilter'
import DateFilter from './filter/DateFilter'
import FormFilter from './filter/FormFilter'

function Filters(props){
    
    const [state,setstate] = useState({
            ...props.filter
    })


    const [fstate,setfstate] = useState({
        progress:{on:false,btn:null},
        error:{exist:false,msg:'',btn:null}
    })

    
    const url = type => {
        if(type === 'clear'){
            return '/userapi/read/inquires'
        }else{
            return '/userapi/filter'
        }
    }

    const generateResult = (data,type)=>{
        if(type !== 'clear'){
            props.setInquiries(data.array)
        }else{
            props.setInquiries(data.inquiriesArray)
        }
    }

    const applyFilter = (filters,type) => {

        //console.log(filters)

        setfstate({...fstate,progress:{on:true,btn:type}})

        axios.post(url(type),filters,{withCredentials:true})
        .then( result => {
            switch(result.data.status){
                case 200:generateResult(result.data,type);props.handleFilterUpdate(false,((type === 'clear')?false:true),state);break;
                case 500:setfstate({...fstate,progress:{on:false,btn:null},error:{exist:false,msg:'something went wrong',btn:fstate.progress.btn}});break;
                case 401:setfstate({...fstate,progress:{on:false,btn:null},error:{exist:false,msg:'unauthorised',btn:fstate.progress.btn}});break;
                case 423:setfstate({...fstate,progress:{on:false,btn:null},error:{exist:false,msg:`validation error ${result.data.type}`,btn:fstate.progress.btn}});break;
                default : console.log('filters exec def')
            }
        })
        .catch( err => {
            setfstate({...fstate,progress:{on:false,btn:null},error:{exist:false,msg:'something went wrong',btn:fstate.progress.btn}})
        })
    }


    const handleFormChange = (all) => {
        if(all === 'true'){
            setstate({...state,all:true,formsIdArray:[]})
        }else{
            setstate({...state,all:false})
        }
    }    

    const handleRadioChange = (value,type)=>{
        if(type === 'replied'){
            setstate({...state,replied:value})
        }else{
            if(value.length === 1 && value[0] === false){
                 setstate({...state,read:value,replied:[false]})
            }else{
                 setstate({...state,read:value})
            }
        }
    }

    const handleDateChange = (value,type)=>{
        if(type === 'mindate'){
            setstate({...state,mindate:value})
        }else{
            setstate({...state,maxdate:value})
        }
    }

    const addToFormsIdArray = (id)=>{
        let arr = state.formsIdArray
        arr.push(id)
        setstate({...state,formsIdArray:arr})
    }

    const remFromFormsIdArray = (id)=>{
        let arr = state.formsIdArray.filter(ele => ele != id )
        setstate({...state,formsIdArray:arr})
    }

    return (
        <div className='text-dark col-12 py-4' style={{position:'absolute',top:'0'}}>
            
            <div className="col-12 py-2">
                <FormFilter 
                    all={state.all} 
                    addToFormsIdArray={addToFormsIdArray} 
                    remFromFormsIdArray={remFromFormsIdArray}
                    handleChange={handleFormChange} 
                    formsIdArray={state.formsIdArray} />
            </div>
            {
                (state.formsIdArray.length === 0)?<></>:
                <div className='d-flex col-12 py-2 text-dark'>
                    <span className='mr-2'>Total Forms Selected :</span>
                    <span className='ff-mst'><b>{state.formsIdArray.length}</b></span>
                </div>
            }
           <div className='d-flex text-dark col-12 py-2'>
                    <RadioFilter data={[
                        {label:'Already Read',value:'t'},
                        {label:'Unread',value:'f'},
                        {label:'Both',value:'tf'}
                    ]}
                    value={state.read}
                    type='read'
                    disabled={false}
                    handleChange = {handleRadioChange} 
                    />
                    
            </div>
            <div className='d-flex text-dark col-12 py-2'>
                    <RadioFilter data={[
                        {label:'Replied',value:'t'},
                        {label:'Not Replied',value:'f'},
                        {label:'Both',value:'tf'}
                    ]}
                    value={state.replied}
                    type='replied'
                    disabled={(state.read.length === 1 && state.read[0] === false)}
                    handleChange = {handleRadioChange} 
                    />
            </div>
            <div className='col-12 py-2'>
                    <label>From</label>
                    <DateFilter handleChange={handleDateChange} type='mindate' value={state.mindate} min={props.createdAt} max={state.maxdate} />
            </div>
            <div className='col-12  py-2'>
                    <label>To</label>
                    <DateFilter handleChange={handleDateChange} type='maxdate' value={state.maxdate} min={state.mindate} max={new Date()} />
            </div>
            <div className='col-12 py-2'>
                {
                    (fstate.progress.on && fstate.progress.btn === 'apply')?
                    <CircularProgress size={20}/>:
                    <>
                    <button disabled={state.all === false && state.formsIdArray.length === 0} className='btn btn-primary fsm mr-2' onClick={()=>applyFilter(state,'apply')}>
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
                    <button disabled={!props.applied} className='btn btn-danger fsm' onClick={()=>applyFilter({},'clear')}>
                        Clear All
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
const mapStateToProps = state => ({createdAt:state.user.createdAt})

export default connect(mapStateToProps,mapDispatchToProps)(Filters)




