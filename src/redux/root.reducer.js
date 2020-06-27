import {combineReducers} from 'redux'
import userReducer from './user/user.reducer'
import projectsReducer from './projects/projects.reducer'
import formsReducer from './forms/forms.reducer'

export default combineReducers({
    user:userReducer,
    projects:projectsReducer,
    forms:formsReducer
})