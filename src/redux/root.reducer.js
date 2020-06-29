import {combineReducers} from 'redux'
import userReducer from './user/user.reducer'
import projectsReducer from './projects/projects.reducer'
import formsReducer from './forms/forms.reducer'
import filterReducer from './filters/filters.reducer'
import inquiriesReducer from './inquires/inquires.reducer'

export default combineReducers({
    user:userReducer,
    projects:projectsReducer,
    inquiries:inquiriesReducer,
    forms:formsReducer,
    filter:filterReducer
})