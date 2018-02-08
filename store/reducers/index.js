import { fetchJokes, fetchNumberOfJokes } from '../../utils/resources'

export const initialState = {
  fetchingJokesError: null,
  fetchingNumberOfJokesError: null,
  jokes: [],
  maxJokes: 0,
  isFetchingJokes: false,
  isFetchingNumberOfJokes: false,
  jokeIndex: 0,
  options: {
    query: {
      firstName: 'Chuck',
      lastName: 'Norris',
    },
    num: 1,
    id: 0,
  },
}

export const nextJokeIndex = () => ({ type: 'NEXT_JOKE_INDEX' })
export const prevJokeIndex = () => ({ type: 'PREV_JOKE_INDEX' })
export const goToJokeIndex = index => ({ type: 'GO_TO_JOKE_INDEX', index })

export const updateOptions = ({ id, num, query }) => ({
  type: 'UPDATE_OPTIONS',
  id,
  num,
  query,
})
export const fetchNumberOfJokesRequest = () => ({ type: 'FETCH_NUMBER_OF_JOKES_REQUEST' })
export const fetchNumberOfJokesSuccess = maxJokes => ({ type: 'FETCH_NUMBER_OF_JOKES_SUCCESS', maxJokes })
export const fetchNumberOfJokesFailure = error => ({ type: 'FETCH_NUMBER_OF_JOKES_FAILURE', error })

export const fetchJokesRequest = () => ({ type: 'FETCH_JOKES_REQUEST' })
export const fetchJokesSuccess = jokes => ({ type: 'FETCH_JOKES_SUCCESS', jokes })
export const fetchJokesFailure = error => ({ type: 'FETCH_JOKES_FAILURE', error })

export const getJokes = (dispatch, id, num, query) => {
  dispatch(fetchJokesRequest())
  fetchJokes(id, num, query)
    .then(jokes => dispatch(fetchJokesSuccess(jokes)))
    .catch(error => dispatch(fetchJokesFailure(error)))
}

export const getNumberOfJokes = (dispatch) => {
  dispatch(fetchNumberOfJokesRequest())
  fetchNumberOfJokes()
    .then(number => dispatch(fetchNumberOfJokesSuccess(number)))
    .catch(error => dispatch(fetchNumberOfJokesFailure(error)))
}

export const isInRange = (testValue, startingPoint, endingPoint) => (
  testValue <= endingPoint &&
  testValue >= startingPoint
)

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_JOKES_REQUEST':
      return { ...state, isFetchingJokes: true }
    case 'FETCH_JOKES_SUCCESS':
      return {
        ...state, isFetchingJokes: false, jokes: action.jokes, fetchingJokesError: null,
      }
    case 'FETCH_JOKES_FAILURE':
      return { ...state, isFetchingJokes: false, fetchingJokesError: action.error }
    case 'UPDATE_OPTIONS':
      return {
        ...state,
        options: {
          id: action.id,
          num: action.num,
          query: {
            ...action.query,
          },
        },
      }
    case 'NEXT_JOKE_INDEX':
      return {
        ...state,
        jokeIndex: state.jokeIndex < state.jokes.length - 1 ? state.jokeIndex + 1 : state.jokeIndex,
      }
    case 'PREV_JOKE_INDEX':
      return {
        ...state,
        jokeIndex: state.jokeIndex >= 1 ? state.jokeIndex - 1 : state.jokeIndex,
      }
    case 'FETCH_NUMBER_OF_JOKES_REQUEST':
      return {
        ...state,
        isFetchingNumberOfJokes: true,
      }
    case 'FETCH_NUMBER_OF_JOKES_SUCCESS':
      return {
        ...state,
        isFetchingNumberOfJokes: false,
        maxJokes: action.maxJokes,
      }
    case 'FETCH_NUMBER_OF_JOKES_FAILURE':
      return {
        ...state,
        isFetchingNumberOfJokes: false,
        fetchingNumberOfJokesError: action.error,
      }
    case 'GO_TO_JOKE_INDEX':
      return {
        ...state,
        jokeIndex: isInRange(action.index, 0, state.jokes.length)
          ? action.index
          : state.jokeIndex,
      }
    default:
      return state
  }
}

export default reducer

