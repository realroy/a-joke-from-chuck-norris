export const onSubmit = props => (event) => {
  event.preventDefault()
  const {
    firstName, lastName, num, id, handleSubmit, afterSubmit,
  } = props
  const query = {
    firstName: firstName === '' ? 'Chuck' : firstName.trim(),
    lastName: lastName === '' ? 'Norris' : lastName.trim(),
  }
  handleSubmit(id, num, query)
  afterSubmit()
}
export const handleSelectMultipleOrSingle = props => (event) => {
  const { id } = event.target
  console.log(id)
  const { setIsMultiple, setID, setNum } = props
  if (id === 'num') {
    setIsMultiple(() => true)
    setID(() => 0)
  } else if (id === 'id') {
    setIsMultiple(() => false)
    setNum(() => 0)
  }
}
export const handleChange = props => (event) => {
  const { id, value } = event.target
  const {
    setFirstName, setLastName, setNum, setID,
  } = props
  if (id === 'first-name') setFirstName(() => value)
  else if (id === 'last-name') setLastName(() => value)
  else if (id === 'num') setNum(() => value)
  else if (id === 'id') setID(() => value)
}
