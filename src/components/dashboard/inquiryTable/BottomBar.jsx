import React,{useState} from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import ClearIcon from '@material-ui/icons/Clear'
import ErrorIcon from '@material-ui/icons/Error'
import Tooltip from '@material-ui/core/Tooltip'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'
import {connect} from 'react-redux'
import {delMulInquiries} from '../../../redux/inquires/inquires.actions'
import {makeStyles} from '@material-ui/core/styles'

const useStyle = makeStyles({
    root:{
        outline:'none !important'
    }
})

function BottomBar(props){
    const classes = useStyle()
    const [state,setstate] = useState({
        progress:false,
        error:{exist:false,msg:''}
    })

    const deleteInquiries = ()=>{
        axios.post('/userapi/delete/inquiries',{inquiryArray:props.delArray},{withCredentials:true})
        .then(result=>{
            switch(result.data.status){
                case 200:props.delMulInquiries(props.delArray);props.remAll();setstate({...state,progress:false});break;
                case 401:setstate({...state,progress:false,error:{exist:true,msg:'Unauthorised'}});break;
                case 500:setstate({...state,progress:false,error:{exist:true,msg:'Something went wrong while deleting Inquiry'}});break;
                case 423:setstate({...state,progress:false,error:{exist:true,msg:'Validation error'}});break;
                default: console.log('def exec while del inq')
            }
        })
        .catch(err=>{
            setstate({...state,progress:false,error:{exist:true,msg:'Something went wrong while deleting Inquiries'}})
        })
    }

    if(props.delArray.length === 0){
        return <></>
    }else{
        return (
            <Snackbar
                anchorOrigin={{vertical:"bottom", horizontal:"center" }}
                open={true}
            >
                <div className='d-flex align-items-center bg-snack rounded-pill text-white'>
                        <div className='p-2'>
                            <IconButton size='small' color='inherit' onClick={props.remAll} className={classes.root}>
                                <ClearIcon fontSize='small'/>
                            </IconButton>
                        </div>
                        <div className='p-2 d-flex align-items-center '>
                            <span className='p-1 fsm bg-primary rounded-pill mr-2'>{props.delArray.length}</span>
                            <span>items selected</span>   
                        </div>
                        <div className='p-2 d-flex align-items-center'>
                            {
                                (state.error.exist)?
                                <Tooltip arrow title={state.error.msg}>
                                    <ErrorIcon/>
                                </Tooltip>:
                                <></>
                            }
                            {
                                (state.progress)?
                                <div>
                                    <CircularProgress/>
                                </div>:
                                <button className='btn btn-danger d-flex rounded-pill align-items-center px-3'
                                    onFocus={()=>setstate({...state,error:{exist:false,msg:''}})}
                                    onClick={deleteInquiries} >
                                    <div className='mr-1'>
                                        <DeleteIcon fontSize='small'/>
                                    </div>
                                    <span>Delete</span>
                                </button>
                            }
                        </div>
                    </div>   
            </Snackbar>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    delMulInquiries : delArray => dispatch(delMulInquiries(delArray))
})

export default connect(null,mapDispatchToProps)(BottomBar)