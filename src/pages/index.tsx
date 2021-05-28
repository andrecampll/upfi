/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const fetchPhotos = async ({ pageParam = null }) => {
    const response = await api.get(`/api/images?after=${pageParam}`);

    return response.data;
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchPhotos, {
    getNextPageParam: lastPage => {
      if (lastPage) {
        return lastPage;
      }

      return null;
    },
  });

  const formattedData = useMemo(() => {
    const formatted = data?.pages[0].data.map(item => ({
      ...item,
    }));

    return formatted;
  }, [data]);

  if (isError) {
    return (
      <>
        <Header />

        <Box maxW={1120} px={20} mx="auto" my={20}>
          <Error />
        </Box>
      </>
    );
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        {isLoading ? <Loading /> : <CardList cards={formattedData} />}
        {hasNextPage && (
          <Button onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
