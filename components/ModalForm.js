import PropTypes from 'prop-types'

import Button from './Button'
import FlexBox from './FlexBox'
import AdvanceSearch from './AdvanceSearch'
import Modal from './Modal'

const ModalForm = ({ active, handleToggle }) => (
  <Modal active={active}>
    <FlexBox justify="flex-end">
      <Button
        color="palevioletred"
        onClick={handleToggle}
      >
        Close
      </Button>
    </FlexBox>
    <AdvanceSearch afterSubmit={handleToggle} />
  </Modal>
)

ModalForm.propTypes = {
  active: PropTypes.bool.isRequired,
  handleToggle: PropTypes.func.isRequired,
}

export default ModalForm
