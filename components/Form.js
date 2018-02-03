import styled from 'styled-components'
import { compose, withState, withHandlers } from 'recompose'

import Divider from './Divider'
import { outlinedBtn, defaultBtn } from './Button'

const enhance = compose(
  withState('isMultiple', 'setIsMultipleOrSingle', true),
  withState('firstName', 'setFirstName', ''),
  withState('lastName', 'setLastName', ''),
  withState('num', 'setNum', 1),
  withState('id', 'setID', 0),
  withHandlers({
    onSubmit: props => (event) => {
      event.preventDefault()
      const {
        firstName,
        lastName,
        num,
        id,
        handleSubmit,
        afterSubmit,
      } = props
      const query = {
        firstName: firstName === '' ? undefined : firstName,
        lastName: lastName === '' ? undefined : lastName,
      }
      handleSubmit(id, num, query)
      afterSubmit()
    },
    handleSelectMultipleOrSingle: props => (event) => {
      const { id } = event.target
      const { setIsMultipleOrSingle, setID, setNum } = props
      if (id === 'num') {
        setIsMultipleOrSingle(() => true)
        setID(() => 0)
      } else if (id === 'id') {
        setIsMultipleOrSingle(() => false)
        setNum(() => 0)
      }
    },
    handleChange: props => (event) => {
      const { id, value } = event.target
      const {
        setFirstName, setLastName, setNum, setID,
      } = props
      if (id === 'first-name') setFirstName(() => value)
      else if (id === 'last-name') setLastName(() => value)
      else if (id === 'num') setNum(() => value)
      else if (id === 'id') setID(() => value)
    },
  }),
)

const Form = enhance(props => (
  <Div onSubmit={props.onSubmit}>
    <div>
      <FormTitle>Advance Options</FormTitle>
      <FormGroupTitle>Insert your prefer name to the joke</FormGroupTitle>
      <Divider color="#AF5A76" border="dotted" />
      <FormGroup dir="row">
        <FormSubGroup>
          <FormLabel htmlFor="first-name">First Name</FormLabel>
          <FormInput
            type="text"
            id="first-name"
            value={props.firstName}
            onChange={props.handleChange}
            placeholder="Specify first name"
          />
        </FormSubGroup>
        <FormSubGroup>
          <FormLabel htmlFor="last-Name">Last Name</FormLabel>
          <FormInput
            type="text"
            id="last-name"
            value={props.lastName}
            onChange={props.handleChange}
            placeholder="Specify last name"
          />
        </FormSubGroup>
      </FormGroup>
      <FormGroupTitle>Want multiple jokes or specific joke ID ?</FormGroupTitle>
      <Divider color="#AF5A76" border="dotted" />
      <FormGroup dir="row">
        <FormChoiceSubGroup active={props.isMultiple} onClick={props.handleSelectMultipleOrSingle}>
          <FormLabel htmlFor="num">Number of random jokes</FormLabel>
          <FormInput
            disable={!props.isMultiple}
            type="number"
            id="num"
            value={props.num}
            onChange={props.handleChange}
            min={0}
            placeholder="Specify number of jokes"
          />
        </FormChoiceSubGroup>
        <FormChoiceSubGroup active={!props.isMultiple} onClick={props.handleSelectMultipleOrSingle}>
          <FormLabel htmlFor="id">Get joke with id</FormLabel>
          <FormInput
            disabled={props.isMultiple}
            type="number"
            id="id"
            min={0}
            onChange={props.handleChange}
            value={props.id}
            placeholder="Specify id of joke"
          />
        </FormChoiceSubGroup>
      </FormGroup>
      <Divider color="#AF5A76" border="dotted" />
      <FormGroup borderSize="0" dir="column" justify="center">
        <FormSubmit color="palevioletred" type="submit" value="Get some jokes!" />
      </FormGroup>
    </div>
  </Div>
))

const FormGroup = styled.div`
	border: ${({ borderSize }) => borderSize || 1}px solid palevioletred;
	margin-bottom: 8px;
  display: flex;
  justify-content: ${({ justify }) => justify || 'flex-start'};
	flex-direction: ${({ dir }) => dir || 'column'};
`

const FormSubGroup = styled.div`
	justify-content: space-between;
	flex-direction: column;
	display: flex;
	padding: 16px 48px 16px 48px;
	flex-wrap: wrap;
`
const FormChoiceSubGroup = FormSubGroup.extend`
  background: ${({ active }) => (active ? 'palevioletred' : 'white')};
  color: ${({ active }) => (!active ? 'black' : 'white')};
  transition: ease-out .5s;
	&:hover {
    color: white;
		background: #AF5A76;
	}
`
const FormInput = styled.input`
	padding: 8px;
  border: 1px solid palevioletred;
  text-align: center;
  transition: ease-out .5s;
  &:hover {
    padding: 7px;
    border: 2px solid palevioletred;
    border-radius: 4px;
  }
`

const FormSubmit = styled.input`
	${({ color, outlined }) => (outlined ? outlinedBtn(color) : defaultBtn(color))};
`

const FormLabel = styled.label`
	width: 100%;
`
const FormGroupTitle = styled.h2`
  margin-top: 32px;
	color: #af5a76;
`

const FormTitle = styled.h1`
	margin-bottom: 16px;
`

const Div = styled.form`
	background: white;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
`
export default Form
