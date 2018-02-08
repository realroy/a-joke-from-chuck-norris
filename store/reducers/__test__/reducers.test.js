import { reducer, initialState, fetchJokesSuccess, fetchJokesFailure, updateOptions, nextJokeIndex } from '../index'

describe('joke reducer', () => {
  it('should return initial state at the beginning', () => {
    const actual = reducer(undefined, {})
    const expected = initialState
    expect(actual).toEqual(expected)
  })
  it('should handle FETCH_JOKES_REQUEST', () => {
    const action = { type: 'FETCH_JOKES_REQUEST' }
    const actual = reducer(undefined, action)
    const expected = {
      fetchingJokesError: null,
      fetchingNumberOfJokesError: null,
      jokes: [],
      maxJokes: 0,
      isFetchingJokes: true,
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
    expect(actual).toEqual(expected)
  })
  it('should handle FETCH_JOKES_SUCCESS', () => {
    const jokes = ['A', 'B', 'C']
    const action = fetchJokesSuccess(jokes)
    const actual = reducer(undefined, action)
    const expected = {
      fetchingJokesError: null,
      fetchingNumberOfJokesError: null,
      jokes: ['A', 'B', 'C'],
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
    expect(actual).toEqual(expected)
  })
  it('should handle FETCH_JOKES_FAILURE', () => {
    const action = fetchJokesFailure(new Error())
    const actual = reducer(undefined, action)
    const expected = {
      fetchingJokesError: new Error(),
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
    expect(actual).toEqual(expected)
  })
  it('should handle UPDATE_OPTIONS', () => {
    const action = updateOptions({ id: 1, num: 0, query: null })
    const actual = reducer(undefined, action)
    const expected = {
      fetchingJokesError: null,
      fetchingNumberOfJokesError: null,
      jokes: [],
      maxJokes: 0,
      isFetchingJokes: false,
      isFetchingNumberOfJokes: false,
      jokeIndex: 0,
      options: {
        query: {},
        num: 0,
        id: 1,
      },
    }
    expect(actual).toEqual(expected)
  })
  it('should not handle NEXT_JOKE_INDEX when jokeIndex === maxJokes', () => {
    const action = nextJokeIndex()
    const actual = reducer(undefined, action)
    const expected = {
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
    expect(actual).toEqual(expected)
  })
})
