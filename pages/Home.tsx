import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  Input,
  IconButton,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Badge,
  Tooltip,
  useColorModeValue,
  Button,
  Spacer,
} from '@chakra-ui/react';
import {
  FiHome,
  FiUsers,
  FiCheckSquare,
  FiCpu,
  FiCalendar,
  FiUserPlus,
  FiMessageCircle,
  FiSettings,
  FiBell,
  FiSearch,
  FiChevronDown,
  FiMenu,
  FiFileText,
  FiClock,
} from 'react-icons/fi';
import { useRouter } from 'next/router';
import Dashboardemp from './Dashboardemp';
import Usersemp from './Usersemp';
import Leaveemployee from './Leaveemployee';
import Calenderemp from './Calenderemp';
import Payslipemp from './Payslipemp';
import Checklistemp from './Checklistemp';
import Recruitemp from './Recruitemp';
import Parkingemp from './Parkingemp';
import Messagesemp from './Messagesemp';
import Settingsemp from './Settingsemp';
import Profileemp from './Profileemp';

const navItems = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'bookings', label: 'Bookings' },
  { key: 'newsrooms', label: 'Newsrooms' },
  { key: 'documents', label: 'Documents' },
];

const sidebarItems = [
  { key: 'dashboard', icon: FiHome, label: 'Dashboard' },
  { key: 'users', icon: FiUsers, label: 'Users' },
  { key: 'payslip', icon: FiFileText, label: 'Payslip' },
  { key: 'leave', icon: FiClock, label: 'Leave' },
  { key: 'checklist', icon: FiCheckSquare, label: 'Checklist' },
  { key: 'parking', icon: FiCpu, label: 'Parking' },
  { key: 'calendar', icon: FiCalendar, label: 'Calendar' },
  { key: 'recruit', icon: FiUserPlus, label: 'Recruit' },
  { key: 'messages', icon: FiMessageCircle, label: 'Messages' },
];

const settingsItem = { key: 'settings', icon: FiSettings, label: 'Settings' };

