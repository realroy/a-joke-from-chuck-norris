import fetchJokes from '../../utils/resources'

export const initialState = {
  error: null,
  jokes: [],
  isFetching: false,
  options: {
  }
}

export const fetchJokesRequest = () => ({ type: 'FETCH_JOKES_REQUEST' })
export const fetchJokesSuccess = jokes => ({ type: 'FETCH_JOKES_SUCCESS', jokes })
export const fetchJokesFailure = error => ({ type: 'FETCH_JOKES_FAILURE', error })

export const getJokes = (dispatch, id, num, query) => {
  fetchJokesRequest()
  fetchJokes(id, num, query)
    .then(jokes => dispatch(fetchJokesSuccess(jokes)))
    .catch(error => dispatch(fetchJokesFailure(error)))
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
