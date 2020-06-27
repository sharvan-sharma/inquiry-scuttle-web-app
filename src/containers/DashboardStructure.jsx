import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import DehazeIcon from '@material-ui/icons/Dehaze';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Brand from '../components/utils/Brand'
import Sidebar from '../components/dashboard/Sidebar'
import ProjectTabs from '../components/dashboard/ProjectTabs'
import InquiryTable from '../components/dashboard/InquiryTable'
import {Switch,Route} from 'react-router-dom'
import Project from '../components/dashboard/Project'


const drawerWidth = 50;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex' ,
    outline:'none !Important'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor:'#D9D9D9'
  },
}));

function DashboardStructure(props) {

  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const MainSidebar = (props)=>{
    return (
    <div className='bg-1 shadow text-white '>
        <div style={{marginTop:'5vh'}}/>
        <div className='d-flex flex-column justify-content-between align-items-center'  style={{minHeight:'95vh'}}>
            <Sidebar screen={props.screen}/>
        </div>
    </div>
    )
  }

  const Navbar = (props)=>{

      const NavStyle = {
          zIndex:1500
       }

      return (
        <nav className="navbar shadow navbar-expand-lg bg-black col-12 p-2 text-white position-fixed" style={NavStyle} >
            <div className='d-flex align-items-center ' >
                <div className='mr-2 mbl'>
                    <IconButton  color='inherit' className={classes.root} onClick={props.handleDrawerToggle}>
                        <DehazeIcon/>
                    </IconButton>
                </div>
                <div className='fmd'>
                    <Brand color='dark'/>
                </div>
            </div>
            <div className='navbar-toggler'>
                <IconButton size='small' color='inherit' className={classes.root} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <MoreVertIcon/>
                </IconButton>
            </div>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                
            </div>
        </nav>
      )
  }

  const container = window !== undefined ? () => window().document.body : undefined;

  return (<>
            <Navbar handleDrawerToggle={handleDrawerToggle} />
            <div className={classes.root}>
                <CssBaseline />
                <nav className={classes.drawer} aria-label="mailbox folders">
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                            paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            <MainSidebar/>
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                            paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            <MainSidebar/>
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <div style={{marginTop:'5vh'}} />
                    <div className='mbl' style={{marginTop:'10vh'}} />
                    <div className='d-flex justify-content-center col-12 p-0 p-md-1 p-lg-1' >
                            <div className='col-12 p-0 bg-white rounded shadow-sm' style={{minHeight:'90vh'}}>
                                <TabScreen screen={props.screen} />
                            </div>
                    </div>
                </main>
            </div>
        </>
  );
}

const TabScreen = (props)=>{
    switch(props.screen){
        case 0 : return <InquiryTable/>
        case 1 : return <ProjectTabs/>
        case 2 : {
            return (
                <Switch>
                    <Route exact path = '/project/:project_id' component={(prop)=>{
                        const project_id = prop.match.params.project_id
                        return <Project project_id={project_id} />
                    }}/>
                </Switch>
            )
        }
        default : console.log('dashboard structure def exec tabscreen')
    }
}

export default function DashboardRouter(){
return (
    <Switch>
        <Route exact path ='/' component={()=><DashboardStructure screen={0} />} />
        <Route exact path ='/projects' component={()=><DashboardStructure screen={1}/>}/>
        <Route exact path = '/project/:project_id' component={()=><DashboardStructure screen={2}/>} />
        <Route exact path = '/form/:project_id/:form_id' component={()=><DashboardStructure screen={3}/>} />
    </Switch>
)
}

