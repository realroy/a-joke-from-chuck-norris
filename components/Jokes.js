import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { nextJokeIndex, prevJokeIndex, goToJokeIndex } from '../store/reducers'

import FlexBox from './FlexBox'
import { Input } from './Form'

const mapStateToProps = ({ jokes, isFetchingJokes, jokeIndex }) => ({
  jokes,
  isFetchingJokes,
  jokeIndex,
})

const mapDispatchToProps = dispatch => ({
  dispatchNextJoke: () => dispatch(nextJokeIndex()),
  dispatchPrevJoke: () => dispatch(prevJokeIndex()),
  dispatchGoToJokeIndex: (event) => {
    const value = parseInt(event.target.value, 10) || 0
    dispatch(goToJokeIndex(value))
  },
})

const Jokes = ({
  jokes,
  isFetchingJokes,
  jokeIndex,
  dispatchNextJoke,
  dispatchPrevJoke,
  dispatchGoToJokeIndex,
}) =>
  (isFetchingJokes ? (
    <FullWidthFlexbox direction="column" justify="center" alignItems="center">
      <JokeQuote>Now Loading...</JokeQuote>
    </FullWidthFlexbox>
  ) : (
    <FullWidthFlexbox direction="column" alignItems="center">
      <FullWidthFlexbox justify="space-between" alignItems="center">
        <SVGButton onClick={dispatchPrevJoke}>
          <img src="/static/imgs/arrow_back.svg" alt="previous-joke" />
        </SVGButton>
        <JokeQuote>{jokes[jokeIndex]}</JokeQuote>
        <SVGButton onClick={dispatchNextJoke}>
          <img src="/static/imgs/arrow_forward.svg" alt="next-joke" />
        </SVGButton>
      </FullWidthFlexbox>
      <JokePagination>
        <Input
          type="number"
          min="1"
          max={jokes.length}
          onChange={dispatchGoToJokeIndex}
          value={jokeIndex + 1}
        />
        <span> of {jokes.length}</span>
      </JokePagination>
    </FullWidthFlexbox>
  ))

Jokes.propTypes = {
  jokes: PropTypes.arrayOf(PropTypes.string).isRequired,
  isFetchingJokes: PropTypes.func.isRequired,
  jokeIndex: PropTypes.number.isRequired,
  dispatchNextJoke: PropTypes.func.isRequired,
  dispatchPrevJoke: PropTypes.func.isRequired,
  dispatchGoToJokeIndex: PropTypes.func.isRequired,
}

const FullWidthFlexbox = FlexBox.extend`
  width: 100%;
`

const SVGButton = styled.button`
  background: none;
  border: none;
  transition: ease-out 0.5s;
  &:hover {
    transform: scale(1, 1.2);
    cursor: pointer;
  }
`
const JokeQuote = styled.h1`
  text-align: center;
  width: 70%;
  font-size: 2em;
  @media (min-width: 768px) {
    font-size: 3em;
  }
  @media (min-width: 1440px) {
    font-size: 4em;
  }
`
const JokePagination = styled.div`
  margin: 8px;
`

export default connect(mapStateToProps, mapDispatchToProps)(Jokes)
