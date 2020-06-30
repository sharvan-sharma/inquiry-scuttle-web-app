import React from 'react'

const getDate = (date) => {
    const d = new Date(date)
    const year=d.getFullYear()
    const m=d.getMonth()
    const dt = d.getDate()
    const mm = ((m+1) < 10)?'0'+(m+1):(m+1)
    const dd = (dt < 10)?'0'+dt:dt


    return year+'-'+mm+'-'+dd
}

function DateFilter(props){

    return <input 
            type='date' 
            onChange={(e)=>props.handleChange(e.target.value,props.type)} 
            className='form-control'
            value={getDate(props.value)}
            min={getDate(props.min)}
            max={getDate(props.max)}
            /> 

}

export default DateFilter