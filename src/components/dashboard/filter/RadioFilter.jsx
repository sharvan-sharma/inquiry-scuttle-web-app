import React from 'react'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

function RadioFilter(props){

    const getvalue = (v)=>{
        switch(v){
            case 't':return [true]
            case 'f':return [false]
            case 'tf':return [true,false]
            default:console.log('getvalue def exec')
        }
    }

    const initVal = (v)=>{
        if(v.length === 1){
            if(v[0] === true){
                return 't'
            }else{
                return 'f'
            }
        }else{
            return 'tf'
        }
    }

    return(
        <div className='d-flex flex-column'>
        <FormLabel component="legend">{(props.type === 'read')?'Read ':'Replied '}filter</FormLabel>
        <RadioGroup aria-label={props.type} name={props.type+'1'} value={initVal(props.value)} onChange={(e)=>props.handleChange(getvalue(e.target.value),props.type)}>
            {
                props.data.map((ele,index)=>{
                    return  <FormControlLabel key={index} disabled={props.disabled} value={ele.value} control={<Radio disabled={props.disabled} />} label={ele.label} />
                })
            }
        </RadioGroup>
        </div>
    )

}

export default RadioFilter