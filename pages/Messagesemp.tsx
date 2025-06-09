import React, { useState } from 'react';
import {
  Box,
  Heading,
  VStack,
  Text,
  HStack,
  Avatar,
  Badge,
  Input,
  InputGroup,
  InputLeftElement,
  Divider,
  Button,
  useColorModeValue,
  Select,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import {DarkModeSwitch} from '../components/DarkModeSwitch'; // Adjust path if needed

const companyUsers = ['HR Team', 'Manager', 'Employee A', 'Employee B', 'IT Support'];

interface Message {
  id: number;
  sender: string;
  recipient: string;
  avatar?: string;
  content: string;
  timestamp: string;
  status: 'read' | 'unread';
}

const initialMessages: Message[] = [
  {
    id: 1,
    sender: 'John Doe',
    recipient: 'HR Team',
    avatar: 'https://bit.ly/dan-abramov',
    content: 'Hey, just checking in about the leave request.',
    timestamp: '10 mins ago',
    status: 'unread',
  },
  {
    id: 2,
    sender: 'HR Team',
    recipient: 'John Doe',
    avatar: 'https://bit.ly/prosper-baba',
    content: 'Your leave has been approved.',
    timestamp: '1 hour ago',
    status: 'read',
  },
];

export default function EmployeeMessagesPanel() {
  const router = useRouter();
  const rawUsername = router.query.username;
  const currentEmployee = Array.isArray(rawUsername) ? rawUsername[0] : rawUsername || 'User';

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [recipient, setRecipient] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Theming with useColorModeValue
  const cardBg = useColorModeValue('white', 'gray.700');
  const unreadBg = useColorModeValue('blue.50', 'blue.900');
  const inputBg = useColorModeValue('white', 'gray.800');
  const pageBg = useColorModeValue('gray.50', 'gray.900');
  const headingColor = useColorModeValue('teal.600', 'teal.300');

  const handleSend = () => {
    if (!recipient.trim() || !messageContent.trim()) return;

    const now = new Date();
    const newMsg: Message = {
      id: messages.length + 1,
      sender: currentEmployee,
      recipient: recipient.trim(),
      avatar: '',
      content: messageContent.trim(),
      timestamp: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'read',
    };

    setMessages([newMsg, ...messages]);
    setRecipient('');
    setMessageContent('');
  };

  const handleMarkAsRead = (id: number) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id && msg.status === 'unread' ? { ...msg, status: 'read' } : msg
      )
    );
  };

  const employeeMessages = messages.filter(
    (msg) =>
      (msg.sender === currentEmployee || msg.recipient === currentEmployee) &&
      (msg.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const unreadCount = employeeMessages.filter(
    (msg) => msg.status === 'unread' && msg.recipient === currentEmployee
  ).length;

  return (
    <Box p={6} maxW="1000px" mx="auto" borderRadius="10px" bg={pageBg} minH="100vh">
      <HStack justify="space-between" mb={6}>
        <Heading size="lg" color={headingColor}>My Messages</Heading>
        <HStack spacing={4}>
          {unreadCount > 0 && (
            <Badge colorScheme="red" fontSize="md">
              {unreadCount} Unread
            </Badge>
          )}
        </HStack>
      </HStack>

      <InputGroup mb={6}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.400" />
        </InputLeftElement>
        <Input
          placeholder="Search messages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          bg={inputBg}
        />
      </InputGroup>

      <VStack spacing={4} align="stretch" maxH="60vh" overflowY="auto">
        {employeeMessages.map((msg) => (
          <Box
            key={msg.id}
            p={4}
            borderWidth="1px"
            borderRadius="md"
            bg={msg.status === 'unread' ? unreadBg : cardBg}
            boxShadow="sm"
            _hover={{ boxShadow: 'md', cursor: 'pointer' }}
            onClick={() => handleMarkAsRead(msg.id)}
            transition="background 0.2s"
          >
            <HStack spacing={4}>
              <Avatar name={msg.sender} src={msg.avatar} />
              <Box flex="1">
                <HStack justify="space-between">
                  <Text fontWeight="bold">
                    {msg.sender} → {msg.recipient}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    {msg.timestamp}
                  </Text>
                </HStack>
                <Text mt={1}>{msg.content}</Text>
                {msg.status === 'unread' && msg.recipient === currentEmployee && (
                  <Badge mt={2} colorScheme="blue">
                    Unread
                  </Badge>
                )}
              </Box>
            </HStack>
          </Box>
        ))}
      </VStack>

      <Divider my={6} />

      <HStack mt={4} spacing={3} flexWrap="wrap">
        <Select
          placeholder="Send to..."
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          maxW="200px"
          bg={inputBg}
        >
          {companyUsers
            .filter((user) => user !== currentEmployee)
            .map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
        </Select>

        <Input
          placeholder="Type your message..."
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          flex="1"
          bg={inputBg}
        />
        <Button colorScheme="blue" onClick={handleSend}>
          Send
        </Button>
      </HStack>
    </Box>
  );
}