export default function DashboardLayout() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');


  const bg = useColorModeValue('gray.50', 'gray.800');
  const sidebarBg = useColorModeValue('white', 'gray.800');
  const router = useRouter();
  const rawUsername = router.query.username;
  const username = Array.isArray(rawUsername) ? rawUsername[0] : rawUsername || 'User';

  const handleClick = () => {
    setActiveTab('messages');
  };
  const handleGoToSettings = () => {
    setActiveTab('settings');
  };
  const handleGoToProfile = () => {
    setActiveTab('profile');
  };
  const handleLogout = () => {
    router.push('/');
  };

  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New leave request pending approval.', time: '2m ago', read: false },
    { id: 2, message: 'Payslip for May is now available.', time: '1h ago', read: false },
    { id: 3, message: 'Team meeting at 3 PM.', time: 'Today', read: true },
  ]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboardemp searchQuery={searchQuery} />;
      case 'users':
        return <Usersemp searchQuery={searchQuery} />;
      case 'payslip':
        return <Payslipemp />;
      case 'leave':
        return <Leaveemployee />;
      case 'calendar':
        return <Calenderemp />;
      case 'checklist':
        return <Checklistemp />;
      case 'parking':
        return <Parkingemp />;
      case 'recruit':
        return <Recruitemp />;
      case 'messages':
        return <Messagesemp />;
      case 'settings':
        return <Settingsemp />;
      case 'profile':
        return <Profileemp />;
      case 'bookings':
        return <Text>Here are your Bookings.</Text>;
      case 'newsrooms':
        return <Text>Newsrooms content goes here.</Text>;
      case 'documents':
        return <Text>Your Documents will appear here.</Text>;
      default:
        return <Text>Select a menu item.</Text>;
    }
  };

  return (
    <ChakraProvider>
      <Flex direction="column" height="100vh" bg={bg}>
        {/* Header with fixed teal background */}
        <Flex
          height="60px"
          bg="teal.500"
          color="white"
          px={6}
          align="center"
          justify="space-between"
          boxShadow="sm"
          position="fixed"
          top="0"
          left="0"
          right="0"
          zIndex="1000"
        >
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<FiMenu />}
              variant="ghost"
              aria-label="Open menu"
              display={{ base: 'inline-flex', md: 'none' }}
              mr={4}
              color="white"
            />
            <MenuList>
              {navItems.map((item) => (
                <MenuItem key={item.key} onClick={() => setActiveTab(item.key)}>
                  {item.label}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          <Text fontWeight="bold" fontSize="xl" cursor="pointer" color="white">
            AVLR
          </Text>

          <HStack
            spacing={6}
            flex="1"
            justify="center"
            maxW="600px"
            display={{ base: 'none', md: 'flex' }}
          >
            {navItems.map((item) => (
              <Button
                key={item.key}
                variant={activeTab === item.key ? 'solid' : 'ghost'}
                colorScheme={activeTab === item.key ? 'blue' : 'whiteAlpha'}
                onClick={() => setActiveTab(item.key)}
                size="sm"
              >
                {item.label}
              </Button>
            ))}
          </HStack>

          <HStack spacing={4} ml="auto" color="white">
            <Box maxW="200px" position="relative">
              <Input
                placeholder="Search..."
                size="sm"
                bg="teal.600"
                borderRadius="md"
                pl={8}

                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                _placeholder={{ color: 'teal.200' }}
                color="white"
                border="none"
                _focus={{ bg: 'teal.700' }}

              />
              <Box
                position="absolute"
                left={2}
                top="50%"
                transform="translateY(-50%)"
                color="teal.200"
                pointerEvents="none"
              >
                <FiSearch />
              </Box>
            </Box>

            <Menu>
              <Tooltip label="Notifications" hasArrow>
                <MenuButton as={Box} position="relative">
                  <IconButton
                    aria-label="Notifications"
                    icon={<FiBell />}
                    variant="ghost"
                    fontSize="20px"
                    color="white"
                  />
                  {notifications.some((n) => !n.read) && (
                    <Badge
                      position="absolute"
                      top="0"
                      right="0"
                      fontSize="0.65em"
                      colorScheme="red"
                      borderRadius="full"
                      px={2}
                    >
                      {notifications.filter((n) => !n.read).length}
                    </Badge>
                  )}
                </MenuButton>
              </Tooltip>
              <MenuList maxW="300px">
                {notifications.length === 0 ? (
                  <Text px={4} py={2}>
                    No new notifications
                  </Text>
                ) : (
                  notifications.map((note) => (
                    <MenuItem key={note.id} whiteSpace="normal">
                      <Box>
                        <Text fontWeight={note.read ? 'normal' : 'bold'}>{note.message}</Text>
                        <Text fontSize="xs" color="gray.500">
                          {note.time}
                        </Text>
                      </Box>
                    </MenuItem>
                  ))
                )}
                <MenuItem
                  onClick={() =>
                    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
                  }
                >
                  Mark all as read
                </MenuItem>
              </MenuList>
            </Menu>

            <Tooltip label="Messages" hasArrow>
              <IconButton
                aria-label="Messages"
                icon={<FiMessageCircle />}
                variant="ghost"
                fontSize="20px"
                color="white"
                onClick={handleClick}
              />
            </Tooltip>

            <Menu>
              <MenuButton as={Box} cursor="pointer" _hover={{ opacity: 0.8 }}>
                <HStack spacing={1} alignItems="center">
                  <Avatar size="sm" name={username} />
                  <Text fontWeight="medium">{username}</Text>
                  <FiChevronDown />
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue('white', 'red.800')}
                color={useColorModeValue('gray.800', 'white')}
                border="1px solid"
                borderColor={useColorModeValue('gray.200', 'gray.600')}
                boxShadow="lg"
              >
                <MenuItem _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }} onClick={handleGoToProfile}>
                  Profile
                </MenuItem>
                <MenuItem _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }} onClick={handleGoToSettings}>
                  Settings
                </MenuItem>
                <MenuItem _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }} onClick={handleLogout}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>

          </HStack>
        </Flex>

        {/* Sidebar */}
        <Flex flex="1" pt="60px" height="calc(100vh - 60px)">
          <VStack
            bg={sidebarBg}
            width="220px"
            p={4}
            spacing={2}
            align="stretch"
            borderRight="1px solid"
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            position="fixed"
            top="60px"
            bottom="0"
            left="0"
            overflowY="auto"
          >
            {sidebarItems.map(({ key, icon: Icon, label }) => (
              <Button
                key={key}
                leftIcon={<Icon />}
                justifyContent="flex-start"
                variant={activeTab === key ? 'solid' : 'ghost'}
                colorScheme={activeTab === key ? 'blue' : 'gray'}
                onClick={() => setActiveTab(key)}
                size="md"
                width="100%"
              >
                {label}
              </Button>
            ))}

            <Spacer />

            <Button
              leftIcon={<settingsItem.icon />}
              justifyContent="flex-start"
              variant={activeTab === settingsItem.key ? 'solid' : 'ghost'}
              colorScheme={activeTab === settingsItem.key ? 'blue' : 'gray'}
              onClick={() => setActiveTab(settingsItem.key)}
              size="md"
              width="100%"
              mt="auto"
            >
              {settingsItem.label}
            </Button>
          </VStack>

          {/* Main content */}
          <Box
            ml="220px"
            p={6}
            flex="1"
            overflowY="auto"
            maxHeight="calc(100vh - 60px)"
            bg={useColorModeValue('white', 'gray.700')}
            borderRadius="md"
            boxShadow="sm"
          >
            {renderContent()}
          </Box>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
