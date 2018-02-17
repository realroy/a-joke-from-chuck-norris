import PropTypes from 'prop-types';
import Head from 'next/head';
import { withState, compose, withHandlers, lifecycle } from 'recompose';
import { injectGlobal } from 'styled-components';
import withRedux from 'next-redux-wrapper';

import makeStore from '../store';
import { getJokes, getNumberOfJokes, getCategories } from '../store/reducers';

import FlexBox from '../components/FlexBox';
import { Page, PageTitle } from '../components/Page';
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

const CenteredFlexbox = FlexBox.extend`
	position: relative;
	align-items: center;
	width: 100%;
	min-height: 70%;
`;

const mapDispatchToProps = dispatch => ({
  dispatchFetchJokes: (options, categories) => getJokes(dispatch, options, categories),
  dispatchFetchNumberOfJokes: () => getNumberOfJokes(dispatch),
  dispatchFetchCategories: () => getCategories(dispatch),
});

const enhance = compose(
  withRedux(makeStore, state => state, mapDispatchToProps),
  withState('isModalActive', 'setModalActive', false),
  withHandlers({
    handleToggleModal: ({ setModalActive, isModalActive }) => () => {
      setModalActive(n => !n)
    },
    handleFetchRandomJoke: ({ dispatchFetchJokes }) => () => dispatchFetchJokes(),
  }),
  lifecycle({
    componentWillMount() {
      const {
        categories,
        dispatchFetchCategories,
        dispatchFetchNumberOfJokes,
        maxJokes,
      } = this.props;
      if (maxJokes === 0) dispatchFetchNumberOfJokes();
      if (categories.length === 0) dispatchFetchCategories();
    },
  }),
);

const Index = ({ isModalActive, handleToggleModal }) => (
  <Page>
    <Head>
      <title>Joke From Chuck Norris </title>
    </Head>
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

export default enhance(Index);
