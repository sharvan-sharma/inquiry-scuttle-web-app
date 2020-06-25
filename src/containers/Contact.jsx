import React,{useRef} from 'react'
import Brand from '../components/utils/Brand'
import MailIcon from '@material-ui/icons/Mail'
import TextField from '@material-ui/core/TextField'
import SendIcon from '@material-ui/icons/Send';

export default function Contact () {

    const name = useRef('')
    const message = useRef('')
    const email = useRef('')

    const submitForm = (e)=>{
        e.preventDefault()
    }

    return (
        <div className='d-flex bg-pr '>
            <div className='col-12 col-md-6 col-lg-6 text-white d-flex justify-content-center pc '>
                <div className='col-12 col-md-10 col-lg-10 full-screen d-flex justify-content-around flex-column'>
                    <div className='fxl'>
                        <Brand color='dark'/>
                    </div>
                    <div >
                       <p className='fxl ff-mst mb-0'>Let's talk</p>
                       <p className='ff-mst'>
                            Ask us anything about Inquiry Scuttle or just say hi...
                       </p>
                       <a href="https://www.freepik.com/free-photos-vectors/technology">
                          <img src = '/images/illustrations/contact.jpg' className='rounded img-fluid pc' />
                       </a>
                    </div>
                    <a href="mailto:inquiry.scuttle.service@gmail.com" className='d-flex text-decoration-none text-white align-items-center'>
                        <MailIcon/> inquiry.scuttle.service@gmail.com
                    </a>
                </div>
            </div>
            <div className='col-12 col-md-6 col-lg-6 bg-white d-flex justify-content-center'>
                <form onSubmit={submitForm} className='col-12 col-md-10 col-lg-10 full-screen d-flex flex-column justify-content-center'>
                    <div className='fxl mbl'>
                        <Brand color='light'/>
                    </div>
                    <div className='mbl '>
                       <p className='fmd mb-0'>Let's talk</p>
                       <p className='ff-mst fsm text-pr'>
                            Ask us anything about Inquiry Scuttle or just say hi...
                       </p>
                    </div>
                    <div className='pc '>
                       <p className='ff-mst text-pr'>
                            Write us some few words...
                       </p>
                    </div>
                    <div className='my-2'><TextField id="standard-basic" inputRef={name} required label="Name" fullWidth/></div>
                    <div className='my-2'><TextField id="standard-basic" inputRef={email} required type='email' label="Email" fullWidth/></div>
                    <div className='my-2'>
                        <p className='fsm text-pr '>Remaining Characters 500/500</p>
                        <TextField id="standard-basic" label="Message" inputRef={message} fullWidth multiline rowsMax={4}/>
                    </div>
                    <div className='my-2'><button type='submit' className='btn btn-3'>Send <SendIcon/></button></div>
                    <a href="mailto:inquiry.scuttle.service@gmail.com" className='mbl d-flex text-decoration-none text-pr align-items-center'>
                        <MailIcon/> inquiry.scuttle.service@gmail.com
                    </a>
                </form>
            </div>
        </div>
    )
}