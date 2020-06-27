import React,{useRef,useState} from 'react';
import Slide from '@material-ui/core/Slide'
import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'
import TextField from '@material-ui/core/TextField'
import axios from 'axios';
import Alert from '@material-ui/lab/Alert'
import {connect} from 'react-redux'
import {addProject} from '../../../redux/projects/projects.actions'
import Loader from 'react-loader-spinner'

function ProjectEditor (props){
    const pname = useRef('')

    const [state,setstate] = useState({
        progress:false,
        error:{exist:false,msg:''}
    })

    const submitForm = (e)=>{
        e.preventDefault()
        if(pname.current.value.length < 3 || pname.current.value.includes(' ')){
            setstate({...state,error:{exist:true,msg:"Project Name must be greater than 3 and doesn't contain space"}})
        }else{
            setstate({...state,progress:true})
            axios.post('/userapi/project/create',{project_name:pname.current.value},{withCredentials:true})
            .then(result => {
                switch(result.data.status){
                    case 200 : props.addProject(result.data.project);props.setopen(false);break;
                    case 401 : setstate({...state,progress:false,error:{exist:true,msg:'Unauthorized'}});break;
                    case 423 : setstate({...state,progress:false,error:{exist:true,msg:`validation error type:${result.data.type}`}});break;
                    case 500 : setstate({...state,progress:false,error:{exist:true,msg:'something went wrong at our end'}});break;
                    default : console.log('crete project def exce')
                }
            })
            .catch(err => {
                setstate({...state,progress:false,error:{exist:true,msg:'something went wrong at our end'}})
            })
        }
    }

    return (
        <Slide direction="right" in={props.open} mountOnEnter unmountOnExit>
            <div className='bg-white full-screen d-flex justify-content-center align-items-center col-12 p-2' style={{position:'fixed',top:0,left:0,zIndex:3000}}>
                <form onSubmit={submitForm} className='col-12 col-lg-8 col-md-10'>
                    <div className='d-flex '>
                        <div>
                            <IconButton onClick={()=>props.setopen(false)}>
                                <ClearIcon/>
                            </IconButton>
                        </div>
                        <label className='m-0 text-muted ff-rbt fxl' >Create a project</label>
                    </div>
                    <hr/>
                    {
                        (state.error.exist)?
                        <div>
                            <Alert severity='error' variant="outlined" className='fmd ff-mst'>{state.error.msg}</Alert>
                        </div>:
                        <></>
                    }
                    <div className='py-4'>
                        <span className='ff-rbt fxl'><b>Let's start with a name of project</b></span><b></b>
                    </div>
                    <div className='py-2 my-2'  >
                        <TextField
                        className='fxl'
                         id="standard-basic"
                         inputRef={pname}
                         required
                         inputProps={{
                             minLength:3,
                             maxLength:20
                          }}
                         onFocus={()=>setstate({...state,error:{exist:false,msg:''}})}
                         placeholder='Enter your project name'  
                         label="Project name" />
                    </div>
                    {(state.progress)?
                        <Loader type="BallTriangle" color="black" height={50} width={50} />:
                        <button 
                        onFocus={()=>setstate({...state,error:{exist:false,msg:''}})}
                        className='fmd btn btn-3 p-2' 
                        disabled={state.progress || state.error.exist} type='submit'>
                                Create Project
                        </button>
                    }
                </form>
            </div>
        </Slide>
    )
}

const mapDispatchToProps = dispatch=>({
    addProject: project=>dispatch(addProject(project))
})

export default  connect(null,mapDispatchToProps)(ProjectEditor);