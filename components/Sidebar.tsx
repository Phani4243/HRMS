import React, { ReactNode } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Link,
} from '@chakra-ui/react';
import {
  FiHome,
  FiCalendar,
  FiTrello,
  FiUser,
  FiHelpCircle,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi';
import NextLink from 'next/link';
import { IconType } from 'react-icons';
import { DarkModeSwitch } from './DarkModeSwitch';
import { useRouter } from 'next/router';

interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
}

interface NavItemProps {
  icon: IconType;
  children: React.ReactNode;
  path: string;
}

interface MobileProps {
  onOpen: () => void;
}

interface SidebarProps {
  onClose: () => void;
  display: { base: string; md: string };
  children?: React.ReactNode;
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, path: '/about' },
  { name: 'Attendance', icon: FiCalendar, path: '/attendance' },
  { name: 'Timesheets', icon: FiTrello, path: '/timesheet' },
  { name: 'Leaves', icon: FiUser, path: '/leaves' },
  { name: 'Support', icon: FiHelpCircle, path: '/support' },
  { name: 'Settings', icon: FiSettings, path: '/settings' },
];

const SidebarContent = ({ onClose, display }: SidebarProps) => {
  return (
    <Box
      transition="0.3s ease"
      bg="teal.800"
      color="white"
      borderRight="1px"
      borderRightColor="teal.600"
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      top="0"
      left="0"
      h="100vh"
      display={display}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="bold" fontFamily="heading">
          AVLR
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, path, children }: NavItemProps) => {
  return (
    <Link
      as={NextLink}
      href={path}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="md"
        role="group"
        cursor="pointer"
        transition="background 0.2s"
        _hover={{
          bg: 'teal.600',
          color: 'white',
        }}
      >
        {icon && <Icon mr="4" fontSize="18" as={icon} />}<Text fontWeight="medium">{children}</Text>
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen }: MobileProps) => {
  const router = useRouter();

  return (
    <Flex
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg="teal.800"
      color="white"
      borderBottomWidth="1px"
      borderBottomColor="teal.600"
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="ghost"
        aria-label="Open menu"
        icon={<FiMenu />}
        color="white"
      />

      <Text fontSize="2xl" fontWeight="bold" display={{ base: 'flex', md: 'none' }}>
        AVLR
      </Text>

      <HStack spacing={{ base: 1, md: 4 }}>
        <DarkModeSwitch />
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="Notifications"
          icon={<FiBell />}
          color="white"
        />
        <Menu>
          <MenuButton py={2}>
            <HStack>
              <Avatar size="sm" name="Ankit Yadav" />
              <VStack spacing="1px" alignItems="flex-start" display={{ base: 'none', md: 'flex' }}>
                <Text fontSize="sm" fontWeight="bold">
                  Ankit Yadav
                </Text>
                <Text fontSize="xs" color="teal.100">
                  CTO
                </Text>
              </VStack>
              <Box display={{ base: 'none', md: 'flex' }}>
                <FiChevronDown />
              </Box>
            </HStack>
          </MenuButton>
          <MenuList bg="white" color="black">
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuDivider />
            <MenuItem onClick={() => router.push('/login')}>Sign out</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

const SidebarWithHeader = ({ children }: { children: ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg="gray.100">
      <SidebarContent onClose={onClose} display={{ base: 'none', md: 'block' }} />

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} display={{ base: 'block', md: 'none' }} />
        </DrawerContent>
      </Drawer>

      <Box position="fixed" top="0" left={{ base: 0, md: 60 }} right="0" zIndex="1000" height="80px" bg="teal.500">
        <MobileNav onOpen={onOpen} />
      </Box>

      <Box ml={{ base: 0, md: 60 }} mt="80px" p="4">
        {children}
      </Box>
    </Box>
  );
};

export default SidebarWithHeader;
