import React, { useState } from 'react';
import {
  Box,
  Grid,
  GridItem,
  Text,
  VStack,
  Badge,
  useColorModeValue,
  Heading,
  Tooltip,
  HStack,
  Icon,
  Divider,
} from '@chakra-ui/react';
import { MdAccessible } from 'react-icons/md';

interface ParkingSlot {
  id: number;
  slotNumber: string;
  occupied: boolean;
  occupantName?: string;
  disabledOnly: boolean;
}

const initialSlots: ParkingSlot[] = [
  { id: 1, slotNumber: 'A1', occupied: false, disabledOnly: false },
  { id: 2, slotNumber: 'A2', occupied: true, occupantName: 'Ram Kumar', disabledOnly: false },
  { id: 3, slotNumber: 'A3', occupied: false, disabledOnly: false },
  { id: 4, slotNumber: 'A4', occupied: false, disabledOnly: false },
  { id: 5, slotNumber: 'A5', occupied: true, occupantName: 'Sita Sharma', disabledOnly: false },
  { id: 6, slotNumber: 'D1', occupied: false, disabledOnly: true },
  { id: 7, slotNumber: 'D2', occupied: true, occupantName: 'John Doe', disabledOnly: true },
  { id: 8, slotNumber: 'D3', occupied: false, disabledOnly: true },
];

const ParkingSlots: React.FC = () => {
  const [slots, setSlots] = useState<ParkingSlot[]>(initialSlots);
  const bg = useColorModeValue('white', 'gray.700');

  const toggleOccupancy = (id: number) => {
    setSlots((prev) =>
      prev.map((slot) => {
        if (slot.id === id) {
          if (slot.disabledOnly) {
            alert('This is reserved for employees with disabilities.');
            return slot;
          }

          return {
            ...slot,
            occupied: !slot.occupied,
            occupantName: slot.occupied ? undefined : 'You',
          };
        }
        return slot;
      })
    );
  };

  const regularSlots = slots.filter((slot) => !slot.disabledOnly);
  const disabledSlots = slots.filter((slot) => slot.disabledOnly);

  const getSlotBackground = (slot: ParkingSlot) => {
    if (slot.disabledOnly) {
      return 'linear-gradient(135deg, #7F00FF 0%, #E100FF 100%)'; // purple gradient
    }
    if (slot.occupied) {
      return 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)'; // red gradient
    }
    return 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'; // green gradient
  };

  const renderSlot = (slot: ParkingSlot) => (
    <GridItem
      key={slot.id}
      p={4}
      borderRadius="md"
      bg={getSlotBackground(slot)}
      color="white"
      textAlign="center"
      cursor={!slot.disabledOnly ? 'pointer' : 'not-allowed'}
      _hover={{ opacity: 0.9 }}
      onClick={() => !slot.disabledOnly && toggleOccupancy(slot.id)}
    >
      <VStack spacing={2}>
        <Text fontWeight="bold" fontSize="lg">
          {slot.slotNumber}{' '}
          {slot.disabledOnly && <Icon as={MdAccessible} title="Disabled Parking" />}
        </Text>
        {slot.occupied ? (
          <>
            <Badge colorScheme="red">Occupied</Badge>
            <Tooltip label={`Occupant: ${slot.occupantName}`}>
              <Text fontSize="sm">{slot.occupantName}</Text>
            </Tooltip>
          </>
        ) : (
          <Badge colorScheme="green">Available</Badge>
        )}
      </VStack>
    </GridItem>
  );

  return (
    <Box maxW="1000px" mx="auto" p={6} bg={bg} borderRadius="md" boxShadow="md">
      <Heading mb={6} size="lg" color="teal.600" textAlign="center">
        Employee Parking Overview
      </Heading>

      <Box mb={8}>
        <Heading size="md" mb={4} color="teal.600">Regular Parking</Heading>
        <Grid templateColumns="repeat(auto-fit, minmax(150px, 1fr))"  gap={4}>
          {regularSlots.map(renderSlot)}
        </Grid>
      </Box>

      <Divider my={6} />

      <Box>
        <Heading size="md" mb={4} color="teal.600">
          Reserved Parking for Disabled Employees
        </Heading>
        <Grid templateColumns="repeat(auto-fit, minmax(150px, 1fr))" gap={4}>
          {disabledSlots.map(renderSlot)}
        </Grid>
      </Box>

      <Box mt={8} p={4} border="1px solid" borderColor="gray.300" borderRadius="md">
        <Heading size="sm" color="teal.600" mb={3}>
          Legend
        </Heading>
        <HStack spacing={6}>
          <Badge colorScheme="green">Available</Badge>
          <Badge colorScheme="red">Occupied</Badge>
          <Badge colorScheme="purple">
            <HStack spacing={1}>
              <Icon as={MdAccessible} /> Disabled Parking
            </HStack>
          </Badge>
        </HStack>
        <Text mt={2} fontSize="sm" color="gray.600">
          Disabled slots are reserved. Regular employees can't select them.
        </Text>
      </Box>
    </Box>
  );
};

export default ParkingSlots;
