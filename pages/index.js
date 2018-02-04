import { withState, compose, withHandlers } from 'recompose'
import { injectGlobal } from 'styled-components'
import withRedux from 'next-redux-wrapper'

import makeStore from '../store'
import { getJokes } from '../store/reducers'

import Divider from '../components/Divider'
import List from '../components/List'
import FlexBox from '../components/FlexBox'
import ModalForm from '../components/ModalForm'
import FooterNav from '../components/FooterNav'

injectGlobal`
  body {
    background: palevioletred;
    color: white;
  }
`

const enhance = compose(
  withState('modalActive', 'setModalActive', false),
  withHandlers({
    toggleModal: ({ setModalActive }) => () => setModalActive(n => !n),
    fetchRandomJoke: ({ fetchJokes }) => () => fetchJokes(),
  }),
)

const Index = enhance(props => (
  <div>
    <ModalForm
      active={props.modalActive}
      handleToggle={props.toggleModal}
      handleSubmit={props.fetchJokes}
    />
    <FlexBox
      style={{ width: '100%', height: '100%' }}
      justify="center"
      alignItems="center"
      alignContent="center"
    >
      <div>
        <FlexBox justify="center">
          <h1>A Joke From Chuck Norris</h1>
        </FlexBox>
        <Divider color="white" />
        <FlexBox justify="center">
          <List.Unordered>{props.jokes.map((j, i) => <li key={i}>{j}</li>)}</List.Unordered>
        </FlexBox>
        <FooterNav fetchRandomJoke={props.fetchRandomJoke} toggleModal={props.toggleModal} />
      </div>
    </FlexBox>
  </div>
))

const mapDispatchToProps = dispatch => ({
  fetchJokes: (id, num, query) => getJokes(dispatch, id, num, query),
})

export default withRedux(makeStore, state => state, mapDispatchToProps)(Index)
