import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import { getJokes } from '../store/reducers'

import Footer from './Footer';
import FlexBox from './FlexBox';
import Button from './Button';

const CustomFooter = Footer.extend`
  @media (max-width: 320px) {
    flex-direction: column;
    ${Button} {
      width: 100%;
    }
  }
`;

const FooterNav = ({ dispatchFetchRandomJoke, toggleModal, isFetchingJokes }) => (
  <CustomFooter>
    <FlexBox justify="center" alignItems="center">
      <div>
        {isFetchingJokes ? (
          <Button color="palevioletred">Please Wait</Button>
				) : (
  <Button color="palevioletred" onClick={dispatchFetchRandomJoke}>
						Get Some random joke
  </Button>
				)}
        <span> or </span>
        <Button outlined color="black " onClick={toggleModal}>
					Advance Search
        </Button>
      </div>
    </FlexBox>
  </CustomFooter>
);

FooterNav.propTypes = {
  dispatchFetchRandomJoke: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  isFetchingJokes: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ isFetchingJokes }) => ({ isFetchingJokes })

const mapDispatchToProps = dispatch => ({
  dispatchFetchRandomJoke: () => getJokes(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(FooterNav);
