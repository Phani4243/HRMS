import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Heading,
  VStack,
  useToast,
} from '@chakra-ui/react';

interface Candidate {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  resumeLink: string;
  notes: string;
}

const initialCandidate: Candidate = {
  fullName: '',
  email: '',
  phone: '',
  position: '',
  experience: '',
  resumeLink: '',
  notes: '',
};

const Recruitemp: React.FC = () => {
  const [candidate, setCandidate] = useState(initialCandidate);
  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setCandidate({ ...candidate, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    
    if (!candidate.fullName || !candidate.email || !candidate.position) {
      toast({
        title: 'Missing required fields',
        description: 'Please fill out Full Name, Email, and Position.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    
    console.log('Submitted Candidate:', candidate);

    toast({
      title: 'Application Submitted',
      description: `Thank you, ${candidate.fullName}!`,
      status: 'success',
      duration: 4000,
      isClosable: true,
    });


    setCandidate(initialCandidate);
  };

  return (
    <Box maxW="600px" mx="auto" p={6} boxShadow="md" borderRadius="md" bg="white">
      <Heading mb={6} color="blue.600" textAlign="center">
        Recruitment Form
      </Heading>

      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input
              name="fullName"
              value={candidate.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={candidate.email}
              onChange={handleChange}
              placeholder="Enter email address"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Phone Number</FormLabel>
            <Input
              type="tel"
              name="phone"
              value={candidate.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Position Applied For</FormLabel>
            <Select
              name="position"
              value={candidate.position}
              onChange={handleChange}
              placeholder="Select position"
            >
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="Fullstack Developer">Fullstack Developer</option>
              <option value="UI/UX Designer">UI/UX Designer</option>
              <option value="Project Manager">Project Manager</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Years of Experience</FormLabel>
            <Input
              type="number"
              name="experience"
              value={candidate.experience}
              onChange={handleChange}
              placeholder="Enter years of experience"
              min={0}
              max={50}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Resume Link (optional)</FormLabel>
            <Input
              type="url"
              name="resumeLink"
              value={candidate.resumeLink}
              onChange={handleChange}
              placeholder="Paste resume URL"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Additional Notes</FormLabel>
            <Textarea
              name="notes"
              value={candidate.notes}
              onChange={handleChange}
              placeholder="Add any additional information"
              resize="vertical"
            />
          </FormControl>

          <Button type="submit" colorScheme="blue" width="full" mt={4}>
            Submit Application
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Recruitemp;
