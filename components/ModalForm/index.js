import Button from '../Button'
import FlexBox from '../FlexBox'
import Form from '../Form'
import Modal from '../Modal'

const ModalForm = ({ active, handleToggle, handleSubmit }) => (
  <Modal active={active}>
    <FlexBox justify="flex-end">
      <Button color="palevioletred" onClick={handleToggle}>
				Close
      </Button>
    </FlexBox>
    <Form handleSubmit={handleSubmit} afterSubmit={handleToggle} />
  </Modal>
)

export default ModalForm
