import { Grid, Heading, Text, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';

const SomeText = () => {
  return (
    <Grid textAlign="center">
      <Heading as="h1" size="lg">
        <ChakraLink
          color="blue.200"
          href="https://promptengineers.ai"
          isExternal
          rel="noopener noreferrer"
        >
          Prompt Engineers
        </ChakraLink>{' '}
        Chat Starter
      </Heading>

      <Text fontSize="xs">
        This is a Next.js app with Chakra-UI and TypeScript setup.
      </Text>
    </Grid>
  );
};

export default SomeText;
