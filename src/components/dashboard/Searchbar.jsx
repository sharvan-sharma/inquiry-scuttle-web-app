import React,{useState} from 'react'
import ErrorIcon from '@material-ui/icons/Error'
import Tooltip from '@material-ui/core/Tooltip'
import { CircularProgress } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import axios from 'axios'
import {setProjects} from '../../redux/projects/projects.actions'
import {setForms} from '../../redux/forms/forms.actions'
import {connect} from 'react-redux'
import IconButton from '@material-ui/core/IconButton'

function Searchbar(props){


    const [state,setstate] = useState({
        progress:{on:false,btn:null},
        error:{exist:false,msg:''},
        clear:false,
    })

    const generateResult = (array)=>{
        switch(props.type){
            case 'projects':props.setProjects(array);break;
            case 'forms':  props.setForms(array);break;
            default : console.log('gene res exec')
        }
    }

    const inputData = (query)=>{
        switch(props.type){
            case 'projects': return ({query,type:props.type});
            case 'forms': return ({project_id:props.project_id,query,type:props.type});
            default : console.log('input res exec');
        }
    }

    const search = (query,type)=>{
        setstate({...state,progress:{on:true,btn:type}})
        axios.post('/userapi/search',inputData(query),{withCredentials:true})
        .then( result => {
            switch(result.data.status){
                case 200 : generateResult(result.data.array);setstate({...state,progress:{on:false,btn:null},clear:(type === 'clear')?false:true});break;
                case 423 : setstate({...state,progress:{on:false,btn:null},error:{exist:true,msg:`validation error type : ${result.data.type}`}});break;
                case 401 : setstate({...state,progress:{on:false,btn:null},error:{exist:true,msg:'Unauthorised'}});break;
                case 500 : setstate({...state,progress:{on:false,btn:null},error:{exist:true,msg:'something went wrong'}});break;
                default : console.log('def search exec')
            }
        }).catch( err => {
            setstate({...state,progress:{on:false,btn:null},error:{exist:true,msg:'something went wrong'}})
        })
    }

    const handleSearchChange = (e)=>{
        if((e.target.value.length%3) === 0){
            if(e.target.value.length !== 0 ){
                search(e.target.value,'search')
            }else{
                search('.*','clear')
            }
        }
    }

    const clearError = ()=>setstate({...state,error:{exist:false,msg:''}})

    return (
        <div className = 'd-flex align-items-center flex-wrap'>
            <div className='d-flex align-items-center'>
                <div className='d-flex align-items-center bg-white rounded text-black'>
                    <input
                        placeholder='Search'
                        onFocus={clearError}
                        className='form-control border-0 fsm'
                        onChange = {handleSearchChange}
                    />
                    {
                        (state.progress.on && state.progress.btn === 'search')?
                        <CircularProgress size={20}/>
                        :<IconButton size='small' color='inherit' onFocus={clearError}>
                            <SearchIcon fontSize='small' className='text-muted' />
                        </IconButton>
                    }
                </div>
                {
                    (state.error.exist)?
                    <Tooltip arrow title={state.error.msg}>
                        <ErrorIcon className='text-danger m-1'/>
                    </Tooltip>:<></>
                }
            </div>
            {
                (state.clear)?
                <>
                {
                    (state.progress.on && state.progress.btn === 'clear')?
                    <CircularProgress size={20}/>:
                    <button className='btn btn-danger fsm m-1' onFocus={clearError} onClick={()=>search('.*','clear')}>
                        clear
                    </button>
                }
                </>:
                <></>
            }
        </div>
    )

}

const mapDispatchToProps = dispatch => ({
    setProjects : array => dispatch(setProjects(array)),
    setForms : array => dispatch(setForms(array))
})

export default connect(null,mapDispatchToProps)(Searchbar)