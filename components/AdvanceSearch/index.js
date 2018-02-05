import { compose, withState, withHandlers } from 'recompose'
import { connect } from 'react-redux'

import { updateOptions, getJokes } from '../../store/reducers'
import Divider from '../Divider'
import {
  Form,
  Title,
  GroupTitle,
  Group,
  SubGroup,
  Label,
  Input,
  ChoiceSubGroup,
  InputSubmit,
} from '../Form'
import { handleSubmit, handleSelectMultipleOrSingle } from './handles'

const enhance = compose(
  withState('isMultiple', 'setIsMultiple', true),
  withHandlers({ handleSubmit, handleSelectMultipleOrSingle }),
)

const AdvanceSearch = enhance(props => (
  <Form onSubmit={props.handleSubmit}>
    <div>
      <Title>Advance Options</Title>
      <GroupTitle>Insert your prefer name to the joke</GroupTitle>
      <Divider color="#AF5A76" border="dotted" />
      <Group>
        <SubGroup>
          <Label htmlFor="first-name">First Name</Label>
          <Input
            type="text"
            id="first-name"
            value={props.options.query.firstName}
            onChange={props.dispatchChange}
            placeholder="Specify first name"
          />
        </SubGroup>
        <SubGroup>
          <Label htmlFor="last-Name">Last Name</Label>
          <Input
            type="text"
            id="last-name"
            value={props.options.query.lastName}
            onChange={props.dispatchChange}
            placeholder="Specify last name"
          />
        </SubGroup>
      </Group>
      <GroupTitle>Want multiple jokes or specific joke ID ?</GroupTitle>
      <Divider color="#AF5A76" border="dotted" />
      <Group>
        <ChoiceSubGroup active={props.isMultiple} onClick={props.handleSelectMultipleOrSingle}>
          <Label htmlFor="num">Number of random jokes</Label>
          <Input
            disable={!props.isMultiple}
            type="number"
            id="num"
            value={props.options.num}
            onChange={props.dispatchChange}
            min={0}
            max={props.maxJokes}
            placeholder="Specify number of jokes"
          />
        </ChoiceSubGroup>
        <ChoiceSubGroup active={!props.isMultiple} onClick={props.handleSelectMultipleOrSingle}>
          <Label htmlFor="id">Get joke with id</Label>
          <Input
            disabled={props.isMultiple}
            type="number"
            id="id"
            min={0}
            max={props.maxJokes}
            onChange={props.dispatchChange}
            value={props.options.id}
            placeholder="Specify id of joke"
          />
        </ChoiceSubGroup>
      </Group>
      <Divider color="#AF5A76" border="dotted" />
      <Group borderSize="0" direction="column" justify="center">
        <InputSubmit color="palevioletred" type="submit" value="Get some jokes!" />
      </Group>
    </div>
  </Form>
))

const mapDispatchToProps = dispatch => ({
  dispatchJokes: (id, num, query) => getJokes(dispatch, id, num, query),
  dispatchChange: (event) => {
    const { id, value } = event.target
    let options = {}
    if (id === 'first-name') options = { query: { firstName: value.trim() } }
    else if (id === 'last-name') options = { query: { lastName: value.trim() } }
    else if (id === 'num') options = { num: parseInt(value, 10), id: 0 }
    else if (id === 'id') options = { id: parseInt(value, 10), num: 0 }
    dispatch(updateOptions(options))
  },
})

export default connect(state => state, mapDispatchToProps)(AdvanceSearch)
