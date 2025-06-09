import React, { useState } from 'react';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Text,
  Switch,
  Button,
  Avatar,
  HStack,
  useColorMode,
  Divider,
  Stack,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

interface EmployeeSettingsPanelProps {
  employeeName?: string;
  employeeEmail?: string;
  employeeAvatar?: string;
  employeeRole?: string;
}

export default function Settingsemp({
  employeeName,
  employeeEmail,
  employeeAvatar,
  employeeRole = 'Associate Engineer',
}: EmployeeSettingsPanelProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const toast = useToast();

  const rawUsername = router.query.username;
  const username = Array.isArray(rawUsername) ? rawUsername[0] : rawUsername || 'User';

  const initialName = employeeName || username;
  const initialEmail =
    employeeEmail || `${initialName.toLowerCase().replace(/\s+/g, '.')}@company.com`;

  const [profile, setProfile] = useState({
    name: initialName,
    email: initialEmail,
    role: employeeRole,
    avatar: employeeAvatar || '',
  });

  const [notifications, setNotifications] = useState({ email: true, sms: false });
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  // Color mode values
  const bg = useColorModeValue('gray.50', 'gray.700');
  const cardBg = useColorModeValue('white', 'gray.800');
  const headingColor = useColorModeValue('teal.600', 'teal.300');
  const textSecondary = useColorModeValue('gray.600', 'gray.300');

  const handlePasswordChange = () => {
    setPasswordError('');
    setPasswordSuccess('');

    if (!passwords.current || !passwords.new || !passwords.confirm) {
      setPasswordError('All fields are required.');
      return;
    }

    if (passwords.new.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      return;
    }

    if (passwords.new !== passwords.confirm) {
      setPasswordError('Passwords do not match.');
      return;
    }

    setPasswordSuccess('Password updated successfully!');
    toast({
      title: 'Password Changed',
      description: 'Your password has been updated.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    setPasswords({ current: '', new: '', confirm: '' });
  };

  const handleSave = () => {
    toast({
      title: 'Settings Saved',
      description: `Changes saved for ${profile.name}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box maxW="1000px" mx="auto" p={6} bg={bg} borderRadius="10px" minH="100vh">
      <Heading size="lg" color={headingColor} mb={6} textAlign="center">
        Account Settings
      </Heading>

      <VStack spacing={8} align="stretch">
        {/* Profile Section */}
        <Box bg={cardBg} p={6} rounded="md" boxShadow="md">
          <Heading color={headingColor} fontSize="xl" mb={4}>
            Profile Information
          </Heading>
          <Stack spacing={4}>
            <HStack>
              <Avatar name={profile.name} src={profile.avatar} size="lg" />
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              </FormControl>
            </HStack>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </FormControl>

            <FormControl isDisabled>
              <FormLabel>Role</FormLabel>
              <Input value={profile.role} />
            </FormControl>
          </Stack>
        </Box>

        {/* Password Section */}
        <Box bg={cardBg} p={6} rounded="md" boxShadow="md">
          <Heading color={headingColor} fontSize="xl" mb={4}>
            Change Password
          </Heading>
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Current Password</FormLabel>
              <Input
                type="password"
                value={passwords.current}
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                placeholder="••••••••"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>New Password</FormLabel>
              <Input
                type="password"
                value={passwords.new}
                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                placeholder="At least 6 characters"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Confirm New Password</FormLabel>
              <Input
                type="password"
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                placeholder="Re-enter new password"
              />
            </FormControl>

            {passwordError && <Text color="red.500">{passwordError}</Text>}
            {passwordSuccess && <Text color="green.400">{passwordSuccess}</Text>}

            <Button onClick={handlePasswordChange} colorScheme="blue" alignSelf="flex-start">
              Update Password
            </Button>
          </Stack>
        </Box>

        {/* Notifications Section */}
        <Box bg={cardBg} p={6} rounded="md" boxShadow="md">
          <Heading color={headingColor} fontSize="xl" mb={4}>
            Notifications
          </Heading>
          <Stack spacing={4}>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="email-alerts" mb="0">
                Email Alerts
              </FormLabel>
              <Switch
                id="email-alerts"
                isChecked={notifications.email}
                onChange={(e) =>
                  setNotifications({ ...notifications, email: e.target.checked })
                }
              />
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="sms-alerts" mb="0">
                SMS Alerts
              </FormLabel>
              <Switch
                id="sms-alerts"
                isChecked={notifications.sms}
                onChange={(e) =>
                  setNotifications({ ...notifications, sms: e.target.checked })
                }
              />
            </FormControl>
          </Stack>
        </Box>

        {/* Save Button */}
        <Button colorScheme="green" size="lg" alignSelf="flex-end" onClick={handleSave}>
          Save All Settings
        </Button>
      </VStack>
    </Box>
  );
}
