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
  Text,
  Divider,
  FormErrorMessage,
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

const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const Recruitemp: React.FC = () => {
  const [candidate, setCandidate] = useState(initialCandidate);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const toast = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setCandidate({ ...candidate, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!candidate.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!candidate.email.trim() || !validateEmail(candidate.email))
      newErrors.email = 'Enter a valid email address.';
    if (!candidate.position.trim()) newErrors.position = 'Please select a position.';
    if (candidate.experience && Number(candidate.experience) < 0)
      newErrors.experience = 'Experience cannot be negative.';

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast({
        title: 'Validation Error',
        description: 'Please correct the highlighted fields.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 1000));

    console.log('Submitted Candidate:', candidate);

    toast({
      title: 'Application Submitted',
      description: `Thank you, ${candidate.fullName}!`,
      status: 'success',
      duration: 4000,
      isClosable: true,
    });

    setCandidate(initialCandidate);
    setIsSubmitting(false);
  };

  return (
    <Box maxW="600px" mx="auto" p={6} boxShadow="lg" borderRadius="lg" bg="white">
      <Heading mb={4} color="blue.600" textAlign="center">
        Recruitment Form
      </Heading>

      <Text mb={6} color="gray.600" fontSize="sm" textAlign="center">
        Please fill in your details to apply for a role at our company.
      </Text>

      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <Divider />

          <FormControl isRequired isInvalid={!!errors.fullName}>
            <FormLabel>Full Name</FormLabel>
            <Input
              name="fullName"
              value={candidate.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
            />
            <FormErrorMessage>{errors.fullName}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={candidate.email}
              onChange={handleChange}
              placeholder="Enter email address"
            />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
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

          <Divider />

          <FormControl isRequired isInvalid={!!errors.position}>
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
            <FormErrorMessage>{errors.position}</FormErrorMessage>
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
            <FormLabel>Resume Link</FormLabel>
            <Input
              type="url"
              name="resumeLink"
              value={candidate.resumeLink}
              onChange={handleChange}
              placeholder="Paste resume URL (Google Drive, etc.)"
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

          <Button
            type="submit"
            colorScheme="blue"
            width="full"
            mt={4}
            isLoading={isSubmitting}
            loadingText="Submitting..."
          >
            Submit Application
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Recruitemp;
