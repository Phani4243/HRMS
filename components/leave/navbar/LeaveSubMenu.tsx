import { Box, Card, Link, Text } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { useColorModeValue } from "@chakra-ui/react";

const LeaveSubMenu = ({ children }) => {
  const router = useRouter();
  const isActive = router.pathname === "/leaves";
  const activeBg = useColorModeValue("blue.100", "blue.700");
  const activeColor = useColorModeValue("blue.600", "white");
  return (
    <>
      <Box
        as="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <Card w="full">
          <Box
            as="div"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "2rem",
              h: "full",
              padding:"20px"
            }}
          >
            <Link as={NextLink} href="/leaves" _hover={{ textDecoration: "none" }}>
              <Text
                px={4}
                py={2}
                borderRadius="md"
                fontWeight="medium"
                bg={isActive ? activeBg : "transparent"}
                color={isActive ? activeColor : useColorModeValue("gray.600", "gray.300")}
                _hover={{
                  bg: useColorModeValue("gray.200", "gray.700"),
                  color: activeColor,
                }}
                transition="all 0.2s"
                whiteSpace="nowrap"
              >
                Summary
              </Text>
            </Link>
          </Box>
        </Card>
      </Box>
      {children}
    </>
  );
};

export default LeaveSubMenu;
