import React,{useState} from 'react'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ExpandLess from '@material-ui/icons/ExpandLess'
import FilterLoader from '../FilterLoader'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import FilterIcon from '@material-ui/icons/FilterList'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/styles'

const useStyle = makeStyles({
    root:{
        outline:'none !important'
    }
})

const InquiryFilter = (props) => {

    const classes=useStyle()

    const [state,setstate] = useState({
        open:false,
        applied:false,
        filter:{
            read:[true,false],
            replied:[true,false],
            formsIdArray:[],
            mindate:props.createdAt,
            maxdate:new Date(),
            all:true
        }
    })

    const handleFilterUpdate = (open,applied,filter) => setstate({...state,open,applied,filter:updateFilters(applied,filter)})

    const updateFilters = (applied,filter) => {
        if(applied){
            return filter
        }else{
            return {
                read:[true,false],
                replied:[true,false],
                formsIdArray:[],
                mindate:props.createdAt,
                maxdate:new Date(),
                all:true
            }
        }
    }

    return (
        <>
        <Badge variant="dot" color="primary" invisible={!state.applied}>
            <div className='btn btn-light text-black d-flex align-items-center px-2 py-0'>
                <span className={(state.applied)?'text-danger mr-2 fsm':'mr-2 text-dark fsm'}>{(state.applied)?'Filters Applied!':'Filters'}</span>
                <IconButton className={classes.root} onClick={()=>setstate({...state,open:!state.open})} size='small' color='inherit'>
                    {
                        (state.open)?
                        <ExpandLess fontSize='small'/>:<FilterIcon fontSize='small'/>
                    }
                </IconButton>
            </div>
        </Badge>
            {
                (state.open)?<FilterLoader handleFilterUpdate={handleFilterUpdate} applied={state.applied} filter={state.filter} />:<></>
            }
        </>
    )

}

const mapStateToProps = state => ({createdAt:state.user.createdAt})

export default connect(mapStateToProps)(InquiryFilter)