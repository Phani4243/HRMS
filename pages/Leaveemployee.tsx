import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  FormControl,
  FormLabel,
  Select,
  Button,
  HStack,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  Progress,
  Link,
  InputGroup,
  InputRightElement,
  Input,
  FormErrorMessage,
  Collapse,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FiCalendar, FiCheckCircle, FiClock, FiSearch } from "react-icons/fi";
import DatePicker from "react-datepicker";
import NextLink from "next/link";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type LeaveStatus = "Approved" | "Pending" | "Rejected";

interface LeaveRecord {
  id: number;
  type: string;
  from: Date;
  to: Date;
  status: LeaveStatus;
  appliedOn: Date;
}

interface FormData {
  leaveType: string;
  fromDate: Date | null;
  toDate: Date | null;
  reason: string;
}

const schema = yup.object({
  leaveType: yup.string().required("Please select leave type"),
  fromDate: yup.date().nullable().required("Please select start date"),
  toDate: yup
    .date()
    .nullable()
    .min(yup.ref("fromDate"), "End date can't be before start date")
    .required("Please select end date"),
  reason: yup
    .string()
    .trim()
    .min(10, "Reason must be at least 10 characters")
    .required("Please enter reason"),
});

const calculateLeaveDays = (from: Date | null, to: Date | null) => {
  if (!from || !to) return 0;
  const timeDiff = to.getTime() - from.getTime();
  return Math.floor(timeDiff / (1000 * 3600 * 24)) + 1;
};

