import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import Alert from '@material-ui/lab/Alert'
import axios from 'axios'
import AddIcon from '@material-ui/icons/Add'
import {setForms,delForm} from '../../redux/forms/forms.actions'
import {  CircularProgress, Tooltip } from '@material-ui/core'
import NewForm from './project/NewForm'
import beautifyDate from '../../utils/beautifyDate'
import IconButton  from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import ErrorIcon from '@material-ui/icons/Error'
import {Link} from 'react-router-dom'

function Project(props){

    const [state,setstate] = useState({
        loading:true,
        error:{exist:false,msg:''},
        project:{name:null},
        progress:{on:false,btn:null},
        delError:{exist:false,msg:''}
    })

    const [open,setopen] = useState(false)

    useEffect(()=>{
        axios.post('/userapi/readall/forms',{project_id:props.project_id},{withCredentials:true})
        .then(result => {
            console.log(result.data)
            switch(result.data.status){
                case 200:props.setForms(result.data.formsArray);setstate({...state,loading:false,project:result.data.project});break;
                case 401:setstate({...state,loading:false,error:{exist:true,msg:'Unauthorized access'}});break;
                case 500:setstate({...state,loading:false,error:{exist:true,msg:'Something went wrong while loading forms'}});break;
                default :console.log('def exec form loading')
            }
        })
        .catch(err=>{
            setstate({...state,loading:false,error:{exist:true,msg:'Something went wrong while loading forms'}})
        })
    },[])


    const deleteForm = (form_id)=>{
        setstate({...state,progress:{on:true,btn:'del'}})
        axios.post('/userapi/form/delete',{
            project_id:props.project_id,
           // form_id:form_id
        },{withCredentials:true})
        .then(result => {
            switch(result.data.status){
                case 200:props.delForm(form_id);break;
                case 401:setstate({...state,progress:{on:false,btn:null},delError:{exist:false,msg:'Unauthorised'}});break;
                case 500:setstate({...state,progress:{on:false,btn:null},delError:{exist:false,msg:'something went wrong'}});break;
                case 423:setstate({...state,progress:{on:false,btn:null},delError:{exist:false,msg:`validation error type: ${result.data.type}`}});break;
                default:console.log('def exec form del error');
            }
        }).catch( err =>{
            setstate({...state,progress:{on:false,btn:null},delError:{exist:false,msg:'something went wrong'}})
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
               <div className='col-12 p-0 border-bottom border-gray d-flex justify-content-between flex-wrap'>
                   <div className='p-2 p-lg-4 p-md-3 '>
                        <p className='fxl ff-rbt mb-0'>
                           <b>{state.project.name}</b>
                        </p>
                        <p className='fmd ff-rbt text-muted mt-0'>
                            All forms associated the project. 
                        </p>
                   </div>
                   <div className='p-2 p-lg-4 p-md-3 '>
                       <button className='btn btn-3 flg d-flex align-items-center' onClick={()=>setopen(true)}>
                            <AddIcon/>
                            <span>Add form</span>
                       </button>
                   </div>
               </div>
               <div className='position-absolute col-12 overflow-auto p-0  text-nowrap'>
                <table className="table ">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col"><div className='px-2'>Name</div></th>
                            <th scope="col"><div className='px-2'>Form - type</div></th>
                            <th scope="col"><div className='px-2'>Form - id</div></th>
                            <th scope="col"><div className='px-2'>Date of creation</div></th>
                            <th scope="col"><div className='px-2'>Actions</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.entries(props.forms).map(item=>{
                                return (
                                    <tr key={item[0]} className='border-bottom border-gray' >
                                        <td>
                                            
                                            <Tooltip arrow title={item[1].name}>
                                               <div className='px-2'>{item[1].name.substring(0,20)+((item[1].name.length > 20)?'...':'')}</div>
                                            </Tooltip>
                                            
                                        </td>
                                        <td><div className='px-2'>{item[1].form_type}</div></td>
                                        <td>
                                            <div>
                                            <Tooltip arrow title={item[1].form_client_id}>
                                                <div className='px-2'>{item[1].form_client_id.substring(0,50)+((item[1].form_client_id.length > 50)?'...':'')}</div>
                                            </Tooltip>
                                            </div>
                                        </td>
                                        <td><div className='px-2'>{beautifyDate(item[1].createdAt)}</div></td>
                                        <td className='d-flex align-items-center m-0'>
                                            <Link to = {'/form/'+props.project_id+'/'+item[0]} className='text-decoration-none'>
                                                <IconButton size='small'>
                                                    <EditIcon fontSize='small'/>
                                                </IconButton>
                                            </Link>
                                            {
                                                (state.delError.exist)?
                                                <Tooltip title={state.delError.msg}>
                                                    <ErrorIcon/>
                                                </Tooltip>:<></>
                                            }
                                            {
                                                (state.progress.on && state.progress.btn === 'del')?
                                                <div style={{width:'50px',height:'50px'}}>
                                                    <CircularProgress/>
                                                </div>:
                                                <IconButton size='small' onFocus={()=>setstate({...state,delError:{exist:false,msg:''}})} onClick={()=>deleteForm(item[0])}>
                                                    <DeleteIcon fontSize='small' />
                                                </IconButton>         
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                </div>
                {
                   (open)?<NewForm open={open} setopen={setopen} project_id={props.project_id} />:<></>
                }
            </>
        )
    }
}

const mapStateToProps = state => ({
    forms:state.forms.forms
})

const mapDispatchToProps = dispatch => ({
    setForms:formsArray=>dispatch(setForms(formsArray))
})

export default connect(mapStateToProps,mapDispatchToProps)(Project)



