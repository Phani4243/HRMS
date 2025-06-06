import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Card,
  Text,
  Link,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { assetMenuList } from "./constants/assetData";

const AssetsNavbar = ({ children }) => {
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
          <HStack
            justifyContent={"space-around"}
            cursor="pointer"
            overflowX="auto"
            py={2}
          >
            {assetMenuList.map((menuInfo, index) => {
              const isActive = router.pathname === menuInfo.menuPath;

              return (
                <Link
                  key={index}
                  as={NextLink}
                  href={menuInfo.menuPath}
                  _hover={{ textDecoration: "none" }}
                >
                  <Text
                    px={4}
                    py={2}
                    borderRadius="md"
                    fontWeight="medium"
                    bg={isActive ? activeBg : "transparent"}
                    color={
                      isActive
                        ? activeColor
                        : useColorModeValue("gray.600", "gray.300")
                    }
                    _hover={{
                      bg: useColorModeValue("gray.200", "gray.700"),
                      color: activeColor,
                    }}
                    transition="all 0.2s"
                    whiteSpace="nowrap"
                  >
                    {menuInfo.menuTittle}
                  </Text>
                </Link>
              );
            })}
          </HStack>
        </Card>
      </Box>

      <Box mt={6}>{children}</Box>
    </>
  );
};

export default AssetsNavbar;
