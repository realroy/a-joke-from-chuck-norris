import Footer from './Footer'
import FlexBox from './FlexBox'
import Button from './Button'

const FooterNav = ({ fetchRandomJoke, toggleModal }) => (
  <Footer>
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
  </Footer>
)

export default FooterNav
