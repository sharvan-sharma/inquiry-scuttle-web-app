import React,{useState} from 'react'
import Searchbar from './Searchbar'
import {Switch,Route} from 'react-router-dom'
import InquiryFilter from './navbar/InquiryFilter'


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