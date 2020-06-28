import React from 'react'
import {connect} from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles,makeStyles } from '@material-ui/core/styles';
import ProfileMenu from './sidebar/ProfileMenu'
import Avatar from '@material-ui/core/Avatar';
import MessageIcon from '@material-ui/icons/Message';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import KeyIcon from '@material-ui/icons/VpnKey';
import {Link} from 'react-router-dom'

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

function Sidebar(props){

    const classes = useStyles();

    let activeClass = 'text-decoration-none text-white'
    let inactiveClass = 'text-decoration-none text-muted'

    return (
          <>
            <ul className='list-unstyled my-2'>
              <li className='d-flex justify-content-center my-2 py-2'>
                <Link to='/' className={(props.screen === 0)?activeClass:inactiveClass}>
                  <Tooltip title={'Inquires'} placement='right' arrow>
                      <MessageIcon/>
                  </Tooltip>
                </Link>
              </li>
              <li className='d-flex justify-content-center my-2 py-2'>
                <Link to='/projects' className={(props.screen === 1)?activeClass:inactiveClass}>
                    <Tooltip title={'Projects'} placement='right' arrow>
                        <AccountTreeIcon/>
                    </Tooltip>
                </Link>
              </li>
            </ul>
            <ul className='list-unstyled my-2'>
                <li className='d-flex justify-content-center my-1'>
                    <HtmlTooltip
                        placement='right'
                        title={<>
                        <div>
                            <span>{props.user.name.firstname}</span>
                            <br/>
                            <span>{props.user.email}</span>
                        </div>
                        </>}
                    >
                    {
                    (props.photo === null)?
                        <IconButton>
                            <AccountCircleIcon/>
                        </IconButton>:
                        <Avatar className={classes.small} alt="Remy Sharp"  src={props.user.photo} />
                    }
                    </HtmlTooltip>
                </li>
                <li className='d-flex justify-content-center my-2'>
                    <ProfileMenu/>
                </li>
            </ul>
        </>
    )
}

const mapStateToProps = state => ({
    user:state.user
})

export default connect(mapStateToProps)(Sidebar)