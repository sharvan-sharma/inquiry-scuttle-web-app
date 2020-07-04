import React,{useState} from 'react'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import ErrorIcon from '@material-ui/icons/Error'
import axios from 'axios'
import {delInquiry} from '../../../redux/inquires/inquires.actions'
import { CircularProgress } from '@material-ui/core'
import {connect} from 'react-redux'
import Tooltip from '@material-ui/core/Tooltip'
import history from '../../../history.js'

function DeleteInquiry(props){

    const [state,setstate] = useState({
        progress:false,
        error:{exist:false,msg:''}
    })

    const deleteInquiry = ()=>{
        setstate({...state,progress:true})
        axios.post('/userapi/delete/inquiry',{inquiry_id:props.inquiry_id},{withCredentials:true})
        .then(result=>{
            switch(result.data.status){
                case 200:{
                    props.delInquiry(result.data.inquiry_id)
                    if(props.type !== 'tile'){
                        history.push('/')
                    }
                    break;
                }
                case 401:setstate({...state,progress:false,error:{exist:true,msg:'Unauthorised'}});break;
                case 500:setstate({...state,progress:false,error:{exist:true,msg:'Something went wrong while deleting Inquiry'}});break;
                case 423:setstate({...state,progress:false,error:{exist:true,msg:'Invalid Inquiry ID'}});break;
                default: console.log('def exec while del inq')
            }
        })
        .catch(err=>{
            setstate({...state,progress:false,error:{exist:true,msg:'Something went wrong while deleting Inquiry'}})
        })
    }

    return (
        <div className='d-flex align-items-center'> 
            {
                (state.error.exist)?
                <Tooltip title={state.error.msg} arrow >
                    <ErrorIcon/>
                </Tooltip>:
                <></>
            }
            {
                (state.progress)?
                <CircularProgress size={20}/>:
                <div>
                    <Tooltip arrow title='delete'>
                         <IconButton 
                            size='small'
                            onFocus={()=>setstate({...state,error:{exist:false,msg:''}})} 
                            onClick={deleteInquiry}
                        >
                            <DeleteIcon fontSize='small' />
                        </IconButton>
                    </Tooltip>
                </div>
            }
        </div>
    )

}

const mapDispatchToProps = dispatch => ({
    delInquiry: inquiry_id => dispatch(delInquiry(inquiry_id))
})

export default connect(null,mapDispatchToProps)(DeleteInquiry)