import React from "react";
import {
  Box,
  FormControl,
  Switch,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";

const AttendanceTittle = () => {
  // Customize switch colors for visibility in both modes
  const switchTrackColor = useColorModeValue("gray.200", "gray.600");
  const switchThumbColor = useColorModeValue("blue.500", "blue.300");

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      w="full"
      mb="30px"
    >
      <Text color="blue.600" fontSize="22px" fontWeight="semibold">
        Logs & Requests
      </Text>

      <FormControl
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        w="auto"
        mr="10px"
      >
        <Tooltip label="24 hour format" placement="top" hasArrow>
          <Switch
            id="hourFormat"
            size="md"
            colorScheme="blue"
            sx={{
              ".chakra-switch__track": {
                bg: switchTrackColor,
              },
              ".chakra-switch__thumb": {
                bg: switchThumbColor,
              },
            }}
          />
        </Tooltip>
      </FormControl>
    </Box>
  );
};

export default AttendanceTittle;
