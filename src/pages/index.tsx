import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images'
    // TODO AXIOS REQUEST WITH PARAM
    // TODO GET AND RETURN NEXT PAGE PARAM
  );

  const formattedData = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY
    const mock = [
      {
        id: '1',
        title: 'doge',
        description: 'doge',
        url: 'https://media.moneytimes.com.br/uploads/2020/07/doge-dogecoin.jpg',
        ts: 1,
      },
      {
        id: '2',
        title: 'doge',
        description: 'doge',
        url: 'https://media.moneytimes.com.br/uploads/2020/07/doge-dogecoin.jpg',
        ts: 1,
      },
      {
        id: '3',
        title: 'doge',
        description: 'doge',
        url: 'https://media.moneytimes.com.br/uploads/2020/07/doge-dogecoin.jpg',
        ts: 1,
      },
      {
        id: '4',
        title: 'doge',
        description: 'doge',
        url: 'https://media.moneytimes.com.br/uploads/2020/07/doge-dogecoin.jpg',
        ts: 1,
      },
      {
        id: '5',
        title: 'doge',
        description: 'doge',
        url: 'https://media.moneytimes.com.br/uploads/2020/07/doge-dogecoin.jpg',
        ts: 1,
      },
      {
        id: '6',
        title: 'doge',
        description: 'doge',
        url: 'https://media.moneytimes.com.br/uploads/2020/07/doge-dogecoin.jpg',
        ts: 1,
      },
    ];

    return mock;
  }, [data]);

  // TODO RENDER LOADING SCREEN

  // TODO RENDER ERROR SCREEN

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
      </Box>
    </>
  );
}
