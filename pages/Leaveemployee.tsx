import React, { useState, useMemo } from "react";
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
  InputGroup,
  InputRightElement,
  Input,
  FormErrorMessage,
  Collapse,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Checkbox,
  CheckboxGroup,
  Stack,
} from "@chakra-ui/react";
import { FiCalendar, FiCheckCircle, FiClock, FiSearch } from "react-icons/fi";
import DatePicker from "react-datepicker";
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
  sendTo: string[]; 
}

interface FormData {
  leaveType: string;
  fromDate: Date | null;
  toDate: Date | null;
  reason: string;
  sendTo: string[]; 
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
  sendTo: yup.array().of(yup.string()).min(1,"please select atleast one recipient").required("please select at least one recipient"), 
});

const PAGE_SIZE = 5;

const Leaveemployee: React.FC = () => {
  const [leaveHistory, setLeaveHistory] = useState<LeaveRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showHistory, setShowHistory] = useState(true);
  const toast = useToast();

  const [sortBy, setSortBy] = useState<keyof LeaveRecord | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formDataToSubmit, setFormDataToSubmit] = useState<FormData | null>(null);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormData>({
    defaultValues: {
      leaveType: "",
      fromDate: null,
      toDate: null,
      reason: "",
      sendTo: [],
    },
    resolver: yupResolver(schema) as any,
  });

  const watchFromDate = watch("fromDate");
  const watchToDate = watch("toDate");

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setFormDataToSubmit(data);
    setIsModalOpen(true);
  };

  const handleRealSubmit = async (data: FormData) => {
    try {
      
      await new Promise((res) => setTimeout(res, 700));

      
      const newLeave: LeaveRecord = {
        id: Date.now(),
        type: data.leaveType,
        from: data.fromDate!,
        to: data.toDate!,
        status: "Pending",
        appliedOn: new Date(),
        sendTo: data.sendTo || [],
      };

      setLeaveHistory((prev) => [newLeave, ...prev]);
      reset();
      setCurrentPage(1);

      console.log("Leave submitted:", newLeave);

      toast({
        title: "Leave request submitted!",
        description: `Sent to: ${
          newLeave.sendTo.length > 0 ? newLeave.sendTo.join(", ") : "No one"
        }`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch {
      toast({
        title: "Submission failed",
        description: "Please try again later.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const filteredHistory = useMemo(
    () =>
      leaveHistory.filter((record) =>
        record.type.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [leaveHistory, searchTerm]
  );

  const sortedHistory = useMemo(() => {
    if (!sortBy) return filteredHistory;

    const sorted = [...filteredHistory].sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];

      if (aVal instanceof Date && bVal instanceof Date) {
        return sortOrder === "asc"
          ? aVal.getTime() - bVal.getTime()
          : bVal.getTime() - aVal.getTime();
      }
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortOrder === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return 0;
    });

    return sorted;
  }, [filteredHistory, sortBy, sortOrder]);

  const totalPages = Math.ceil(sortedHistory.length / PAGE_SIZE);
  const paginatedHistory = sortedHistory.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const toggleSort = (column: keyof LeaveRecord) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  const renderSortIcon = (column: keyof LeaveRecord) => {
    if (sortBy !== column) return null;
    return sortOrder === "asc" ? " 🔼" : " 🔽";
  };

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box maxW="900px" mx="auto" py={8} px={4} bg="gray.50" minH="100vh">
      <Heading textAlign="center" mb={8} color="teal.600">
        Employee Leave Dashboard
      </Heading>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={4} mb={8}>
        <SummaryCard
          icon={FiCalendar}
          label="Annual Leave"
          value={12}
          max={20}
          colorScheme="green"
        />
        <SummaryCard
          icon={FiClock}
          label="Sick Leave"
          value={8}
          max={10}
          colorScheme="yellow"
        />
        <SummaryCard
          icon={FiCalendar}
          label="Casual Leave"
          value={5}
          max={10}
          colorScheme="blue"
        />
        <SummaryCard
          icon={FiCheckCircle}
          label="Used This Year"
          value={10}
          max={40}
          colorScheme="purple"
        />
      </SimpleGrid>

      <Box bg="white" p={6} rounded="md" shadow="md" mb={8}>
        <Heading size="md" mb={4} color="teal.700">
          Apply for Leave
        </Heading>
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
                    <InputGroup>
                      <DatePicker
                        placeholderText="Start date"
                        selected={field.value}
                        onChange={field.onChange}
                        dateFormat="yyyy-MM-dd"
                        minDate={new Date()}
                        selectsStart
                        startDate={watchFromDate}
                        endDate={watchToDate}
                        customInput={<Input />}
                      />
                    
                    </InputGroup>
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
                    <InputGroup>
                      <DatePicker
                        placeholderText="End date"
                        selected={field.value}
                        onChange={field.onChange}
                        dateFormat="yyyy-MM-dd"
                        minDate={watchFromDate || new Date()}
                        selectsEnd
                        startDate={watchFromDate}
                        endDate={watchToDate}
                        customInput={<Input />}
                      />
                    </InputGroup>
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

            <FormControl pt={2} alignItems="flex-start">
              <FormLabel>Send Request To (Optional)</FormLabel>
              <Controller
                control={control}
                name="sendTo"
                render={({ field }) => (
                  <CheckboxGroup {...field}
                    colorScheme="teal"
                    value={field.value || []}
                    onChange={field.onChange}
                  >
                    <Stack spacing={2} direction="row">
                      <Checkbox value="HR">HR</Checkbox>
                      <Checkbox value="Manager">Manager</Checkbox>
                      <Checkbox value="Team Lead">Team Lead</Checkbox>
                    </Stack>
                  </CheckboxGroup>
                )}
              />
              <FormErrorMessage>{errors.sendTo?.message}</FormErrorMessage>
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

      <Box bg="white" p={6} rounded="md" shadow="md">
        <HStack justify="space-between" mb={4}>
          <Heading size="md" color="teal.700">
            Leave History
          </Heading>
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
                <Th cursor="pointer" onClick={() => toggleSort("type")}>
                  Type{renderSortIcon("type")}
                </Th>
                <Th cursor="pointer" onClick={() => toggleSort("from")}>
                  From{renderSortIcon("from")}
                </Th>
                <Th cursor="pointer" onClick={() => toggleSort("to")}>
                  To{renderSortIcon("to")}
                </Th>
                <Th>Status</Th>
                <Th cursor="pointer" onClick={() => toggleSort("appliedOn")}>
                  Applied On{renderSortIcon("appliedOn")}
                </Th>
                <Th>Send To</Th>
              </Tr>
            </Thead>
            <Tbody>
              {paginatedHistory.length === 0 && (
                <Tr>
                  <Td colSpan={6} textAlign="center" py={4}>
                    No leave records found.
                  </Td>
                </Tr>
              )}
              {paginatedHistory.map((leave) => (
                <Tr key={leave.id}>
                  <Td>{leave.type}</Td>
                  <Td>{leave.from.toLocaleDateString()}</Td>
                  <Td>{leave.to.toLocaleDateString()}</Td>
                  <Td>
                    <Badge
                      colorScheme={
                        leave.status === "Approved"
                          ? "green"
                          : leave.status === "Pending"
                          ? "yellow"
                          : "red"
                      }
                    >
                      {leave.status}
                    </Badge>
                  </Td>
                  <Td>{leave.appliedOn.toLocaleDateString()}</Td>
                  <Td>{leave.sendTo && leave.sendTo.length > 0 ? leave.sendTo.join(", ") : "—"}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <HStack justify="center" mt={4} spacing={4}>
            <Button
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            >
              Previous
            </Button>
            <Text>
              Page {currentPage} of {totalPages || 1}
            </Text>
            <Button
              size="sm"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            >
              Next
            </Button>
          </HStack>
        </Collapse>
      </Box>


      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Leave Submission</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Leave Type: <strong>{formDataToSubmit?.leaveType}</strong>
            </Text>
            <Text>
              From: <strong>{formDataToSubmit?.fromDate?.toLocaleDateString()}</strong>
            </Text>
            <Text>
              To: <strong>{formDataToSubmit?.toDate?.toLocaleDateString()}</strong>
            </Text>
            <Text>
              Reason: <strong>{formDataToSubmit?.reason}</strong>
            </Text>
            <Text mt={3}>
              {formDataToSubmit?.sendTo.length
                ? `This request will be sent to: ${formDataToSubmit?.sendTo.join(", ")}`
                : "This request will not be sent to anyone."}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="teal"
              mr={3}
              onClick={() => {
                if (formDataToSubmit) {
                  handleRealSubmit(formDataToSubmit);
                  setIsModalOpen(false);
                  setFormDataToSubmit(null);
                }
              }}
            >
              Confirm
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setIsModalOpen(false);
                setFormDataToSubmit(null);
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
}) => {
  const percent = Math.min((value / max) * 100, 100);

  return (
    <Box
      bg="white"
      p={4}
      rounded="md"
      shadow="md"
      textAlign="center"
      color={`${colorScheme}.700`}
    >
      <Icon size={30} />
      <Text fontWeight="bold" fontSize="lg" mt={2}>
        {label}
      </Text>
      <Progress
        value={percent}
        size="sm"
        colorScheme={colorScheme}
        borderRadius="md"
        mt={2}
      />
      <Text mt={1} fontSize="sm" color={`${colorScheme}.600`}>
        {value} / {max}
      </Text>
    </Box>
  );
};

export default Leaveemployee;
