import { withState, compose, withHandlers, lifecycle } from 'recompose'
import styled, { injectGlobal } from 'styled-components'
import withRedux from 'next-redux-wrapper'

import makeStore from '../store'
import { getJokes, getNumberOfJokes } from '../store/reducers'

import FlexBox from '../components/FlexBox'
import ModalForm from '../components/ModalForm'
import FooterNav from '../components/FooterNav'
import Jokes from '../components/Jokes'

injectGlobal`
  body {
    background: palevioletred;
    color: white;
  }
`

const Page = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
`
const PageTitle = styled.h1`
	border: 2px solid white;
	padding: 8px;
	margin: 8px;
	font-size: 1em;
	@media (min-width: 768px) {
		font-size: 2em;
	}
`

const CenteredFlexbox = FlexBox.extend`
	position: relative;
	align-items: center;
	width: 100%;
	min-height: 70%;
`

const enhance = compose(
  withState('modalActive', 'setModalActive', false),
  withHandlers({
    toggleModal: ({ setModalActive }) => () => setModalActive(n => !n),
    fetchRandomJoke: ({ fetchJokes }) => () => fetchJokes(),
  }),
  lifecycle({
    componentWillMount() {
      this.props.fetchJokes()
      this.props.fetchNumberOfJokes()
    },
  }),
)

const Index = enhance(props => (
  <Page>
    <ModalForm
      active={props.modalActive}
      handleToggle={props.toggleModal}
      handleSubmit={props.fetchJokes}
    />
    <FlexBox justify="center">
      <PageTitle>A JOKE FROM CHUCK NORRIS</PageTitle>
    </FlexBox>
    <CenteredFlexbox>
      <Jokes />
    </CenteredFlexbox>
    <FooterNav fetchRandomJoke={props.fetchRandomJoke} toggleModal={props.toggleModal} />
  </Page>
))

const mapDispatchToProps = dispatch => ({
  fetchJokes: (id, num, query) => getJokes(dispatch, id, num, query),
  fetchNumberOfJokes: () => getNumberOfJokes(dispatch),
})

export default withRedux(makeStore, state => state, mapDispatchToProps)(Index)
