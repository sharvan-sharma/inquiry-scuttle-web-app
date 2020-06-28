import React,{useState,useRef} from 'react'
import ReplyIcon from  '@material-ui/icons/Reply'
import axios from 'axios'
import ErrorIcon from '@material-ui/icons/Error'
import CircularProgress from '@material-ui/core/CircularProgress'
import Tooltip from '@material-ui/core/Tooltip'
import Alert from '@material-ui/lab/Alert'

function ReplyBox(props){

    const [state,setstate] = useState({
        open:false,
        message:'',
        subject:'',
        progress:false,
        error:{
            exist:false,msg:''
        },
        success:false
    })

    const subject = useRef('')
    const msg = useRef('')

    const submitForm = (e)=>{
        e.preventDefault()
        setstate({...state,progress:true})
        axios.post('/userapi/reply/inquiry',
        {
            inquiry_id:props.inquiry_id,
            reply:{
                subject:subject.current.value,
                msg:msg.current.value
            }
        }
        ,{withCredentials:true})
        .then( result => {
            switch(result.data.status){
                case 200 :setstate({...state,progress:false,success:true,open:false});break;
                case 401 :setstate({...state,progress:false,error:{exist:true,msg:'Unathorised'}});break;
                case 500 :setstate({...state,progress:false,error:{exist:true,msg:'something went wrong'}});break;
                case 423 :setstate({...state,progress:false,error:{exist:true,msg:'Invalid Inquiry_id'}});break;
                default:console.log('def exec reply')
            }
        })
        .catch( err => {
            setstate({...state,progress:false,error:{exist:true,msg:'something went wrong'}})
        })
    }

return (
    <>
    {
        (state.success)?
        <div className='py-2'>
            <Alert severity='info' variant='outlined'>Reply Scheduled</Alert>
        </div>
        :
        <></>
    }
    {(!state.open)?
    <div className='d-flex flex-wrap'>
        <button 
         onFocus={()=>setstate({...state,success:false,error:{exist:false,msg:''}})}
        onClick={()=>setstate({...state,open:true})}
        className='btn btn-light mr-2 d-flex text-muted fsm align-items-center border border-gray'>
            <ReplyIcon className='mr-2' fontSize='small'/>
            <span>
                Reply using Inquiry Scuttle
            </span>
        </button>
        <a href={'mailto:'+props.email} className='btn btn-3 fsm' 
         onFocus={()=>setstate({...state,success:false,error:{exist:false,msg:''}})}>
            Mail to
        </a>
    </div>:
    <form onSubmit={submitForm} className='col-12 px-0 rounded shadow'>
        <div className='p-2'>
            <span className='ff-rbt mr-2'><b>{props.name.firstname} {props.name.lastname || ''}</b></span>
            <span>{'<'+props.email+'>'}</span>
        </div>
        <div className='p-2 border-bottom border-gray'>
            <input className='form-control border-0 fsm' maxLength = {100} ref={subject}  placeholder='Subject' required/>
        </div>
        <div className='p-2 '>
            <input className='form-control border-0 fsm' maxLength = {500} ref={msg}  placeholder='Message' required/>
        </div>
        <div className='border-top border-gray p-2 d-flex'>
            {
                (state.error.exist)?
                <Tooltip arrow title={state.error.msg}>
                    <ErrorIcon className='text-danger'/>
                </Tooltip>:
                <></>
            }
            {
                (state.progress)?
                    <CircularProgress/>:
                <button 
                    className='btn btn-primary fsm ' 
                    type='submit' 
                    onFocus={()=>setstate({...state,success:false,error:{exist:false,msg:''}})}>
                        Send
                </button>
            }
            <button className='btn btn-danger fsm ml-2' onClick={()=>setstate({...state,open:false})}>
                    close
            </button>
        </div>
    </form>
}
    </>
)
}

export default ReplyBox
