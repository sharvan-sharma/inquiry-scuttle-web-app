import React,{useState} from 'react'
import {connect} from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ExpandLess from '@material-ui/icons/ExpandLess'
import CheckBox from '@material-ui/core/Checkbox'


function Forms(props){
    const [open, setopen] = useState(false);
    
    return (
        <div>
            <div className='d-flex btn btn-secondary rounded-0 border-bottom border-black fsm align-items-center'>{props.name}
            {(props.formsArray.length === 0)?<></>:
                <IconButton size='small' onClick={()=>setopen(!open)} color='inherit'>
                    {(open)?<ExpandLess fontSize='small'/>:<ExpandMore fontSize='small'/>}
                </IconButton>
            }
            </div>
            {
            (open  && props.formsArray.length !== 0)?
            <div className='bg-dark overflow-auto' style={{top:'0',left:'100%',zIndex:300,maxHeight:'40vh'}}>
                <ul className='list-unstyled rounded shadow m-0' >
                    {
                        props.formsArray.map(form=><li className='bg-dark text-white p-2' key={form._id}>
                            <CheckBox size='small' onChange={(e)=>{
                                if(e.target.checked){
                                    props.addToFormsIdArray(form._id)
                                }else{
                                    props.remFromFormsIdArray(form._id)
                                }
                            }} />
                            {form.name}
                            </li>)
                    }
                </ul>
            </div>
            
            :<></>
        }
        </div>
    )
}

function SelectForm(props){

    const [open, setopen] = useState(false);
    

return (
    <div>
            <button onClick={()=>setopen(!open)} className='d-flex btn btn-secondary fsm align-items-center justify-content-end'>
                <span className='mr-2'>Select Forms</span>
                {(open)?<ExpandLess fontSize='small'/>:<ExpandMore fontSize='small'/>}
            </button>
         {
        (open)?
        <div className='bg-dark overflow-auto' style={{position:'absolute',top:'100%',zIndex:300,maxHeight:'40vh'}}>
            <ul className='list-unstyled rounded shadow m-0' >
                {
                    props.projects.map(project=><Forms
                                                    addToFormsIdArray={props.addToFormsIdArray} 
                                                    remFromFormsIdArray={props.remFromFormsIdArray} 
                                                    key={project._id} 
                                                    name={project.name} 
                                                    formsArray={project.formsArray}/>)
                }
            </ul>
        </div>
        
        :<></>
    }
    </div>
)
}
const mapStateToProps = state => ({
    projects : state.filter.projects
})
export default connect(mapStateToProps)(SelectForm)