import React, { useState, useEffect } from "react";
import { BsGraphUpArrow } from "react-icons/bs";
import { IoFingerPrintSharp } from "react-icons/io5";
import {
  Box,
  Card,
  Text,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { attendanceDaysName } from "../constants/attendanceList";
import ProgressBar from "@ramonak/react-progress-bar";

const AttendanceTiming = () => {
  const [currentDay, setCurrentDay] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [attendanceInfo, setAttendanceInfo] = useState({
    dayValue: "",
    hourInfo: 0,
  });

  const hoverBorderColor = useColorModeValue("red.400", "red.300");
  const selectedBorderColor = useColorModeValue("green.400", "green.300");
  const sundayBg = useColorModeValue("gray.100", "gray.700");

  useEffect(() => {
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: "long" };
    const dayName = currentDate.toLocaleString("en-US", options).toLowerCase();
    setCurrentDay(dayName);
  }, []);

  const handleDataTime = (hourInfo: number, dayValue: string) => {
    setAttendanceInfo({
      dayValue,
      hourInfo,
    });
    setSelectedDay(dayValue);
  };

  return (
    <Box maxW="600px" mx="auto" p={4} display="flex" flexDirection="column" gap={4}>
      <Text fontWeight="semibold" color="blue.600" fontSize="2xl">
        Timings
      </Text>

      <Card
        p={6}
        borderRadius="lg"
        boxShadow="md"
        height="330px"
        bg={useColorModeValue("white", "gray.700")}
      >
        <HStack justifyContent="space-between" alignItems="center" mb={6} flexWrap="wrap" spacing={4}>
          <HStack spacing={3} overflowX="auto" flex="1">
            {attendanceDaysName.map(({ id, dayTittle, dayValue, hourInfo }) => {
              const isSelected = selectedDay === dayValue;
              const isToday = currentDay === dayValue;

              return (
                <Box
                  key={id}
                  as="button"
                  px={4}
                  py={1}
                  borderRadius="md"
                  borderWidth={isSelected ? "2px" : "1px"}
                  borderColor={isSelected ? selectedBorderColor : "gray.400"}
                  bg={
                    isToday
                      ? "#3182ce" // Chakra UI blue.500
                      : dayValue === "sunday"
                        ? sundayBg
                        : "transparent"
                  }
                  color={isToday ? "white" : "inherit"}
                  fontWeight="medium"
                  cursor={hourInfo !== undefined ? "pointer" : "not-allowed"}
                  _hover={{
                    color: hoverBorderColor,
                    borderColor: hoverBorderColor,
                    transition: "all 0.3s ease",
                  }}
                  onClick={() => {
                    if (hourInfo !== undefined) {
                      handleDataTime(hourInfo, dayValue);
                    }
                  }}
                  whiteSpace="nowrap"
                >
                  {dayTittle}
                </Box>
              );
            })}
          </HStack>

          {/* <HStack spacing={4} flexShrink={0}>
            <BsGraphUpArrow color={useColorModeValue("gray.500", "gray.400")} size={20} />
            <IoFingerPrintSharp color={useColorModeValue("gray.500", "gray.400")} size={20} />
          </HStack> */}
        </HStack>

        <Box>
          <Text fontWeight="semibold" mb={2}>
            {attendanceInfo.dayValue
              ? `${attendanceInfo.dayValue} (Flexible Timings)`
              : "Today (Flexible Timings)"}
          </Text>

          <ProgressBar
            completed={Number(attendanceInfo.hourInfo)}
            maxCompleted={10}
            customLabel={`${Number(attendanceInfo.hourInfo)} Hour${attendanceInfo.hourInfo !== 1 ? "s" : ""
              }`}
            bgColor="#3182ce" // Blue progress bar
            height="1rem"
            baseBgColor={useColorModeValue("#e2e8f0", "#2D3748")}
            labelColor="white"
          />

          <HStack justifyContent="space-between" mt={2}>
            <Text color={useColorModeValue("gray.600", "gray.400")}>
              Duration: {attendanceInfo.hourInfo} Hour
              {attendanceInfo.hourInfo !== 1 ? "s" : ""}
            </Text>
            <Text color={useColorModeValue("gray.600", "gray.400")}>Break: 0min</Text>
          </HStack>
        </Box>
      </Card>
    </Box>
  );
};

export default AttendanceTiming;
