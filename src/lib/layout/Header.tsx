import { Box, Flex, Text, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';

import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <Flex as="header" width="full" align="center" py={2}>
      <Box>
        <Link href="https://python.langchain.com/en/latest"><ChakraLink ml={5}>Langchain GPT</ChakraLink></Link> - v0.0.134
        <Text fontSize="xs" ml={5} colorScheme="blue">
          <Link
            href="https://promptengineers.ai"
            // isExternal
            rel="noopener noreferrer"
          >
            powered by promptengineers.ai
          </Link>
        </Text>
      </Box>
      <Box marginLeft="auto" mr={2}>
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;
