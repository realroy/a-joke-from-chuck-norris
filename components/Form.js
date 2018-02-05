import styled from 'styled-components'

import FlexBox from './FlexBox'
import Button from './Button'


export const Group = FlexBox.extend`
  color: black;
	border: ${({ borderSize }) => borderSize || 1}px solid palevioletred;
	margin-bottom: 8px;
	flex-wrap: wrap;
`

export const SubGroup = FlexBox.extend`
	justify-content: space-between;
	flex-direction: column;
	padding: 16px 48px 16px 48px;
	flex-wrap: wrap;
`

export const ChoiceSubGroup = SubGroup.extend`
	background: ${({ active }) => (active ? 'palevioletred' : 'white')};
	color: ${({ active }) => (!active ? 'black' : 'white')};
	width: 100%;
	transition: ease-out 0.2s;
	&:hover {
		color: white;
		background: #af5a76;
	}
`
export const Input = styled.input`
	padding: 8px;
	border: 1px solid palevioletred;
	text-align: center;
	transition: ease-out 0.2s;
	&:hover {
		padding: 7px;
		border: 2px solid palevioletred;
		border-radius: 4px;
	}
`

export const InputSubmit = Button.withComponent('input')

export const Label = styled.label`
	width: 100%;
`
export const GroupTitle = styled.h2`
	margin-top: 32px;
	color: #af5a76;
`

export const Title = styled.h1`
  color: black;
	margin-bottom: 16px;
`

export const Form = styled.form`
	background: white;
	width: 100%;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
`
