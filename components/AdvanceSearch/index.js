import { compose, withState, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

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
  Select,
} from '../Form'
import { handleSubmit, handleSelectMultipleOrSingle } from './handles'

const enhance = compose(
  withState('isMultiple', 'setIsMultiple', true),
  withHandlers({ handleSubmit, handleSelectMultipleOrSingle }),
)
const mapDispatchToProps = dispatch => ({
  dispatchJokes: options => getJokes(dispatch, options),
  dispatchChange: (event) => {
    const { id, value } = event.target
    const cleanedValue = Number(value) || value.trim()
    const options = { [id]: cleanedValue }
    dispatch(updateOptions(options))
  },
})
/* eslint-disable no-shadow */
const AdvanceSearch = ({
  handleSubmit,
  options,
  dispatchChange,
  isMultiple,
  handleSelectMultipleOrSingle,
  maxJokes,
  categories,
}) => (
  <Form onSubmit={handleSubmit}>
    <div>
      <Title>Advance Options</Title>
      <GroupTitle>Insert your prefer name to the joke</GroupTitle>
      <Divider color="#AF5A76" border="dotted" />
      <Group>
        <SubGroup>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            type="text"
            id="firstName"
            value={options.firstName}
            onChange={dispatchChange}
            placeholder="Specify first name"
          />
        </SubGroup>
        <SubGroup>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            type="text"
            id="lastName"
            value={options.lastName}
            onChange={dispatchChange}
            placeholder="Specify last name"
          />
        </SubGroup>
      </Group>
      <GroupTitle>Want multiple jokes or specific joke ID ?</GroupTitle>
      <Divider color="#AF5A76" border="dotted" />
      <Group>
        <ChoiceSubGroup active={isMultiple} onClick={handleSelectMultipleOrSingle}>
          <Label htmlFor="num">Number of random jokes</Label>
          <Input
            disable={!isMultiple}
            type="number"
            id="num"
            value={options.num}
            onChange={dispatchChange}
            min={0}
            max={maxJokes}
            placeholder="Specify number of jokes"
          />
          <Label htmlFor="categories">Categories</Label>
          <Select name="category" id="category" defaultValue={categories[0]}>
            {categories.map(c => <option key={c} value={c}>{c[0].toUpperCase() + c.substring(1)}</option>)}
          </Select>
        </ChoiceSubGroup>
        <ChoiceSubGroup active={!isMultiple} onClick={handleSelectMultipleOrSingle}>
          <Label htmlFor="id">Get joke with id</Label>
          <Input
            disabled={isMultiple}
            type="number"
            id="id"
            min={0}
            max={maxJokes}
            onChange={dispatchChange}
            value={options.id}
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
)

AdvanceSearch.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  options: PropTypes.shape({
    id: PropTypes.number.isRequired,
    num: PropTypes.number.isRequired,
    query: PropTypes.object.isRequired,
  }).isRequired,
  dispatchChange: PropTypes.func.isRequired,
  isMultiple: PropTypes.bool.isRequired,
  handleSelectMultipleOrSingle: PropTypes.func.isRequired,
  maxJokes: PropTypes.number.isRequired,
}

export default connect(state => state, mapDispatchToProps)(enhance(AdvanceSearch))
