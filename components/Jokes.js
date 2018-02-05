import styled from 'styled-components'
import { connect } from 'react-redux'

import Button from './Button'
import FlexBox from './FlexBox'
import List from './List'
import { Input } from './Form'

const Jokes = ({ jokes, isFetching }) => (
  <FullWidthFlexbox direction="column" alignItems="center">
    <FullWidthFlexbox justify="space-between" alignItems="center">
      <SVGButton>
        <img src="/static/imgs/arrow_back.svg" alt="previous-joke" />
      </SVGButton>
      {isFetching ? 'Now Loading' : <JokeQuote>" {jokes[0]} "</JokeQuote>}
      <SVGButton>
        <img src="/static/imgs/arrow_forward.svg" alt="next-joke" />
      </SVGButton>
    </FullWidthFlexbox>
    <JokePagination>
      <Input type="number" min="1" value="1" />
      <span> of {jokes.length}</span>
    </JokePagination>
  </FullWidthFlexbox>
)

const FullWidthFlexbox = FlexBox.extend`
	width: 100%;
`

const SVGButton = styled.button`
	background: none;
	border: none;
	transition: ease-out 0.5s;
	&:hover {
		transform: scale(2, 2);
		cursor: pointer;
	}
`
const JokeQuote = styled.h1`
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

const mapStateToProps = ({ jokes, isFetching }) => ({ jokes, isFetching })

export default connect(mapStateToProps)(Jokes)
