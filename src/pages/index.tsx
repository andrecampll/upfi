import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

type Image = {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
};

type ImagesResponse = {
  data: Image[];
  after: string;
};

export default function Home(): JSX.Element {
  const fetchPhotos = async ({ pageParam = null }): Promise<ImagesResponse> => {
    const response = await api.get('/api/images', {
      params: {
        after: pageParam,
      },
    });

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
    getNextPageParam: lastPage => lastPage.after,
  });

  const formattedData = useMemo(() => {
    return data?.pages.flatMap(imageData => {
      return imageData.data.flat();
    });
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
          <Button
            type="button"
            onClick={() => fetchNextPage()}
            loadingText="Carregando..."
            isLoading={isFetchingNextPage}
          >
            Carregar mais
          </Button>
        )}
      </Box>
    </>
  );
}
