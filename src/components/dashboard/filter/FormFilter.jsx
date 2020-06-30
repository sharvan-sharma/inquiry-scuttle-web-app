import  React from 'react'
import SelectForm from './SelectForm'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

function FormFilter(props){
    
    return (
        <div className='text-dark'>
        <FormLabel component="legend">Select Forms</FormLabel>
        <RadioGroup aria-label="form" name="form1" value={props.all} onChange={(e)=>props.handleChange(e.target.value)}>
            <FormControlLabel value={true} control={<Radio />} label="All Forms" />
            <FormControlLabel value={false} control={<Radio />} label="Specific Forms" />
        </RadioGroup>
        {
            (!props.all)?
            <SelectForm formsIdArray={props.formsIdArray} addToFormsIdArray={props.addToFormsIdArray} remFromFormsIdArray={props.remFromFormsIdArray}/>:<></>
        }
        </div>
    )

}

export default FormFilter