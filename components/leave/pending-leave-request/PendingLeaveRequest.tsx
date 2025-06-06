import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TfiHandPointRight } from "react-icons/tfi";
import { FiAlertCircle } from "react-icons/fi";
import {
  Box,
  Button,
  Card,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  IconButton,
  Text,
  Grid,
  GridItem,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  OrderedList,
  ListItem,
  Flex,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import RequestLeaveCard from "../request-leave-card/RequestLeaveCard";
import CancelLeave from "../cancel-leave/CancelLeave";
import CompensatoryLeave from "../compensatory-leave/CompensatoryLeave";
import { leavePolicyRules } from "../constants/leaveList";
import ViewLeave from "../view-leave/ViewLeave";

const PendingLeaveRequest = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const collapsible1 = useDisclosure();
  const collapsible2 = useDisclosure();
  const collapsible3 = useDisclosure();
  const collapsible4 = useDisclosure();

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <>
      {/* Header */}
      <Flex justify="space-between" align="center" mt={6} mb={4}>
        <Text fontSize="2xl" color="blue.600" fontWeight="bold">
          Pending Leave Request
        </Text>
        <Box w="15rem">
          <Select
            mb="10px"
            border="2px solid #0096FF"
            color="#0096FF"
            fontWeight="semibold"
          >
            <option value="option1">Jan 2023 - Dec 2023</option>
            <option value="option2">Jan 2024 - Dec 2024</option>
            <option value="option3">Jan 2025 - Dec 2025</option>
          </Select>

          <Flex justify="center">
            <Button
              mb="10px"
              border="2px solid #0096FF"
              color="#0096FF"
              fontWeight="semibold"
              w="60%"
              onClick={onOpen}
            >
              Apply Leave
            </Button>
          </Flex>
        </Box>

      </Flex>

      {/* Main Grid */}
      <Grid templateColumns={{ base: "1fr", md: "60% 39%" }} gap={10} p={4}>
        {/* Left Panel */}
        <GridItem>
          <Card
            bg={cardBg}
            border="1px"
            width="600px"
            height="200px"
            borderColor={borderColor}
            p={4}
            boxShadow="md"
            position="relative" // Ensure relative positioning for absolute children
          >
            <Flex justify="space-between" align="center" gap={4}>
              {/* Icon + Date Info */}
              <Flex gap={10} align="center">
                <Flex h="3rem" w="3rem" bg="blue.400" rounded="full" justify="center" align="center">
                  <TfiHandPointRight color="white" fontSize="1.4rem" />
                </Flex>
                <Stack spacing={2}>
                  <Box textAlign="center">
                    <Text fontSize="sm" color="gray.500">Past Leave</Text>
                    <Text fontWeight="medium">Apr 20, 2023</Text>
                  </Box>
                  <Box textAlign="center">
                    <Text fontSize="sm" color="gray.500">Leave Note:</Text>
                    <Text fontWeight="medium">Out Of Office</Text>
                  </Box>
                  {/* Leave Type */}
                  <Box textAlign="center">
                    <Text fontSize="sm" color="gray.500">Leave Type</Text>
                    <Text fontWeight="semibold">Paid Leave</Text>
                  </Box>
                </Stack>
              </Flex>
              <Flex gap={4} align="center">
                <Stack spacing={2}>
                  {/* Request On */}
                  <Box textAlign="center">
                    <Text fontSize="sm" color="gray.500" display="flex" alignItems="center" gap={1}>
                      Request On <FiAlertCircle />
                    </Text>
                    <Text fontWeight="semibold">Apr 06, 2023</Text>
                  </Box>
                  {/* Status */}
                  <Box textAlign="center">
                    <Text fontSize="sm" color="gray.500">Status</Text>
                    <Text fontWeight="semibold">Pending</Text>
                  </Box>
                </Stack>
              </Flex>

              {/* View Approvers */}
              <Box textAlign="center">
                <Link fontWeight="semibold" color="#0096FF" href="#">
                  View <br /> Approvers
                </Link>
              </Box>
            </Flex>

            {/* Menu icon at top-right */}
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<BsThreeDotsVertical />}
                variant="ghost"
                aria-label="Options"
                position="absolute"
                top="0.5rem"
                right="0.5rem"
              />
              <MenuList>
                <MenuItem onClick={collapsible4.onOpen}>View Request</MenuItem>
                <MenuItem onClick={collapsible1.onOpen}>Cancel Leave</MenuItem>
              </MenuList>
            </Menu>
          </Card>
        </GridItem>

        {/* Right Panel */}
        <GridItem>
          <Card p={5} bg={cardBg} height="200px" width="370px" boxShadow="md">
            <Flex direction="column" align="center" justify="center" height="100%">
              <Stack spacing={4} align="center">
                <Link color="#0096FF" fontWeight="semibold" onClick={collapsible2.onOpen}>
                  Request Credit for Compensatory Off
                </Link>
                <Link color="#0096FF" fontWeight="semibold" onClick={collapsible3.onOpen}>
                  Leave Policy Explanation
                </Link>
              </Stack>
            </Flex>
          </Card>
        </GridItem>
      </Grid>


      {/* Request Leave Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="lg">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader bg="gray.500" color="white">Request Leave</DrawerHeader>
          <DrawerBody>
            <RequestLeaveCard onClose={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* View Leave Drawer */}
      <Drawer isOpen={collapsible4.isOpen} placement="right" onClose={collapsible4.onClose} size="lg">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader bg="gray.500" color="white">Leave Request Details</DrawerHeader>
          <DrawerBody>
            <ViewLeave />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Cancel Leave Modal */}
      <Modal isOpen={collapsible1.isOpen} onClose={collapsible1.onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="#899499" color="white">Cancel Leave</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <CancelLeave onClose={collapsible1.onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Compensatory Leave Modal */}
      <Modal isOpen={collapsible2.isOpen} onClose={collapsible2.onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="#899499" color="white">Request Credit for Compensatory Off</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <CompensatoryLeave onClose={collapsible2.onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Leave Policy Modal */}
      <Modal isOpen={collapsible3.isOpen} onClose={collapsible3.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Leave Policy</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <OrderedList spacing={2}>
              {leavePolicyRules.map((item, index) => (
                <ListItem key={index}>{item.ruleDescription}</ListItem>
              ))}
            </OrderedList>
          </ModalBody>
          <ModalFooter>
            <Button onClick={collapsible3.onClose} colorScheme="blue">Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PendingLeaveRequest;
