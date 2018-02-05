import styled, { keyframes } from 'styled-components'

const Modal = styled.div`
	display: ${({ active }) => (active ? 'block' : 'none')};
	height: 100%;
	max-width: 100%;
	position: fixed;
	z-index: 99;
	background: white;
	flex-wrap: wrap;
	padding: 8px;
	@media (min-width: 768px) {
		padding: 0px;
	}
`
export default Modal
