import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import Alert from '@material-ui/lab/Alert'
import axios from 'axios'
import AddIcon from '@material-ui/icons/Add'
import {setForms} from '../../redux/forms/forms.actions'
import { Checkbox } from '@material-ui/core'

function Project(props){

    const [state,setstate] = useState({
        loading:true,
        error:{exist:false,msg:''},
        project:{name:null}
    })


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
                       <button className='btn btn-3 flg d-flex align-items-center'>
                            <AddIcon/>
                            <span>Add form</span>
                       </button>
                   </div>
               </div>
               <div className='table-responsive'>
               <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">
                                <Checkbox size='small' />
                            </th>
                            <th scope="col">Name</th>
                            <th scope="col">Form - type</th>
                            <th scope="col">Form - id</th>
                            <th scope="col">Date of creation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.entries(props.forms).map(item=>{
                                return (
                                    <tr key={item[0]} className='border-bottom border-gray'>
                                        <th scope="row">
                                            <Checkbox size='small' />
                                        </th>
                                        <td>{item[1].name}</td>
                                        <td>{item[1].form_type}</td>
                                        <td>sfgdgfgsfdtr6feygfyghfgdyhgfy6yegffhgshdg</td>
                                        <td>Jun 25</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                </div>
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



