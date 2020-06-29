import React,{useState} from 'react'
import Searchbar from './Searchbar'
import {Switch,Route} from 'react-router-dom'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ExpandLess from '@material-ui/icons/ExpandLess'
import FilterLoader from './FilterLoader'
import IconButton from '@material-ui/core/IconButton'

const InquiryFilter = () => {
    const [open,setopen] = useState(false)

    return (
        <>
            <div className='btn btn-light text-black d-flex align-items-center'>
                <span className='mr-2'>Filters</span>
                <IconButton onClick={()=>setopen(!open)} size='small' color='inherit'>
                    {
                        (open)?
                        <ExpandLess fontSize='small'/>:<ExpandMore  fontSize='small'/>
                    }
                </IconButton>
            </div>
            {
                (open)?<FilterLoader setopen={setopen}/>:<></>
            }
        </>
    )

}

function Navbar(props){
    switch(props.screen){
        case 0 : return <InquiryFilter/>
        case 1 : return <Searchbar type='projects' />
        case 2 : {
                    return (
                        <Switch>
                            <Route exact path = '/project/:project_id' component={(prop)=>{
                                const project_id = prop.match.params.project_id
                                return <Searchbar type='forms' project_id={project_id} />
                            }}/>
                        </Switch>
                    )
                }
        default : return <></>
    }
}

export default Navbar