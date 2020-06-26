import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import ClearIcon from '@material-ui/icons/Clear'

function InquiryTable(){
return (<>
<div className='d-flex align-items-center  border-bottom border-dark col-12 '>
    <Checkbox
        defaultChecked
        color="default"
        size='small'
        inputProps={{ 'aria-label': 'checkbox with default color' }}
    />
    <div className='d-flex justify-content-between p-0 col-11'>
        <div className='d-flex flex-wrap col-10 col-lg-11 col-md-11 p-0'>
            <div className='ff-rbt fsm col-12 col-md-4 col-lg-3 bold'><b>Sharvan Sharma</b></div>
            <div className='col-12 col-md-8 col-lg-9 d-flex flex-wrap'>
                <span className='fsm ff-rbt'><b>This is the dummy subject</b></span>
                <span className='fsm '>-</span>
                <span className='fsm text-muted'>This is the dummy subject. This is the dummy subject</span>
            </div>
        </div>
        <div className='ff-mst fsm bold'>Jun 25</div>
    </div>
</div>
    <Snackbar
        anchorOrigin={{vertical:"bottom", horizontal:"center" }}
        open={true}
    >
         <div className='d-flex align-items-center bg-snack rounded-pill text-white'>
                <div className='p-2'>
                    <IconButton size='small' color='inherit'>
                        <ClearIcon fontSize='small'/>
                    </IconButton>
                </div>
                <div className='p-2 d-flex align-items-center '>
                    <span className='p-1 fxs bg-primary rounded-pill mr-2'>20</span>
                    <span>items selected</span>   
                </div>
                <div className='p-2'>
                    <button className='btn btn-danger d-flex rounded-pill align-items-center px-3'>
                        <div className='mr-1'>
                            <DeleteIcon fontSize='small'/>
                        </div>
                        <span>Delete</span>
                    </button>
                </div>
            </div>   
    </Snackbar>
 
</>)
}

export default InquiryTable