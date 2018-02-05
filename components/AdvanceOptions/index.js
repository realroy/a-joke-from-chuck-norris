import { compose, withState, withHandlers } from 'recompose'

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
import { onSubmit, handleSelectMultipleOrSingle, handleChange } from './handlers'


const enhance = compose(
  withState('isMultiple', 'setIsMultiple', true),
  withState('firstName', 'setFirstName', ''),
  withState('lastName', 'setLastName', ''),
  withState('num', 'setNum', 1),
  withState('id', 'setID', 0),
  withHandlers({ onSubmit, handleSelectMultipleOrSingle, handleChange }),
)

const AdvanceOptions = enhance(props => (
  <Form onSubmit={props.onSubmit}>
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
            value={props.firstName}
            onChange={props.handleChange}
            placeholder="Specify first name"
          />
        </SubGroup>
        <SubGroup>
          <Label htmlFor="last-Name">Last Name</Label>
          <Input
            type="text"
            id="last-name"
            value={props.lastName}
            onChange={props.handleChange}
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
            value={props.num}
            onChange={props.handleChange}
            min={0}
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
            onChange={props.handleChange}
            value={props.id}
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

export default AdvanceOptions
