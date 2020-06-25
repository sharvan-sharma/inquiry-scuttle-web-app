import React from 'react'
import Brand from '../components/utils/Brand'
import LogoutButton from '../components/dashboard/LogoutButton'

export default function DashboardRouter () {
    return (
        <div className='bg-pr full-screen d-flex justify-content-center align-items-center flex-column'>
            <div className='fxl my-2'> 
                <Brand color ='dark'/>
            </div>
            <LogoutButton/>
        </div>
    )
}