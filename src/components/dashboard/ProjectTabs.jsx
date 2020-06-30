import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import ProjectEditor from './projecttabs/ProjectEditor'
import AddIcon from '@material-ui/icons/Add'
import Loader from 'react-loader-spinner'
import {setProjects} from '../../redux/projects/projects.actions'
import Alert from '@material-ui/lab/Alert'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip'

function ProjectTabs(props){

    const [open,setopen] = useState(false)

    const [state,setstate] = useState({
        loading:true,
        error:{exist:false,msg:''}
    })

    useEffect(()=>{
        axios.get('/userapi/readall/projects',{withCredentials:true})
        .then(result => {
            switch(result.data.status){
                case 200:props.setProjects(result.data.projectsArray);setstate({...state,loading:false});break;
                case 401:setstate({...state,loading:false,error:{exist:true,msg:'Unauthorized access'}});break;
                case 500 :setstate({...state,loading:false,error:{exist:true,msg:'Something went wrong while loading projects'}});break;
                default :console.log('def exec project loading')
            }
        })
        .catch(err=>{
            setstate({...state,loading:false,error:{exist:true,msg:'Something went wrong while loading projects'}})
        })
    },[])

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
             <div className='col-12 p-0 d-flex justify-content-center'>
              <div className='col-12 col-md-10 col-lg-8 p-0'>
                <p className='p-4 fxl ff-mst text-center text-pr border-bottom border-gray'>Your Inquiry Scuttle Projects</p> 
                <div className='col-12 p-0 d-flex flex-wrap'>
                    <div className='col-12 col-md-6 col-lg-4 p-4' >
                        <div className='rounded shadow-sm p-main-tile p-4 d-flex flex-column justify-content-center align-items-center' style={{minHeight:'20vh'}} onClick={()=>setopen(true)}>
                            <AddIcon className='fmd text-pr my-2'/> 
                            <p className='fmd text-pr'>Add project</p>
                        </div> 
                    </div>
                    {
                        Object.entries(props.projects).map(item=>{
                            return (
                               
                                    <div className='col-12 col-md-6 col-lg-4 p-4' key={item[0]}>
                                        <Link to={'/project/'+item[0]} className='text-decoration-none'>
                                            <div className='rounded shadow-sm p-tile p-4' style={{minHeight:'20vh'}}>
                                                <Tooltip arrow title={item[1].name}>
                                                    <p className='fmd ff-mst'>{item[1].name.substring(0,20)+((item[1].name.length > 20)?'...':'')}</p>
                                                </Tooltip>
                                            </div>
                                        </Link>
                                    </div>
                            )
                        })
                    }
                </div>
                {
                    (open)?<ProjectEditor open={open} setopen={setopen} />:<></>
                }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    projects:state.projects.projects
})
const mapDispatchToProps = dispatch =>({
    setProjects:projectsArray => dispatch(setProjects(projectsArray))
})

export default connect(mapStateToProps,mapDispatchToProps)(ProjectTabs);