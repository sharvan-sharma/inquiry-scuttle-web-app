import inquiriesActionTypes from './inquires.type'

const setInquiries = inquiriesArray => ({
    type:inquiriesActionTypes.SET_INQUIRIES,
    payload:inquiriesArray
})

const addInquiry = inquiry =>({
    type:inquiriesActionTypes.ADD_INQUIRY,
    payload:inquiry
})

const delInquiry = inquiry_id => ({
    type:inquiriesActionTypes.DEL_INQUIRY,
    payload:inquiry_id
})

const delMulInquiries = delArray => ({
    type:inquiriesActionTypes.DEL_MUL_INQUIRIES,
    payload:delArray
})

export {setInquiries,addInquiry,delInquiry,delMulInquiries}