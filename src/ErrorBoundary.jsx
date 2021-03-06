import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

 

  render() {
    if (this.state.hasError) {
      return (<div className = 'full-screen d-flex justify-content-center align-items-center bg-pr text'>
                    <div className='col-12 col-lg-6 col-md-8 col-xl-4'>
                        {/* <p className='fxl my-4'><Brand color='light'/></p> */}
                        <p className='fxl text-danger ff-mst mb-0' >We're fixing it</p>
                        <p className='bold text-white mt-0 fsm'>This Page is having some technical hiccups. We know about the Problem and we're working to get things back to normal quickly.</p>
                        <p className='my-4'><a href='https://inquiryscuttle.web.app' className='text-decoration-none rounded-pill text-dark btn ff-mst btn-light'>Back To <b>I</b>nquiry<b>S</b>cuttle</a></p>
                    </div>
      </div>)
    }

    return this.props.children; 
  }
}

export default ErrorBoundary