import fetchJokes from '../../utils/resources'

export const initialState = {
  error: null,
  jokes: [],
  isFetching: false,
}

export const getJokes = (dispatch, id, num, query) => {
  dispatch({ type: 'FETCH_JOKES_REQUEST' })
  fetchJokes(id, num, query)
    .then(jokes => dispatch({ type: 'FETCH_JOKES_SUCCESS', jokes }))
    .catch(error => dispatch({ type: 'FETCH_JOKES_FAILURE', error }))
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_JOKES_REQUEST':
      return { ...state, isFetching: true }
    case 'FETCH_JOKES_SUCCESS':
      return {
        ...state, isFetching: false, jokes: action.jokes, error: null,
      }
    case 'FETCH_JOKES_FAILURE':
      return { ...state, isFetching: false, error: action.error }
    default:
      return state
  }
}
