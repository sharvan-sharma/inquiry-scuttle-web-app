import filterTypes from './filters.type'

const INITIAL_STATE = {
    fetched:false,
    projects:[]
}

const filterReducer = (state = INITIAL_STATE,action) => {
    switch(action.type){
        case filterTypes.SET_FILTERS : {
            const {projects,forms} = action.payload
            const projectsArray = projects.map( project => {
                const formsArray = forms.filter(form => {
                    if(form.project_id === project._id){
                        return form
                    }
                })

                return {...project,formsArray}
            })

            return ({...state,fetched:true,projects:projectsArray})
        }
        default:return state
    }
}

export default filterReducer