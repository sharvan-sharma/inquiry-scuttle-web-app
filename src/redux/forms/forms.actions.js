import formsActionsTypes  from './forms.types'

const addForm = form =>({
    type:formsActionsTypes.ADD_FORM,
    payload:form
})

const setForms = formsArray => ({
    type:formsActionsTypes.SET_FORMS,
    payload:formsArray
})

export {addForm,setForms}