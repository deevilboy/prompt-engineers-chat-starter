import {
  Box,
  Button,
  Flex,
  Link as ChakraLink,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { IoMdAdd } from 'react-icons/io';
// import SettingsDrawer from '../components/drawers/SettingsDrawer';

import { APP_TITLE, APP_VERSION, CONTEXT_LINK } from '../config';
import { useChatContext } from '../contexts/ChatContext';

import Header from './Header';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { resetSession } = useChatContext();
  const [isLargerThanLG] = useMediaQuery('(min-width: 62em)'); // 62em is equivalent to the lg breakpoint in Chakra UI

  return (
    <Box
      margin="0 auto"
      maxWidth={{ base: '100%', lg: '100%' }}
      transition="0.5s ease-out"
    >
      <Box margin="">
        {!isLargerThanLG && <Header />}
        <Flex as="main">
          <Box
            flex="0 0 auto"
            h={isLargerThanLG ? '100vh' : '80vh'}
            width={{ base: '0%', lg: '15%' }}
            bg="rgb(23, 25, 35)"
            position="relative"
            pt={3}
            color="white"
          >
            {isLargerThanLG && (
              <Box textAlign="center">
                <ChakraLink href={CONTEXT_LINK}>{APP_TITLE}</ChakraLink>{' '}
                {APP_VERSION ? `- ${APP_VERSION}` : null}
                <Text fontSize="xs" colorScheme="blue">
                  <Link
                    href="https://promptengineers.ai"
                    // isExternal
                    rel="noopener noreferrer"
                  >
                    powered by promptengineers.ai
                  </Link>
                </Text>
                <Button
                  onClick={resetSession}
                  colorScheme="teal"
                  variant="outline"
                  leftIcon={<IoMdAdd />}
                  mt={3}
                  w="90%"
                  mx={2}
                >
                  New Chat
                </Button>
              </Box>
            )}
          </Box>
          <Box flex="1" width={{ base: '100%', lg: '75%' }}>
            {children}
          </Box>
        </Flex>
        {/* <Footer /> */}
      </Box>
    </Box>
  );
};

export default Layout;
