import React from "react";
import {
  Box,
  Heading,
  Text,
  Link,
  VStack,
  Divider,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

const PrivacyPolicy = () => {
  return (
    <Box maxW="800px" mx="auto" py={10} px={6} bg="white" rounded="md" shadow="sm">
      <Heading as="h1" size="xl" mb={6} color="teal.600" textAlign="center">
        Privacy Policy
      </Heading>

      <VStack spacing={6} align="start">
        <Box>
          <Heading as="h2" size="md" mb={2} color="teal.500">
            Overview
          </Heading>
          <Text fontSize="md" color="gray.700">
            This Leave Management System is designed to securely collect and manage employee leave
            information. We are committed to safeguarding your personal data and ensuring that it is
            used responsibly and transparently.
          </Text>
        </Box>

        <Divider />

        <Box>
          <Heading as="h2" size="md" mb={2} color="teal.500">
            Data Collection
          </Heading>
          <Text fontSize="md" color="gray.700" mb={2}>
            We collect and store the following information:
          </Text>
          <List spacing={2} pl={4}>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="teal.400" />
              Leave type (e.g., annual, sick, casual)
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="teal.400" />
              Leave dates (from and to)
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="teal.400" />
              Reason for leave
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircleIcon} color="teal.400" />
              Application timestamps
            </ListItem>
          </List>
        </Box>

        <Divider />

        <Box>
          <Heading as="h2" size="md" mb={2} color="teal.500">
            Data Usage
          </Heading>
          <Text fontSize="md" color="gray.700">
            Your leave data is used strictly for internal HR processing and approval purposes. It will
            never be sold, shared, or distributed to any third party without your explicit consent.
          </Text>
        </Box>

        <Divider />

        <Box>
          <Heading as="h2" size="md" mb={2} color="teal.500">
            Security
          </Heading>
          <Text fontSize="md" color="gray.700">
            We implement strong technical and organizational safeguards to protect your data against
            unauthorized access, alteration, or disclosure.
          </Text>
        </Box>

        <Divider />

        <Box>
          <Heading as="h2" size="md" mb={2} color="teal.500">
            Contact Us
          </Heading>
          <Text fontSize="md" color="gray.700">
            If you have questions about this policy or how your data is handled, please contact the HR
            department or email us at <Link color="teal.500">hr@example.com</Link>.
          </Text>
        </Box>

        <Box textAlign="center" pt={6} w="full">
          <NextLink href="/Home" passHref>
            <Link color="teal.600" fontWeight="medium" fontSize="md">
              ← Back to Leave Dashboard
            </Link>
          </NextLink>
        </Box>
      </VStack>
    </Box>
  );
};

export default PrivacyPolicy;
