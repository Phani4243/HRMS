import React from "react";
import { FiAlertCircle, FiChevronDown } from "react-icons/fi";
import { IoMdPeople } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { Box, Card, Text, Divider, Grid, GridItem, Flex, useColorModeValue } from "@chakra-ui/react";

const AttendanceStats = () => {
  const iconBgUser = useColorModeValue("yellow.400", "yellow.600");
  const iconBgTeam = useColorModeValue("blue.400", "blue.600");
  const iconColor = "white";
  const textGray = useColorModeValue("gray.600", "gray.400");

  return (
    <Box maxW="600px" mx="auto" p={4}>
      <Text fontWeight="semibold" fontSize="2xl" color="blue.600" mb={4}>
        Attendance Stats
      </Text>

      <Card p={6} borderRadius="lg"  boxShadow="md" bg={useColorModeValue("white", "gray.700")}>
        {/* Header */}
        <Flex justify="space-between" align="center" mb={4}>
          <Flex align="center" gap={1} fontWeight="medium" fontSize="md" cursor="pointer" userSelect="none">
            Last Week <FiChevronDown size={18} />
          </Flex>
          <FiAlertCircle size={20} color={textGray} />
        </Flex>

        {/* User Stats */}
        <Flex justify="space-between" align="center" mb={4} flexWrap="wrap" gap={6}>
          <Flex align="center" gap={4} flex="1">
            <Box
              bg={iconBgUser}
              borderRadius="full"
              p={2}
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="md"
              w="3.5rem"
              h="3.5rem"
            >
              <RxAvatar size={36} color={iconColor} />
            </Box>
            <Text fontWeight="semibold" fontSize="lg">
              Me
            </Text>
          </Flex>

          <Box textAlign="center" flex="1">
            <Text color={textGray} fontSize="sm" fontWeight="semibold" textTransform="uppercase">
              Avg Hrs / Day
            </Text>
            <Text fontWeight="bold" fontSize="xl">
              4h 21m
            </Text>
          </Box>

          <Box textAlign="center" flex="1">
            <Text color={textGray} fontSize="sm" fontWeight="semibold" textTransform="uppercase">
              On Time Arrival
            </Text>
            <Text fontWeight="bold" fontSize="xl">
              83%
            </Text>
          </Box>
        </Flex>

        <Divider mb={4} />

        {/* Team Stats */}
        <Grid templateColumns="repeat(3, 1fr)" alignItems="center" gap={4}>
          <Flex align="center" gap={4}>
            <Box
              bg={iconBgTeam}
              borderRadius="md"
              p={3}
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="md"
              w="3rem"
              h="3rem"
            >
              <IoMdPeople size={28} color={iconColor} />
            </Box>
            <Text fontWeight="semibold" fontSize="lg">
              My Team
            </Text>
          </Flex>

          <Box textAlign="center">
            <Text fontWeight="bold" fontSize="xl">
              0h 21m
            </Text>
          </Box>

          <Box textAlign="center">
            <Text fontWeight="bold" fontSize="xl">
              3%
            </Text>
          </Box>
        </Grid>
      </Card>
    </Box>
  );
};

export default AttendanceStats;
