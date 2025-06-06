import { Box, Card, Link, Text, HStack, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";

const AttendanceNavbar = ({ children }) => {
  const router = useRouter();

  const activeBg = useColorModeValue("blue.100", "blue.700");
  const activeColor = useColorModeValue("blue.600", "white");
  const inactiveColor = useColorModeValue("gray.600", "gray.300");
  const hoverBg = useColorModeValue("gray.200", "gray.700");

  const menuItems = [
    { label: "Attendance Log", path: "/attendance" },
    { label: "Shift Schedule", path: "/attendance/shift-schedule" },
    { label: "Attendance Request", path: "/attendance/attendance-request" },
    { label: "Overtime Request", path: "/attendance/overtime-request" },
    { label: "Shift Weekly Off Request", path: "/attendance/shift-weeklyOff" },
  ];

  return (
    <>
      <Card
        p={4}
        borderRadius="md"
        bg={useColorModeValue("gray.50", "gray.800")}
        boxShadow="sm"
      >
        <HStack justifyContent="space-around" spacing={4} overflowX="auto" flexWrap="wrap">
          {menuItems.map(({ label, path }, index) => {
            const isActive = router.pathname === path;

            return (
              <Link
                key={index}
                as={NextLink}
                href={path}
                _hover={{ textDecoration: "none" }}
              >
                <Text
                  px={4}
                  py={2}
                  borderRadius="md"
                  fontWeight="medium"
                  bg={isActive ? activeBg : "transparent"}
                  color={isActive ? activeColor : inactiveColor}
                  _hover={{
                    bg: hoverBg,
                    color: activeColor,
                    cursor: "pointer",
                  }}
                  transition="all 0.2s"
                  whiteSpace="nowrap"
                >
                  {label}
                </Text>
              </Link>
            );
          })}
        </HStack>
      </Card>

      <Box mt={6}>
        {children}
      </Box>
    </>
  );
};

export default AttendanceNavbar;
