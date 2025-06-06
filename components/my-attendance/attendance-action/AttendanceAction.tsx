import React, { useEffect, useState } from "react";
import { FiAlertCircle, FiClock } from "react-icons/fi";
import {
  Box,
  Button,
  Card,
  Text,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  HStack,
  Tooltip,
  IconButton,
  Center,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

import DutyOnRequest from "../on-duty/DutyOnRequest";
import PartialDay from "../partial-day/PartialDay";
import WorkFromHome from "../work-from-home/WorkFromHome";

// Pulse animation for clock icon
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.15); }
  100% { transform: scale(1); }
`;

const AttendanceAction = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const partialDayDisclosure = useDisclosure();
  const wfhDisclosure = useDisclosure();

  const [hasMounted, setHasMounted] = useState(false);
  const [webClockIn, setWebClockIn] = useState(false);

  const [currentDateTime, setCurrentDateTime] = useState({
    currentTime: "",
    currentDate: "",
    timeFormat: "",
  });

  useEffect(() => {
    setHasMounted(true);

    const interval = setInterval(() => {
      const formattedTime = getFormattedTime();
      setCurrentDateTime({
        currentTime: formattedTime,
        currentDate: getFormattedDate(),
        timeFormat: formattedTime.includes("AM") ? "AM" : "PM",
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function getFormattedTime() {
    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const ampm = now.getHours() < 12 ? "AM" : "PM";
    return `${hours}:${minutes}:${seconds} ${ampm}`;
  }

  function getFormattedDate() {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date().toLocaleDateString("en-US", options);
  }

  const handleWebClockIn = () => setWebClockIn(true);
  const handleWebClockOut = () => setWebClockIn(false);

  return (
    <>
      <Box display="flex" flexDirection="column" gap={4}>
        <Text fontWeight="semibold" color="blue.600" fontSize="2xl">
          Action
        </Text>

        <Card
          p={6}
          borderRadius="md"
          boxShadow="md"
          bg="white"
          position="relative"
          minH="330px"
        >
          {!webClockIn && hasMounted && (
            <Tooltip label="Web Clock-In" placement="top" hasArrow>
              <IconButton
                aria-label="Web Clock-In"
                icon={<FiClock size="24px" />}
                onClick={handleWebClockIn}
                position="absolute"
                top={4}
                right={4}
                w="25px"
                h="30px"
                fontSize="2xl"
                borderRadius="md"
                colorScheme="blue"
                animation={`${pulse} 1.5s infinite`}
              />
            </Tooltip>
          )}

          <HStack alignItems="flex-start" flexWrap="wrap">
            <VStack align="center" spacing={3} flex="1" minW="250px">
              {hasMounted && (
                <>
                  <Box
                    p={3}
                    border="1px solid"
                    borderColor="gray.300"
                    borderRadius="md"
                    textAlign="center"
                    fontWeight="semibold"
                    fontSize="lg"
                    minW="120px"
                    color="blue.600"
                  >
                    {currentDateTime.currentTime}
                  </Box>
                  <Text
                    fontWeight="normal"
                    color="gray.600"
                    width="100%"
                    textAlign="center"
                  >
                    {currentDateTime.currentDate}
                  </Text>
                </>
              )}

              {webClockIn && (
                <VStack align="start" spacing={1} mt={4}>
                  <HStack spacing={2} alignItems="center">
                    <Text fontWeight="semibold">Total Hours</Text>
                    <FiAlertCircle color="gray" />
                  </HStack>
                  <Text>Effective: 0h 0m</Text>
                  <Text>Gross: 0h 0m</Text>
                </VStack>
              )}
            </VStack>

            <Center flex="1">
              <VStack align="center" spacing={4} w="100%" maxW="200px">
                {webClockIn && (
                  <>
                    <Button
                      colorScheme="red"
                      onClick={handleWebClockOut}
                      w="full"
                    >
                      Web Clock-Out
                    </Button>
                    <HStack spacing={2}>
                      <Text fontWeight="bold" color="blue.600">
                        0h:0m
                      </Text>
                      <Text color="gray.500">Since Last Login</Text>
                    </HStack>
                  </>
                )}

                <Button
                  variant="ghost"
                  colorScheme="blue"
                  onClick={wfhDisclosure.onOpen}
                  _hover={{ bg: "blue.50" }}
                  w="full"
                >
                  Work From Home
                </Button>
                <Button
                  variant="ghost"
                  colorScheme="blue"
                  onClick={onOpen}
                  _hover={{ bg: "blue.50" }}
                  w="full"
                >
                  On Duty
                </Button>
                <Button
                  variant="ghost"
                  colorScheme="blue"
                  onClick={partialDayDisclosure.onOpen}
                  _hover={{ bg: "blue.50" }}
                  w="full"
                >
                  Partial Day
                </Button>
              </VStack>
            </Center>
          </HStack>
        </Card>
      </Box>

      {/* On Duty Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="gray.600" color="white">
            On Duty Request
          </ModalHeader>
          <ModalCloseButton color="white" fontWeight="bold" fontSize="1rem" />
          <ModalBody>
            <DutyOnRequest onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Partial Day Modal */}
      <Modal
        isOpen={partialDayDisclosure.isOpen}
        onClose={partialDayDisclosure.onClose}
        size="2xl"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="gray.600" color="white">
            Partial Day Request
          </ModalHeader>
          <ModalCloseButton color="white" fontWeight="bold" fontSize="1rem" />
          <ModalBody>
            <PartialDay onClose={partialDayDisclosure.onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Work From Home Modal */}
      <Modal
        isOpen={wfhDisclosure.isOpen}
        onClose={wfhDisclosure.onClose}
        size="2xl"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="gray.600" color="white">
            Work From Home Request
          </ModalHeader>
          <ModalCloseButton color="white" fontWeight="bold" fontSize="1rem" />
          <ModalBody>
            <WorkFromHome onClose={wfhDisclosure.onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AttendanceAction;
