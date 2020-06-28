import React from 'react'
import DeleteInquiry from './DeleteInquiry'
import Checkbox from '@material-ui/core/Checkbox'
import beautifyDate from '../../../utils/beautifyDate'
import {Link} from 'react-router-dom'
import MailIcon from '@material-ui/icons/Mail';
import DraftsIcon from '@material-ui/icons/Drafts';
import Tooltip from '@material-ui/core/Tooltip'

function InquiryTile(props){
return (
    <tr  className='border-bottom border-gray'>
        <th scope="row">
                 <Checkbox
                    size='small'
                    checked={props.checked}
                    onChange={(e)=>{
                        if(e.target.checked){
                            props.addToDelArray(props.inquiry._id)
                        }else{
                            props.remToDelArray(props.inquiry._id)
                        }
                    }}
              />
        </th>
        <td className='ff-rbt'><b>{props.inquiry.name.firstname}</b></td>
        <td className='fsm ff-rbt'><b>{props.inquiry.subject}</b> - {props.inquiry.message}</td>
        <td className='d-flex align-items-center p-2 justify-content-end'>
            <div>{beautifyDate(props.inquiry.createdAt)}</div>
            {
                (props.inquiry.read)?
                <Tooltip arrow title='Already read'>
                    <DraftsIcon fontSize='small' className='text-muted mx-1'/>
                </Tooltip>
                :
                <Tooltip arrow title='Check out'>
                    <MailIcon fontSize='small'  className='text-muted mx-1'/>
                </Tooltip>
            }
             <DeleteInquiry inquiry_id={props.inquiry._id}/>
             <Link to={'/inquiry/'+props.inquiry._id} className='fxs text-decoration-none btn btn-3'  >
                 open
             </Link>
        </td>
    </tr>
)
}

export default InquiryTile