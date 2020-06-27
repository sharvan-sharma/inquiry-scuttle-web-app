import projectsActionsTypes  from './projects.types'

const addProject = project =>({
    type:projectsActionsTypes.ADD_PROJECT,
    payload:project
})

const setProjects = projectsArray => ({
    type:projectsActionsTypes.SET_PROJECTS,
    payload:projectsArray
})

export {addProject,setProjects}