import React,{useState,useRef,useEffect} from 'react'
import Slide from '@material-ui/core/Slide'
import axios from 'axios'
import {addForm} from '../../../redux/forms/forms.actions'
import {connect} from 'react-redux'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'
import TextField from '@material-ui/core/TextField'
import Alert from '@material-ui/lab/Alert'
import Loader from 'react-loader-spinner'

function NewForm(props){

    const fname = useRef('')

    const [state,setstate] = useState({
        form_name:'',
        form_type:'',
        progress:false,
        error:{exist:false,msg:''}
    })


    const submitForm = (e)=>{
        e.preventDefault()
        if(state.form_name.length < 3 || state.form_name.includes(' ')){
            setstate({...state,error:{exist:true,msg:"Form Name must be greater than 3 and doesn't contain space"}})
        }else{
            setstate({...state,progress:true})
            axios.post('/userapi/form/create',
            {
                project_id:props.project_id,
                form_name:state.form_name,
                form_type:state.form_type
            },{withCredentials:true})
            .then(result => {
                switch(result.data.status){
                    case 200 : props.addForm(result.data.form);props.setopen(false);break;
                    case 401 : setstate({...state,progress:false,error:{exist:true,msg:'Unauthorized'}});break;
                    case 423 : setstate({...state,progress:false,error:{exist:true,msg:`validation error type:${result.data.type}`}});break;
                    case 500 : setstate({...state,progress:false,error:{exist:true,msg:'something went wrong at our end'}});break;
                    default : console.log('crete form def exce')
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
                    <div className='d-flex align-items-center'>
                        <div>
                            <IconButton onClick={()=>props.setopen(false)}>
                                <ClearIcon/>
                            </IconButton>
                        </div>
                        <label className='m-0 text-muted ff-rbt fmd' >
                             Create a form
                        </label>
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
                        <span className='ff-rbt fmd'><b>Let's start with a name of form</b></span><b></b>
                    </div>
                    <div className='py-2 my-2'  >
                        <TextField
                        className='fxl'
                         id="standard-basic"
                         inputRef={fname}
                         required
                         inputProps={{
                             minLength:3,
                             maxLength:20
                          }}
                         onChange={()=>setstate({...state,form_name:fname.current.value})}
                         onFocus={()=>setstate({...state,error:{exist:false,msg:''}})}
                         placeholder='Enter your form name'  
                         label="Form name" />
                    </div>
                    <div className='py-2 my-2'  >
                         <RadioGroup aria-label="Select application type" name="Application Type" value={state.form_type} onChange={(e)=>setstate({...state,form_type:e.target.value})}>
                            <FormControlLabel value="csa" control={<Radio />} label="Client Side Application" />
                            <FormControlLabel value="ssa" control={<Radio />} label="Server Side Application" />
                         </RadioGroup>
                    </div>
                    {(state.progress)?
                        <Loader type="BallTriangle" color="black" height={50} width={50} />:
                        <button 
                        onFocus={()=>setstate({...state,error:{exist:false,msg:''}})}
                        className='fmd btn btn-3 p-2' 
                        disabled={state.progress || state.error.exist} type='submit'>
                                Create Form
                        </button>
                    }
                </form>
            </div>
        </Slide>)

}

const mapDispatchToProps = dispatch => ({
    addForm : form => dispatch(addForm(form))
})

export default connect(null,mapDispatchToProps)(NewForm)