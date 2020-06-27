import projectsActionsTypes from './projects.types'

const INITIAL_STATE={
    projects:{}
}

const projectsReducer = (state = INITIAL_STATE,action)=>{
    switch(action.type){
        case projectsActionsTypes.ADD_PROJECT : {
            let obj = state.projects
            obj[action.payload._id] = action.payload
            return ({...state,projects:obj})
        }
        case projectsActionsTypes.SET_PROJECTS : {
            let obj = {}
            action.payload.forEach(project=>{
                obj[project._id] = project
            })
            return ({...state,projects:obj})
        }
        default: return state
    }
}

export default projectsReducer