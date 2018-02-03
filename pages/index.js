import { withState, compose, withHandlers } from 'recompose'
import { injectGlobal } from 'styled-components'
import withRedux from 'next-redux-wrapper'

import makeStore from '../store'
import { getJokes } from '../store/reducers'
import Form from '../components/Form'
import Container from '../components/Container'
import Divider from '../components/Divider'
import Modal from '../components/Modal'
import List from '../components/List'
import Button from '../components/Button'
import FlexBox from '../components/FlexBox'
import ModalForm from '../components/ModalForm'

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
        <h1>A Joke From Chuck Norris</h1>
        <Button outlined color="palevioletred" onClick={props.fetchRandomJoke}>
					Get Some random joke
        </Button>
        <span> or </span>
        <Button outlined color="black " onClick={props.toggleModal}>
					Advance Option
        </Button>
        <Divider />
        <List.Unordered>{props.jokes.map((j, i) => <li key={i}>{j}</li>)}</List.Unordered>
      </div>
    </FlexBox>
  </div>
))

const mapDispatchToProps = dispatch => ({
  fetchJokes: (id, num, query) => getJokes(dispatch, id, num, query),
})

export default withRedux(makeStore, state => state, mapDispatchToProps)(Index)
