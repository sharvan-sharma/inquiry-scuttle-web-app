import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import ClearIcon from '@material-ui/icons/Clear'

function InquiryTable(){
return (<>
            <div className='table-responsive'>
               <table className="table">
                    {/* <thead className="thead-dark">
                        <tr>
                            <th scope="col">
                                <Checkbox size='small' />
                            </th>
                            <th scope="col">Name</th>
                            <th scope="col">Form - type</th>
                            <th scope="col">Form - id</th>
                            <th scope="col">Date of creation</th>
                        </tr>
                    </thead> */}
                    <tbody>
                        {/* {
                            Object.entries(props.inquires).map(item=>{
                                return (
                                    <tr key={item[0]} className='border-bottom border-gray'>
                                        <th scope="row">
                                            <Checkbox size='small' />
                                        </th>
                                        <td>{item[1].name}</td>
                                        <td>{item[1].form_type}</td>
                                        <td>sfgdgfgsfdtr6feygfyghfgdyhgfy6yegffhgshdg</td>
                                        <td>Jun 25</td>
                                    </tr>
                                )
                            })
                        } */}

                         <tr  className='border-bottom border-gray'>
                            <th scope="row">
                                <Checkbox size='small' />
                            </th>
                            <td className='fsm ff-rbt'><b>Sharvan Sharma</b></td>
                            <td><b>This is a dummy subject</b> - this is dummy inquiry message</td>
                            <td>Jun 25</td>
                        </tr>
                    </tbody>
                </table>
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