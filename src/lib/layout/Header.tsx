import { Box, Flex, Text, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';

import { APP_TITLE, APP_VERSION, CONTEXT_LINK } from '../config';

import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <Flex as="header" width="full" align="center" py={2} bg="#000">
      <Box>
        <ChakraLink ml={5} href={CONTEXT_LINK}>
          {APP_TITLE}
        </ChakraLink>{' '}
        {APP_VERSION ? `- ${APP_VERSION}` : null}
        <Text fontSize="xs" ml={5} colorScheme="green">
          <Link
            href="https://promptengineers.ai"
            // isExternal
            rel="noopener noreferrer"
          >
            powered by promptengineers.ai
          </Link>
        </Text>
      </Box>
      {/* <Box marginLeft="auto" mr={2}>
        <ThemeToggle />
      </Box> */}
    </Flex>
  );
};

export default Header;
