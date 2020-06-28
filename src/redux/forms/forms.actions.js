import formsActionsTypes  from './forms.types'

const addForm = form =>({
    type:formsActionsTypes.ADD_FORM,
    payload:form
})

const setForms = formsArray => ({
    type:formsActionsTypes.SET_FORMS,
    payload:formsArray
})

const delForm = form_id => ({
    type:formsActionsTypes.DEL_FORM,
    payload:form_id
})

export {addForm,setForms,delForm}