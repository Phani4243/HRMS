import { useRouter } from 'next/router';
import {
  Box,
  Heading,
  Text,
  Avatar,
  VStack,
  HStack,
  Divider,
  Spinner,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface ProfileData {
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

export default function Profileemp() {
  const router = useRouter();
  const rawUsername = router.query.username;
  const username = Array.isArray(rawUsername)
    ? rawUsername[0]
    : rawUsername || 'User';

  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    
    const fetchProfile = () => {
      setProfile({
        name: username,
        email: `${username.toLowerCase().replace(/\s+/g, '.')}@company.com`,
        avatar: '',
        role: 'Software Engineer',
      });
    };

    if (username) fetchProfile();
  }, [username]);

  if (!profile) {
    return (
      <Box p={6}>
        <Spinner />
        <Text ml={4}>Loading profile...</Text>
      </Box>
    );
  }

  return (
    <Box p={6} maxW="3xl" mx="auto">
      <Heading mb={6}>My Profile</Heading>
      <VStack align="start" spacing={6}>
        <HStack spacing={4}>
          <Avatar name={profile.name} src={profile.avatar} size="xl" />
          <Box>
            <Text fontSize="xl" fontWeight="bold">
              {profile.name}
            </Text>
            <Text color="gray.600">{profile.role}</Text>
          </Box>
        </HStack>

        <Divider />

        <Box>
          <Text fontWeight="bold">Email:</Text>
          <Text>{profile.email}</Text>
        </Box>

        <Box>
          <Text fontWeight="bold">Username:</Text>
          <Text>{username}</Text>
        </Box>
      </VStack>
    </Box>
  );
}
