import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from './Button'
import FlexBox from './FlexBox'
import AdvanceSearch from './AdvanceSearch'

export const Modal = styled.div`
  display: ${({ active }) => (active ? 'flex' : 'none')};
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 99;
  background: white;
  flex-wrap: wrap;
  padding: 8px;
  @media (max-width: 768px) {
    padding: 0px;
  }
`


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
