import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

import { Page, PageTitle } from '../components/Page';
import FlexBox from '../components/FlexBox';
import Button from '../components/Button';

export const RankingCard = styled.div`
  flex-basis: 25%;
  margin-bottom: 5%;
  height: 400px;
  width: 200px;
  background: palevioletred;
  border: 1px solid white;
  padding: 32px;
  box-shadow: 20px 20px  #70DBB8;
  transition: ease-out .5s;
  text-align: center;
  &:hover{
    border: 8px solid white;
    background: #70DBB8;
    color: palevioletred;
    box-shadow: 20px 20px  palevioletred;
  }
`;

const mockedData = [
  {
    title: 'Top Joke ID',
    data: [1, 2, 3, 4, 5],
  },
  {
    title: 'Top # of random jokes',
    data: [20, 10, 3, 7, 2],
  },
  {
    title: 'Top Name',
    data: ['Chuck Norris', 'John Doe', 'Jane Doe', 'Adam', 'Eve'],
  },
  {
    title: 'Top Category',
    data: ['All', 'Explicit', 'Nerdy', 'General'],
  },
  {
    title: 'Top Date',
    data: [1, 2, 3, 4, 5],
  },
  {
    title: 'Top Month',
    data: [1, 2, 3, 4, 5],
  },
  {
    title: 'Top Year',
    data: [2018],
  },
];

export default () => (
  <Page>
    <Head>
      <title>Joke Statistic</title>
    </Head>
    <FlexBox justify="space-around" alignItems="center">
      <Link href="/" prefetch>
        <Button color="#70DBB8">BACK</Button>
      </Link>
      <PageTitle>Joke Statistic</PageTitle>
      <div />
    </FlexBox>
    <FlexBox wrap="wrap" justify="space-around" alignItems="center">
      {mockedData.map(({ title, data }) => (
        <RankingCard key={title}>
          <h1>{title}</h1>
          <ul style={{ listStyle: 'none' }}>{data.map(each => <li key={each}>{each}</li>)}</ul>
        </RankingCard>
        ))}
    </FlexBox>
  </Page>
);
