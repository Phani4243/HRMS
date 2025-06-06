import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Card,
  Link,
  Text,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { aboutSubmenuList } from "./constants/aboutInfo";

const About = ({ children }) => {
  const router = useRouter();

  const activeBg = useColorModeValue("blue.100", "blue.700");
  const activeColor = useColorModeValue("blue.600", "white");

  return (
    <>
      <Box>
        <Card
          p={4}
          borderRadius="md"
          bg={useColorModeValue("gray.50", "gray.800")}
          boxShadow="sm"
        >
          <HStack justifyContent={"space-around"} cursor="pointer" overflowX="auto" py={2}>
            {aboutSubmenuList.map((data, index) => {
              const isActive = router.pathname === data.path;

              return (
                <Link
                  key={index}
                  as={NextLink}
                  href={data.path}
                  _hover={{ textDecoration: "none" }}
                >
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
                    {data.menuTittle}
                  </Text>
                </Link>
              );
            })}
          </HStack>
        </Card>
      </Box>

      <Box mt={6}>
        {children}
      </Box>
    </>
  );
};

export default About;
