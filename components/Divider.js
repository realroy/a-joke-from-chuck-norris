import styled from 'styled-components'

const Divider = styled.div`
	border-top: ${({ size }) => size || 2}px ${({ border }) => border || 'solid'}
		${({ color }) => color || 'black'};
	margin: 16px 0 16px 0;
`
export default Divider
