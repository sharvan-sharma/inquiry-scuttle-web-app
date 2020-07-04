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
    <div  className='border-bottom border-gray d-flex flex-wrap' >
        <div className='col-1 p-0'>
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
        </div>
        <div className='d-flex flex-wrap col-11 px-4 py-2 p-lg-0 p-md-0 align-items-center'>
            <div className='ff-rbt col-12 col-lg-2 col-md-3 p-0 overflow-hidden text-nowrap '>
                <b>{props.inquiry.name.firstname.substring(0,15)+(props.inquiry.name.lastname)}</b>
            </div>
            <div className='fsm ff-rbt col-12 col-lg-8 col-md-5 p-0 ovf' >
                <b>{props.inquiry.subject}</b>
                <span className='ovf' style={{width:'100vw'}}> - {props.inquiry.message}</span>
            </div>
            <div className='d-flex align-items-center p-2 justify-content-end  col-12 col-md-4 col-lg-2'>
                <div className='fsm'>{beautifyDate(props.inquiry.createdAt)}</div>
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
                <DeleteInquiry type='tile' inquiry_id={props.inquiry._id}/>
                <Link to={'/inquiry/'+props.inquiry._id} className='fxs text-decoration-none btn btn-3'  >
                    open
                </Link>
            </div>
        </div>
    </div>
)
}

export default InquiryTile