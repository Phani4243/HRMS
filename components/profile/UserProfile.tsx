import {
  Avatar,
  Box,
  Flex,
  Stack,
  Text,
  Badge,
  Button,
  Link,
  Divider,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  SimpleGrid,
  Icon,
} from "@chakra-ui/react";
import { SlLocationPin } from "react-icons/sl";
import { CiMail } from "react-icons/ci";
import { FaRegAddressCard } from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";
import { useRouter } from "next/router";
import UserCard from "./id-card/UserCard";
import { userProfileMenuList } from "./constants/profileInfo";

const UserProfile = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const handleRoute = (path) => {
    router.push(path);
  };

  return (
    <Box px={{ base: 4, md: 8 }} py={6}>
      {/* Profile Header */}
      <Flex gap={8} align="center" wrap="wrap">
        <Avatar size="2xl" name="Jhon James" src="https://bit.ly/dan-abramov" />
        <Stack spacing={2}>
          <Flex align="center" gap={3}>
            <Text fontSize="2xl" fontWeight="bold">Jhon James</Text>
            <Badge colorScheme="red">Not in Yet</Badge>
          </Flex>
          <Flex align="center" gap={4} wrap="wrap">
            <Flex align="center" gap={2}><SlLocationPin /><Text>Surat</Text></Flex>
            <Flex align="center" gap={2}><CiMail /><Link color="blue.500" href="mailto:xyz@gmail.com">xyz@gmail.com</Link></Flex>
            <Flex align="center" gap={2}><BsTelephone /><Link color="blue.500" href="tel:1234567890">1234567890</Link></Flex>
            <Flex align="center" gap={2}><FaRegAddressCard /><Button variant="link" colorScheme="blue" onClick={onOpen}>ID Card</Button></Flex>
          </Flex>
        </Stack>
      </Flex>

      <Divider my={6} />

      {/* Job Info */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        <Box>
          <Text fontWeight="semibold">Job Title</Text>
          <Text>Front-End Developer</Text>
        </Box>
        <Box>
          <Text fontWeight="semibold">Department</Text>
          <Text>Web Deployment</Text>
        </Box>
        <Box>
          <Text fontWeight="semibold">Reporting To</Text>
          <Text>DK Raman</Text>
        </Box>
      </SimpleGrid>

      <Divider my={6} />

      {/* Profile Navigation */}
      <Flex wrap="wrap" justifyContent="space-around" gap={4}>
        {userProfileMenuList.map((item) => (
          <Button
            key={item.id}
            variant={router.pathname.includes(item.path) ? "solid" : "outline"}
            colorScheme="blue"
            onClick={() => handleRoute(item.path)}
            rightIcon={
              item.hasBadge ? (
                <Badge boxSize={2} bg="red.500" borderRadius="full" />
              ) : null
            }
          >
            {item.menuTittle}
          </Button>
        ))}
      </Flex>

      {/* Main Content */}
      <Box mt={10}>{children}</Box>

      {/* ID Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader bg="blue.100">Digital ID Preview</DrawerHeader>
          <DrawerBody>
            <UserCard />
          </DrawerBody>
          <DrawerFooter>
            <Button colorScheme="blue">Download</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default UserProfile;
