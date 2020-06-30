import userActionTypes  from './user.types'

const InitialState = {
    email:null,
    name:{
        firstname:null,
        lastname:null,
        middlename:null
    },
    logged_in:false,
    photo:null,
    createdAt:null
}

const userReducer = (state=InitialState,action)=>{
    switch(action.type){
        case userActionTypes.SET_CURRENT_USER : {
            return ({
                ...state,
                email:action.payload.email,
                name:action.payload.name,
                photo:action.payload.photo,
                logged_in:action.payload.logged_in,
                createdAt:action.payload.createdAt
            })
        }
        default : return state
    }
}

export default userReducer