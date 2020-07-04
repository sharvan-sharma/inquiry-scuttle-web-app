import inquiriesActionType from './inquires.type'


const INITIAL_STATE = {
    inquiries:{

    }
}

const inquiriesReducer = (state = INITIAL_STATE,action)=>{
    switch(action.type){
        case inquiriesActionType.SET_INQUIRIES : {
            let obj = {}
            action.payload.forEach(inquiry=>{obj[inquiry._id]=inquiry})
            return ({...state,inquiries:obj})
        }
        case inquiriesActionType.ADD_INQUIRY : {
            let obj = state.inquiries
            obj[action.payload._id] = action.payload
            return ({...state,inquiries:{...obj}})
        }
        case inquiriesActionType.DEL_INQUIRY:{
            let obj = state.inquiries
            delete obj[action.payload]
            return ({...state,inquiries:{...obj}})
        }
        case inquiriesActionType.DEL_MUL_INQUIRIES:{
            let obj = state.inquiries
            action.payload.forEach(id=>{
               delete  obj[id]
            })
            return ({...state,inquiries:{...obj}})
        }
        default : return state
    }
}

export default inquiriesReducer