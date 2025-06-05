import React, { useState } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Badge,
  Divider,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";

const leaveColors = {
  Sick: "#E53E3E",
  Casual: "#38A169",
  "Work From Home": "#3182CE",
  Holiday: "#805AD5",
};

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


const leaves = [
  { date: "2025-05-04", type: "Sick" },
  { date: "2025-05-15", type: "Casual" },
  { date: "2025-05-20", type: "Work From Home" },
];

const holidays = [
  { date: "2025-05-01", name: "Labor Day" },
  { date: "2025-05-25", name: "Company Holiday" },
];

const daysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate();

const formatDate = (year: number, month: number, day: number) => {
  const m = (month + 1).toString().padStart(2, "0");
  const d = day.toString().padStart(2, "0");
  return `${year}-${m}-${d}`;
};

export default function EmployeeCalendar() {
  const bg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const [year] = useState(2025);
  const [month] = useState(4);

  const totalDays = daysInMonth(year, month);
  const firstDayOfWeek = new Date(year, month, 1).getDay();


  const isLeaveDay = (date: string) =>
    leaves.find((l) => l.date === date);

  const isHoliday = (date: string) =>
    holidays.find((h) => h.date === date);

  return (
    <Box
      maxW="1000px"
      mx="auto"
      bg={bg}
      p={6}
      rounded="lg"
      shadow="xl"
      fontFamily="'Inter', sans-serif"
      color={textColor}
    >
      <Text size="lg" color="teal.600" fontSize="2xl" fontWeight="bold" mb={6} textAlign="center">
        {monthNames[month]} {year} — Employee Leave Calendar
      </Text>

      <HStack spacing={8} align="flex-start">

        <Box flex="1">

          <SimpleGrid columns={7} spacing={1} textAlign="center" mb={3}>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <Box key={d} fontWeight="semibold" color="gray.500">
                {d}
              </Box>
            ))}
          </SimpleGrid>


          <SimpleGrid columns={7} spacing={2}>

            {Array(firstDayOfWeek)
              .fill(0)
              .map((_, i) => (
                <Box key={"empty-" + i} />
              ))}


            {Array(totalDays)
              .fill(0)
              .map((_, idx) => {
                const day = idx + 1;
                const dateStr = formatDate(year, month, day);
                const leave = isLeaveDay(dateStr);
                const holiday = isHoliday(dateStr);

                return (
                  <Box
                    key={dateStr}
                    borderWidth="1px"
                    borderColor={borderColor}
                    rounded="md"
                    height="72px"
                    position="relative"
                    cursor={leave || holiday ? "pointer" : "default"}
                    _hover={{
                      bg: leave
                        ? leaveColors[leave.type as keyof typeof leaveColors] + "33"
                        : holiday
                          ? leaveColors.Holiday + "33"
                          : undefined,
                    }}
                    px={2}
                    pt={2}
                  >

                    <Text fontSize="sm" fontWeight="bold" mb={1}>
                      {day}
                    </Text>


                    <HStack spacing={1} position="absolute" bottom={2} left={2}>
                      {leave && (
                        <Box
                          bg={leaveColors[leave.type as keyof typeof leaveColors]}
                          w="10px"
                          h="10px"
                          rounded="full"
                          title={`${leave.type} Leave`}
                        />
                      )}
                      {holiday && (
                        <Box
                          bg={leaveColors.Holiday}
                          w="10px"
                          h="10px"
                          rounded="full"
                          title={`Holiday: ${holiday.name}`}
                        />
                      )}
                    </HStack>
                  </Box>
                );
              })}
          </SimpleGrid>
        </Box>


        <Box
          w="280px"
          p={4}
          bg={useColorModeValue("gray.50", "gray.800")}
          rounded="md"
          boxShadow="md"
        >
          <Text fontWeight="bold" fontSize="lg" mb={4}>
            Leave Summary
          </Text>

          <VStack align="start" spacing={3}>
            {Object.entries(leaveColors).map(([type, color]) => {

              const count =
                type === "Holiday"
                  ? holidays.length
                  : leaves.filter((l) => l.type === type).length;

              return (
                <HStack key={type} spacing={3} w="full" justifyContent="space-between">
                  <HStack spacing={2}>
                    <Box
                      w="16px"
                      h="16px"
                      bg={color}
                      rounded="md"
                      border="1px solid"
                      borderColor="gray.300"
                    />
                    <Text>{type}</Text>
                  </HStack>
                  <Text fontWeight="semibold" color={textColor}>
                    {count}
                  </Text>
                </HStack>
              );
            })}
          </VStack>

          <Divider my={6} />

          <Text fontSize="sm" color="gray.500" textAlign="center">
            Click on dots/days to view details or request leave (feature coming
            soon)
          </Text>
        </Box>
      </HStack>
    </Box>
  );
}
