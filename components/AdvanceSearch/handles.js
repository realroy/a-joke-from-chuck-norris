export const handleSubmit = props => (event) => {
  event.preventDefault();
  const {
    options, dispatchJokes, afterSubmit, categories,
  } = props;
  dispatchJokes(options, categories);
  afterSubmit();
};
export const handleSelectMultipleOrSingle = props => (event) => {
  const { id } = event.target;
  const { setIsMultiple, dispatchChange } = props;
  if (id === 'num') setIsMultiple(() => true);
  else if (id === 'id') setIsMultiple(() => false);
  dispatchChange(event);
};
