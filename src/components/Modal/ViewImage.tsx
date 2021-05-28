import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  const handleCloseModal = (): void => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered size="4xl">
      <ModalOverlay />
      <ModalContent bgColor="pGray.900">
        <ModalBody display="flex" p="0" justifyContent="center">
          <Image bord w="100%" maxW="900px" maxH="600px" src={imgUrl} />
        </ModalBody>
        <ModalFooter justifyContent="flex-start">
          <Link href={imgUrl} target="blank">
            <a>Abrir Original</a>
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
