import { connect } from 'react-redux'
import Link from 'next/link'
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

const FooterNav = ({ fetchRandomJoke, toggleModal, isFetchingJokes }) => (
  <CustomFooter>
    <FlexBox justify="center" alignItems="center">
      <div>
        {isFetchingJokes
        ? (<Button color="palevioletred">Please Wait</Button>)
        : (<Button color="palevioletred" onClick={fetchRandomJoke}>Get Some random joke</Button>)}
        {' '}
        <Button color=" #70C8DB" onClick={toggleModal}>Advance Search</Button>
        {' '}
        <Link href="/statistic" prefetch>
          <Button color="#70DBB8" onClick={toggleModal}>View Statistic</Button>
        </Link>
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
  fetchRandomJoke: () => getJokes(dispatch, {}, {}),
})

export default connect(mapStateToProps, mapDispatchToProps)(FooterNav);
