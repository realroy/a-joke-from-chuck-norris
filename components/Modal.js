import styled, { keyframes } from 'styled-components'

const Modal = styled.div`
	display: ${({ active }) => (active ? 'block' : 'none')};
	width: 100%;
	height: 100%;
	position: absolute;
	z-index: 99;
	background: white;
`
export default Modal
