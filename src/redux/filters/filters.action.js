import filtertypes from './filters.type'

const setFilters = obj => ({
    type : filtertypes.SET_FILTERS,
    payload:obj
})

export {setFilters}