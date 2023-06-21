import {
  Box,
  Grid,
  useMediaQuery,
  Button,
  Icon,
  Tooltip,
} from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { BsGithub } from 'react-icons/bs';
import { IoMdAdd } from 'react-icons/io';

import DocChat from '~/lib/components/chats/DocChat';
import SettingsDrawer from '~/lib/components/drawers/SettingsDrawer';
import { useChatContext } from '~/lib/contexts/ChatContext';
import ThemeToggle from '~/lib/layout/ThemeToggle';

const repoLink = 'https://github.com/kre8mymedia/Prompt-Engineers-Chat-Starter';

const Home = () => {
  const [isLargerThanLG] = useMediaQuery('(min-width: 62em)');
  const { messages, resetSession } = useChatContext();

  return (
    <>
      <NextSeo title="Home" />
      <Grid
        templateColumns={{
          base: '35% 65%',
        }}
        position="relative"
      >
        {/* {isLargerThanLG && (
          <Box
            display="flex"
            justifyContent="end"
            alignItems="end"
            pr={2}
            position="absolute"
            right="98px"
            top={2}
            zIndex={2}
          >
            <ThemeToggle />
          </Box>
        )} */}
        {/* <Box
          display="flex"
          justifyContent="end"
          alignItems="end"
          pr={2}
          position="absolute"
          right="50px"
          top={2}
          zIndex={2}
        >
          <Button
            aria-label="theme toggle"
            size="sm"
            py={4}
            as="a"
            href={repoLink}
            target="_blank"
            colorScheme="purple"
          >
            <Icon fontSize="20px" as={BsGithub} />
          </Button>
        </Box> */}
        <Box
          display="flex"
          justifyContent="end"
          alignItems="end"
          pr={2}
          position="absolute"
          right={1}
          top={2}
          zIndex={2}
        >
          <SettingsDrawer />
        </Box>
        {messages.length > 0 && !isLargerThanLG && (
          <Box
            display="flex"
            justifyContent="end"
            alignItems="end"
            pr={2}
            position="absolute"
            right={12}
            top={2}
            zIndex={2}
          >
            <Tooltip label="New Chat">
              <Button
                aria-label="theme toggle"
                size="sm"
                py={4}
                onClick={resetSession}
                colorScheme="green"
              >
                <Icon fontSize="20px" as={IoMdAdd} />
              </Button>
            </Tooltip>
          </Box>
        )}
      </Grid>

      <DocChat />
    </>
  );
};

export default Home;