const Leaveemployee: React.FC = () => {
  const [leaveHistory, setLeaveHistory] = useState<LeaveRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showHistory, setShowHistory] = useState(true);
  const toast = useToast();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      leaveType: "",
      fromDate: null,
      toDate: null,
      reason: "",
    },
    resolver: yupResolver(schema) as any,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!data.fromDate || !data.toDate) return;

    try {
      const response = await fetch("/api/leave", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leaveType: data.leaveType,
          fromDate: data.fromDate,
          toDate: data.toDate,
          reason: data.reason,
        }),
      });

      if (!response.ok) throw new Error("Submission failed");

      const result = await response.json();

      const newLeave: LeaveRecord = {
        id: Date.now(),
        type: data.leaveType,
        from: data.fromDate,
        to: data.toDate,
        status: "Pending",
        appliedOn: new Date(),
      };

      setLeaveHistory([newLeave, ...leaveHistory]);
      reset();

      toast({
        title: "Leave request submitted!",
        description: "Sent to HR and Team Lead.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Try again later.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const filteredHistory = leaveHistory
    .filter((record) =>
      record.type.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => b.appliedOn.getTime() - a.appliedOn.getTime());

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box maxW="900px" mx="auto" py={8} px={4} bg="gray.50" minH="100vh">
      <Heading textAlign="center" mb={8} color="teal.600">
        Employee Leave Dashboard
      </Heading>

      {/* Leave Summary Cards */}
      <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={4} mb={8}>
        <SummaryCard icon={FiCalendar} label="Annual Leave" value={12} max={20} colorScheme="green" />
        <SummaryCard icon={FiClock} label="Sick Leave" value={8} max={10} colorScheme="yellow" />
        <SummaryCard icon={FiCalendar} label="Casual Leave" value={5} max={10} colorScheme="blue" />
        <SummaryCard icon={FiCheckCircle} label="Used This Year" value={10} max={40} colorScheme="purple" />
      </SimpleGrid>

      {/* Leave Form */}
      <Box bg="white" p={6} rounded="md" shadow="md" mb={8}>
        <Heading size="md" mb={4} color="teal.700">Apply for Leave</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4}>
            <FormControl isInvalid={!!errors.leaveType} isRequired>
              <FormLabel>Leave Type</FormLabel>
              <Controller
                name="leaveType"
                control={control}
                render={({ field }) => (
                  <Select placeholder="Select leave type" {...field}>
                    <option value="Annual">Annual</option>
                    <option value="Sick">Sick</option>
                    <option value="Casual">Casual</option>
                  </Select>
                )}
              />
              <FormErrorMessage>{errors.leaveType?.message}</FormErrorMessage>
            </FormControl>

            <HStack spacing={4} w="100%">
              <FormControl isInvalid={!!errors.fromDate} isRequired>
                <FormLabel>From</FormLabel>
                <Controller
                  control={control}
                  name="fromDate"
                  render={({ field }) => (
                    <DatePicker
                      placeholderText="Start date"
                      selected={field.value}
                      onChange={field.onChange}
                      dateFormat="yyyy-MM-dd"
                      customInput={<Input />}
                      minDate={new Date()}
                    />
                  )}
                />
                <FormErrorMessage>{errors.fromDate?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.toDate} isRequired>
                <FormLabel>To</FormLabel>
                <Controller
                  control={control}
                  name="toDate"
                  render={({ field }) => (
                    <DatePicker
                      placeholderText="End date"
                      selected={field.value}
                      onChange={field.onChange}
                      dateFormat="yyyy-MM-dd"
                      customInput={<Input />}
                      minDate={control._formValues.fromDate || new Date()}
                    />
                  )}
                />
                <FormErrorMessage>{errors.toDate?.message}</FormErrorMessage>
              </FormControl>
            </HStack>

            <FormControl isInvalid={!!errors.reason} isRequired>
              <FormLabel>Reason</FormLabel>
              <Controller
                name="reason"
                control={control}
                render={({ field }) => (
                  <Input placeholder="Enter reason" {...field} />
                )}
              />
              <FormErrorMessage>{errors.reason?.message}</FormErrorMessage>
            </FormControl>

            <Button
              type="submit"
              colorScheme="teal"
              isLoading={isSubmitting}
              loadingText="Submitting"
              w="full"
            >
              Submit Request
            </Button>
          </VStack>
        </form>
      </Box>

      {/* Leave History */}
      <Box bg="white" p={6} rounded="md" shadow="md">
        <HStack justify="space-between" mb={4}>
          <Heading size="md" color="teal.700">Leave History</Heading>
          <Button size="sm" onClick={() => setShowHistory(!showHistory)}>
            {showHistory ? "Hide" : "Show"} History
          </Button>
        </HStack>
        <Collapse in={showHistory}>
          <InputGroup mb={4}>
            <Input
              placeholder="Search leave type"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <InputRightElement children={<FiSearch />} />
          </InputGroup>
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>Type</Th>
                <Th>From</Th>
                <Th>To</Th>
                <Th>Status</Th>
                <Th>Applied On</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredHistory.length > 0 ? (
                filteredHistory.map((record) => (
                  <Tr key={record.id}>
                    <Td>{record.type}</Td>
                    <Td>{record.from.toLocaleDateString()}</Td>
                    <Td>{record.to.toLocaleDateString()}</Td>
                    <Td>
                      <Badge colorScheme={
                        record.status === "Approved" ? "green" :
                        record.status === "Pending" ? "yellow" : "red"
                      }>
                        {record.status}
                      </Badge>
                    </Td>
                    <Td>{record.appliedOn.toLocaleDateString()}</Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={5} textAlign="center">No records found</Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Collapse>

        <Box textAlign="center" mt={8}>
          <NextLink href="/PrivacyPolicy" passHref>
            <Link color="teal.500">View Privacy Policy</Link>
          </NextLink>
        </Box>
      </Box>
    </Box>
  );
};

interface SummaryCardProps {
  icon: React.ElementType;
  label: string;
  value: number;
  max: number;
  colorScheme: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  icon: Icon,
  label,
  value,
  max,
  colorScheme,
}) => (
  <Box bg="white" rounded="lg" shadow="sm" p={4} textAlign="center">
    <Box mb={2} color={`${colorScheme}.500`} fontSize="2xl">
      <Icon />
    </Box>
    <Text fontWeight="bold">{label}</Text>
    <Progress value={(value / max) * 100} size="sm" colorScheme={colorScheme} mt={2} />
    <Text fontSize="sm" mt={1} color="gray.600">
      {value} / {max} days
    </Text>
  </Box>
);

export default Leaveemployee;
