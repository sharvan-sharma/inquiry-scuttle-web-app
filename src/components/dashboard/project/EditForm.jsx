import React,{useRef,useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Loader from 'react-loader-spinner'
import Alert from '@material-ui/lab/Alert'
import ErrorIcon from '@material-ui/icons/Error'
import axios from 'axios'
import Tooltip from '@material-ui/core/Tooltip'
import CircularProgress from '@material-ui/core/CircularProgress'
import beautifyDate from '../../../utils//beautifyDate'
import TextField from '@material-ui/core/TextField'
import EditIcon from '@material-ui/icons/Edit'
import ClearIcon  from '@material-ui/icons/Clear'
import CheckIcon from '@material-ui/icons/Check'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel'

function EditForm(props){

    const fname=useRef('')

    const [state,setstate] = useState({
        form:{
            name:null,
            form_type:null
        },
        loading:true,
        error:{exist:false,msg:''},
        progress:{on:false,btn:null},
        resetError:{exist:false,msg:''},
        nameError:{exist:false,msg:''},
        typeError:{exist:false,msg:''},
        name:{edit:false},
        type:{edit:false}
    })

    

    useEffect(()=>{
        axios.post('/userapi/form/read',{
            project_id:props.project_id,
            form_id:props.form_id
        },{withCredentials:true})
        .then(result => {
            switch(result.data.status){
                case 200 : setstate({...state,loading:false,form:result.data.form});break;
                case 401 : setstate({...state,loading:false,error:{exist:true,msg:'Unauthorised'}});break;
                case 423 : setstate({...state,loading:false,error:{exist:true,msg:`Validation error type:${result.data.type}`}});break;
                case 500 : setstate({...state,loading:false,error:{exist:true,msg:'Something Went Wrong'}});break;
                default : console.log('def exec initial form load')
            }
        }).catch(err => {
            setstate({...state,loading:false,error:{exist:true,msg:'Something went wrong While loading Form data'}})
        })
    },[])

    const url = (type) => {
        switch(type){
            case 'reset' :return '/userapi/form/update/secret'
            case 'type':return '/userapi/form/update/type'
            case 'name':return '/userapi/form/update/name'
            default : console.log('def exec url')
        }
    }

    const inputdata = (type) => {
        switch(type){
            case 'reset':return {form_id:props.form_id}
            case 'type':return {form_id:props.form_id,form_type:state.form.form_type}
            case 'name':return {form_id:props.form_id,form_name:state.form.name}
            default : console.log('def exec inputdata')
        }
    }


    const generateError = (type,msg) => {
        switch(type){
            case 'reset':setstate({...state,progress:{on:false,btn:null},resetError:{exist:true,msg}});break;
            case 'type':setstate({...state,progress:{on:false,btn:null},typeError:{exist:true,msg}});break;
            case 'name':setstate({...state,progress:{on:false,btn:null},nameError:{exist:true,msg}});break;
            default : console.log('def exec inputdata')
        }
    }

    const update = (type)=>{
        setstate({...state,progress:{on:true,btn:type}})
        axios.post(url(type),inputdata(type),{withCredentials:true})
        .then(result=>{
            if(result.data.status === 200){
                setstate({...state,progress:{on:false,btn:null},form:result.data.form,name:{edit:false},type:{edit:false}})
            }else{
                const msg = ()=>{
                    switch(result.data.status){
                        case 401 : return 'unauthorised'
                        case 500 : return 'server error'
                        case 423 : return `validation error : type ${result.data.type}`
                        default:console.log('def gen errror')
                    }
                }
                generateError(type,msg())
            }
        }).catch(err =>{
            generateError(type,'server error')
        })
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
        <div className='d-flex justify-content-between align-items-center border-bottom border-dark'>
            <div className='d-flex align-items-center'>
                <Link to={'/project/'+props.project_id} className='text-decoration-none'>
                    <IconButton size='medium'>
                        <ArrowBackIcon fontSize='small'/>
                    </IconButton>
                </Link>
                <div className='ff-mst '>
                    <b>Edit Form</b> 
                </div >
            </div>
            
            {
                (state.form.form_type === 'csa')?<></>:
                <div className='d-flex align-items-center'>
                    {
                        (state.resetError.exist)?
                        <Tooltip title={state.resetError.msg}>
                            <ErrorIcon/>
                        </Tooltip>:<></>
                    }
                    {
                        (state.progress.on && state.progress.btn === 'reset')?
                        <div style={{width:'30px'}}>
                            <CircularProgress />
                        </div>:
                        <div className='px-2'>
                            <button className='btn btn-danger fsm' onFocus={()=>setstate({...state,resetError:{exist:false,msg:'null'}})} onClick={()=>update('reset')}>
                                Reset secret
                            </button>
                        </div>
                    }
                </div>
            }
        </div>

        <div className='d-flex flex-wrap-reverse'>
            <div className='p-4 col-12 col-md-6 col-lg-6'>
            
                <div className='form-group p-2'>
                    <label className='my-2 ff-rbt text-muted'>Form-Name</label>
                    {
                        (state.name.edit)?
                        <div className='d-flex flex-wrap justify-content-between col-12'>
                            <TextField
                            className='fxl'
                            id="standard-basic"
                            inputRef={fname}
                            value={state.form.name}
                            required
                            inputProps={{
                                minLength:3,
                                maxLength:20
                            }}
                            onChange={()=>setstate({...state,form:{...state.form,name:fname.current.value}})}
                            onFocus={()=>setstate({...state,nameError:{exist:false,msg:''}})}
                            placeholder='Edit your form name'  
                            label="Form name" />
                            <div className='d-flex align-items-center'>
                                {
                                    (state.progress.on && state.progress.btn === 'name')?
                                    <div style={{width:'30px'}}>
                                        <CircularProgress />
                                    </div>:
                                    <div>
                                    <IconButton size='small' onClick={()=>update('name')}>
                                        <CheckIcon fontSize='small'/>
                                    </IconButton>
                                    </div>
                                }
                                <div>
                                <IconButton size='small' onClick={()=>setstate({...state,name:{edit:false}})}>
                                    <ClearIcon fontSize='small' />
                                </IconButton>
                                </div>
                            </div>
                        </div>
                        :
                        <div className='d-flex justify-content-between flex-wrap'>
                            <p className='m-0 ff-rbt fxl'>{state.form.name}</p>
                            <div>
                            <IconButton size='small' onClick={()=>setstate({...state,name:{edit:true}})}>
                                <EditIcon fontSize='small'/>
                            </IconButton>
                            </div>
                        </div>
                    }
                </div>
                <div className='form-group p-2'>
                    <label className='my-2 ff-rbt text-muted'>Form-Type</label>
                    {
                        (state.type.edit)?
                     <div className='d-flex flex-wrap justify-content-between col-12'>
                         <RadioGroup aria-label="Select application type" name="Application Type" value={state.form.form_type} onChange={(e)=>setstate({...state,form:{...state.form,form_type:e.target.value}})}>
                            <FormControlLabel value="csa" control={<Radio />} label="Client Side Application" />
                            <FormControlLabel value="ssa" control={<Radio />} label="Server Side Application" />
                         </RadioGroup>
                            <div className='d-flex align-items-center'>
                                {
                                (state.progress.on && state.progress.btn === 'type')?
                                    <div style={{width:'30px'}}>
                                        <CircularProgress />
                                    </div>:
                                    <div>
                                    <IconButton size='small' onClick={()=>update('type')}>
                                        <CheckIcon fontSize='small'/>
                                    </IconButton>
                                    </div>
                                }
                                <div>
                                <IconButton size='small' onClick={()=>setstate({...state,type:{edit:false}})}>
                                    <ClearIcon fontSize='small' />
                                </IconButton>
                                </div>
                            </div>
                        </div>
                        :
                        <div className='d-flex justify-content-between flex-wrap'>
                            <p className='m-0 ff-rbt fxl'>{state.form.form_type}</p>
                            <div>
                            <IconButton size='small' onClick={()=>setstate({...state,type:{edit:true}})}>
                                <EditIcon fontSize='small'/>
                            </IconButton>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className='p-2 col-12 col-md-6 col-lg-6'>
                <div className='p-2 bg-black text-white rounded shadow'>
                    <div className='border-bottom border-white p-2'>
                        <div className='ff-mst my-1'><b>Form-Client-ID</b></div>
                        <div>
                            {state.form.form_client_id}
                        </div>
                    </div>
                    {
                        (state.form.form_type === 'ssa')?
                        <div className='border-bottom border-white p-2'>
                            <div className='ff-mst my-1'><b>Form-Secret</b></div>
                            <div>
                                {state.form.form_secret}
                            </div>
                        </div>:<></>
                    }
                    <div className='border-bottom border-white p-2'>
                        <div className='ff-mst my-1'><b>Date of creation</b></div>
                        <div>
                            {beautifyDate(state.form.createdAt)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
        )
    }
}

export default EditForm