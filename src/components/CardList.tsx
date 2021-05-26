import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const [image, setImage] = useState('');

  const handleViewImage = useCallback(
    (url: string) => {
      setImage(url);
      onToggle();
    },
    [setImage, onToggle]
  );

  return (
    <>
      <SimpleGrid templateColumns="repeat(3, 1fr)" gap="8">
        {cards.map((card: Card) => (
          <Card data={card} viewImage={() => handleViewImage(card.url)} />
        ))}
      </SimpleGrid>

      <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={image} />
    </>
  );
}
