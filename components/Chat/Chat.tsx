import React, { useState, useRef, useEffect } from 'react';
import { chatService } from './../../lib/services/chat';
import {
  Box,
  VStack,
  HStack,
  Input,
  Button,
  Text,
  Flex,
  useColorModeValue,
  IconButton,
  SlideFade,
  CloseButton,
  Portal,
} from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const Chat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage: ChatMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const reply = await chatService.chat(newMessages);
      const assistantMessage: ChatMessage = { role: 'assistant', content: reply };
      setMessages([...newMessages, assistantMessage]);
    } catch (error) {
      alert('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const bgColor = useColorModeValue('white', 'gray.800');
  const userBubbleColor = useColorModeValue('blue.500', 'blue.200');
  const assistantBubbleColor = useColorModeValue('gray.200', 'gray.600');
  const buttonBgColor = useColorModeValue('blue.500', 'blue.200');
  const buttonColor = useColorModeValue('white', 'gray.800');

  return (
    <Portal>
      <Box
        position="fixed"
        bottom={{ base: "20px", md: "20px" }}
        right={{ base: "20px", md: "80px" }}
        zIndex={99999}
        ml={{ base: 0, md: "60px" }}
      >
        <SlideFade in={isOpen} offsetY="20px">
          <Box
            display={isOpen ? 'block' : 'none'}
            width="350px"
            height="500px"
            bg={bgColor}
            boxShadow="2xl"
            borderRadius="xl"
            overflow="hidden"
            border="1px solid"
            borderColor="gray.200"
            position="absolute"
            bottom="60px"
            right="0"
          >
            <Flex 
              p={3} 
              bg={buttonBgColor} 
              color={buttonColor}
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontWeight="bold">Chat Assistant</Text>
              <CloseButton color={buttonColor} onClick={() => setIsOpen(false)} />
            </Flex>
            
            <VStack h="calc(100% - 60px)" spacing={4} p={4}>
              <Box
                flex="1"
                w="full"
                overflowY="auto"
                css={{
                  '&::-webkit-scrollbar': {
                    width: '4px',
                  },
                  '&::-webkit-scrollbar-track': {
                    width: '6px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'gray',
                    borderRadius: '24px',
                  },
                }}
              >
                <VStack align="stretch" spacing={4}>
                  {messages.map((msg, idx) => (
                    <Flex
                      key={idx}
                      justify={msg.role === 'user' ? 'flex-end' : 'flex-start'}
                    >
                      <Box
                        maxW="80%"
                        bg={msg.role === 'user' ? userBubbleColor : assistantBubbleColor}
                        color={msg.role === 'user' ? 'white' : 'inherit'}
                        p={2}
                        borderRadius="lg"
                        fontSize="sm"
                      >
                        <Text>{msg.content}</Text>
                      </Box>
                    </Flex>
                  ))}
                  <div ref={messagesEndRef} />
                </VStack>
              </Box>

              <HStack w="full" spacing={2}>
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  size="sm"
                  disabled={isLoading}
                />
                <Button
                  colorScheme="blue"
                  onClick={handleSend}
                  isLoading={isLoading}
                  loadingText="..."
                  size="sm"
                >
                  Send
                </Button>
              </HStack>
            </VStack>
          </Box>
        </SlideFade>

        {!isOpen && (
          <IconButton
            aria-label="Open chat"
            icon={<ChatIcon />}
            onClick={() => setIsOpen(true)}
            colorScheme="blue"
            rounded="full"
            size="lg"
            boxShadow="2xl"
          />
        )}
      </Box>
    </Portal>
  );
};
