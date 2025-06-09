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
  useColorModeValue,
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

  // Theming
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBg = useColorModeValue('white', 'gray.700');
  const headingColor = useColorModeValue('teal.600', 'teal.300');
  const textSecondary = useColorModeValue('gray.600', 'gray.400');

  if (!profile) {
    return (
      <Box p={6}>
        <Spinner />
        <Text ml={4}>Loading profile...</Text>
      </Box>
    );
  }

  return (
    <Box p={6} maxW="3xl" mx="auto" borderRadius="10px" bg={bgColor} minH="60vh">
      <Box bg={cardBg} p={6} borderRadius="md" boxShadow="md">
        <Heading mb={6} color={headingColor}>
          My Profile
        </Heading>

        <VStack align="start" spacing={6}>
          <HStack spacing={4}>
            <Avatar name={profile.name} src={profile.avatar} size="xl" />
            <Box>
              <Text fontSize="xl" fontWeight="bold">
                {profile.name}
              </Text>
              <Text color={textSecondary}>{profile.role}</Text>
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
    </Box>
  );
}
