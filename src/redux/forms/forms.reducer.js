import formsActionsTypes from './forms.types'

const INITIAL_STATE={
    forms:{}
}

const fomsReducer = (state = INITIAL_STATE,action)=>{
    switch(action.type){
        case formsActionsTypes.ADD_FORM : {
            let obj = state.forms
            obj[action.payload._id] = action.payload
            return ({...state,forms:obj})
        }
        case formsActionsTypes.SET_FORMS : {
            let obj = {}
            action.payload.forEach(form=>{
                obj[form._id] = form
            })
            return ({...state,forms:obj})
        }
        case formsActionsTypes.DEL_FORM : {
            let obj = state.forms
            delete obj[action.payload]
            return ({...state,forms:obj})
        }
        default: return state
    }
}

export default fomsReducer