import styled from 'styled-components'

import Footer from './Footer'
import FlexBox from './FlexBox'
import Button from './Button'

const CustomFooter = Footer.extend`
  @media (max-width: 320px) {
    flex-direction: column;
    ${Button} {
      width: 100%;
    }
  }
`

const FooterNav = ({ fetchRandomJoke, toggleModal }) => (
  <CustomFooter>
    <FlexBox justify="center" alignItems="center">
      <div>
        <Button color="palevioletred" onClick={fetchRandomJoke}>
					Get Some random joke
        </Button>
        <span> or </span>
        <Button outlined color="black " onClick={toggleModal}>
					Advance Option
        </Button>
      </div>
    </FlexBox>
  </CustomFooter>
)

export default FooterNav
