import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {makeStyles} from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import SettingsIcon from '@material-ui/icons/Settings';
import LogoutButton from '../LogoutButton'

const useStyle = makeStyles({
    root:{
        outline:'none !important'
    }
})

export default function ProfileMenu() {
    const classes = useStyle()

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleIconChange = (event)=>{
    if(anchorEl !== null){
      setAnchorEl(null);
    }else{
      setAnchorEl(event.currentTarget);
    }
  }

  return (
    <div>
        <IconButton color='inherit' size='small' onClick={handleIconChange} className={classes.root}>
                <SettingsIcon />
        </IconButton>
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <MenuItem onClick={handleClose}>
              <div className='text-center col-12 p-0'>Profile</div>
            </MenuItem>
            <MenuItem><LogoutButton/></MenuItem>
        </Menu>
    </div>
  );
}
