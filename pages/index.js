import PropTypes from 'prop-types';
import { withState, compose, withHandlers, lifecycle } from 'recompose';
import styled, { injectGlobal } from 'styled-components';
import withRedux from 'next-redux-wrapper';

import makeStore from '../store';
import { getJokes, getNumberOfJokes } from '../store/reducers';

import FlexBox from '../components/FlexBox';
import ModalForm from '../components/ModalForm';
import FooterNav from '../components/FooterNav';
import Jokes from '../components/Jokes';

/* eslint-disable no-unused-expressions */
injectGlobal`
  body {
    background: palevioletred;
    color: white;
  }
`;

const Page = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
`;
const PageTitle = styled.h1`
	border: 2px solid white;
	padding: 8px;
	margin: 8px;
	font-size: 1em;
	@media (min-width: 768px) {
		font-size: 2em;
	}
`;

const CenteredFlexbox = FlexBox.extend`
	position: relative;
	align-items: center;
	width: 100%;
	min-height: 70%;
`;

const enhance = compose(
  withState('isModalActive', 'setModalActive', false),
  withHandlers({
    handleToggleModal: ({ setModalActive }) => () => setModalActive(n => !n),
    handleFetchRandomJoke: ({ dispatchFetchJokes }) => () => dispatchFetchJokes(),
  }),
  lifecycle({
    componentWillMount() {
      this.props.dispatchFetchJokes();
      this.props.dispatchFetchNumberOfJokes();
    },
  }),
);

const Index = ({ isModalActive, handleToggleModal }) => (
  <Page>
    <ModalForm active={isModalActive} handleToggle={handleToggleModal} />
    <FlexBox justify="center">
      <PageTitle>A JOKE FROM CHUCK NORRIS</PageTitle>
    </FlexBox>
    <CenteredFlexbox>
      <Jokes />
    </CenteredFlexbox>
    <FooterNav toggleModal={handleToggleModal} />
  </Page>
);

Index.propTypes = {
  isModalActive: PropTypes.bool.isRequired,
  handleToggleModal: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  dispatchFetchJokes: (id, num, query) => getJokes(dispatch, id, num, query),
  dispatchFetchNumberOfJokes: () => getNumberOfJokes(dispatch),
});

export default withRedux(makeStore, state => state, mapDispatchToProps)(enhance(Index));
