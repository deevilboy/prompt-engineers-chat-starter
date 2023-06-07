import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Stack,
  FormLabel,
  Input,
  Box,
  Textarea,
  Tooltip,
  Grid,
  Slider,
  SliderThumb,
  SliderTrack,
  SliderFilledTrack,
  Icon,
  FormControl,
  Select,
  Checkbox,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { AiFillSetting } from 'react-icons/ai';
import { MdGraphicEq } from 'react-icons/md';
import { RxReset } from 'react-icons/rx';

import { ChatModels, MAIN_BG, SECONDARY } from '../../config/index';
import { Defaults } from '../../config/prompt';
import { useChatContext } from '../../contexts/ChatContext';

export default function SettingsDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef<HTMLTextAreaElement | null>(null);
  const {
    systemMessage,
    setSystemMessage,
    temperature,
    setTemperature,
    setChatModel,
    chatModel,
    sourcesEnabled,
    setSourcesEnabled,
  } = useChatContext();

  const handleSliderChange = (e: { target: { value: string } }) => {
    setTemperature(parseInt(e.target.value, 10));
  };

  const handleCheckboxChange = (e: { target: { checked: any } }) => {
    setSourcesEnabled(e.target.checked);
    sessionStorage.setItem('sources', e.target.checked);
  };

  const handleModelChange = (e: { target: { value: any } }) => {
    setChatModel(e.target.value);
    sessionStorage.setItem('model', e.target.value);
  };

  return (
    <>
      <Tooltip label="Settings">
        <Button size="sm" onClick={onOpen} colorScheme="blue">
          <Icon fontSize="18px" as={AiFillSetting} />
        </Button>
      </Tooltip>
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg={MAIN_BG}>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Settings</DrawerHeader>
          <DrawerBody>
            <Stack spacing="24px">
              <Box mt={5}>
                <FormControl mt={3} position="relative">
                  {systemMessage ===
                  Defaults.SYSTEM_MESSAGE_CONTEXTGPT ? null : (
                    <Tooltip label="Reset System Message">
                      <Button
                        zIndex={100}
                        position="absolute"
                        colorScheme="blue"
                        size="xs"
                        // mt={2}
                        // variant="unstyled"
                        right="10px"
                        top="-5px"
                        onClick={() => {
                          sessionStorage.removeItem('systemMessage');
                          setSystemMessage(Defaults.SYSTEM_MESSAGE_CONTEXTGPT);
                        }}
                      >
                        <Icon fontSize="20px" as={RxReset} />
                      </Button>
                    </Tooltip>
                  )}
                  <FormLabel mb="-40px" ml="15px" color="gray">
                    SYSTEM
                  </FormLabel>
                  <Textarea
                    pt={10}
                    id="desc"
                    ref={firstField}
                    placeholder="System Message"
                    minH="400px"
                    fontSize="14px"
                    value={systemMessage}
                    onChange={(e) => {
                      setSystemMessage(e.target.value);
                      sessionStorage.setItem('systemMessage', e.target.value);
                    }}
                  />
                </FormControl>

                <FormControl mt={3}>
                  <Grid
                    templateColumns={{
                      base: '70% 30%',
                    }}
                  >
                    <Box>
                      <FormLabel>Temperature</FormLabel>
                    </Box>
                    <Box
                      gridColumn={{ base: '2', lg: '2' }}
                      textAlign={{ base: 'right', lg: 'right' }}
                    >
                      <Input
                        placeholder="extra small size"
                        size="xs"
                        value={temperature}
                        onChange={handleSliderChange}
                      />
                    </Box>
                  </Grid>

                  <Slider
                    // isDisabled={true}
                    value={temperature}
                    aria-label="slider-ex-4"
                    defaultValue={90}
                    min={0}
                    max={100}
                    onChange={(val) => setTemperature(val)}
                  >
                    <SliderTrack bg="red.100">
                      <SliderFilledTrack bg={SECONDARY} />
                    </SliderTrack>
                    <SliderThumb boxSize={6}>
                      <Box color="green" as={MdGraphicEq} />
                    </SliderThumb>
                  </Slider>
                </FormControl>

                <FormControl>
                  <FormLabel>Model</FormLabel>
                  <Select
                    bg={MAIN_BG}
                    variant="outline"
                    size="sm"
                    onChange={handleModelChange}
                    value={chatModel}
                  >
                    <option value={ChatModels.GPT_3_5}>
                      gpt-3.5-turbo &#40;Faster&#41;
                    </option>
                    <option value={ChatModels.GPT_4}>
                      gpt-4 &#40;Smarter&#41;
                    </option>
                  </Select>
                </FormControl>
                <Box mt={3}>
                  <FormLabel>
                    <Checkbox
                      onChange={handleCheckboxChange}
                      isChecked={sourcesEnabled}
                    >
                      Source Docs
                    </Checkbox>
                  </FormLabel>
                </Box>
              </Box>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
