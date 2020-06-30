import React from 'react'
import Brand from '../utils/Brand'
import {Link} from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import DehazeIcon from '@material-ui/icons/Dehaze';
import {makeStyles} from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
  root: {
      outline:'none !important'
  }
}))

export default function Navbar(){

    const classes = useStyles()

    return (
    <div className='d-flex flex-column align-items-center col-12 p-0' style={{position:'fixed',top:0,left:0,zIndex:200}}>
       <div className='col-12 col-lg-11 col-md-11'>
        <nav className="navbar navbar-expand-lg bg-white shadow my-2 rounded">
            <div className='fmd mx-2'>
                <Brand color='light' />
            </div>
            <IconButton classes={{root:classes.root}} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <DehazeIcon/>
            </IconButton>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item p-2">
                        <Link to='/about' className='text-decoration-none text-4 fsm'>About Us</Link>
                    </li>
                    <li className="nav-item p-2">
                         <Link to='/contact' className='text-decoration-none text-4 fsm'>Contact</Link>
                    </li>
                </ul>
                <div className='d-flex'>
                   <Link className='btn btn-outline-3 mr-1 fsm' to='/login'>Login</Link>
                   <Link className='btn btn-3 fsm' to='/signup'>Signup</Link>
                </div>
            </div>
          </nav>
        </div>
    </div>
    )
}