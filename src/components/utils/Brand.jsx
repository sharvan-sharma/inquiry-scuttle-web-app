import React from 'react'
import {Link} from 'react-router-dom'

export default (props)=>{
    return (<Link to='/' className={(props.color === 'dark')?'text-decoration-none text-white-50':'text-decoration-none text-dark'}>
                <span className='mr-2'><b className={(props.color === 'dark')?'text-white':'text-pr'}>I</b>nquiry</span>
                <span><b className={(props.color === 'dark')?'text-white':'text-pr'}>S</b>cuttle</span>
            </Link>)
}