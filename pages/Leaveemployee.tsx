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
  useColorModeValue,
} from "@chakra-ui/react";
import { FiCalendar, FiCheckCircle, FiClock, FiSearch } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { DarkModeSwitch } from "../components/DarkModeSwitch"; // adjust path if needed

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
  sendTo: yup
    .array()
    .of(yup.string())
    .min(1, "Please select at least one recipient")
    .required("Please select at least one recipient"),
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
    resolver: yupResolver(schema),
  });

  const watchFromDate = watch("fromDate");
  const watchToDate = watch("toDate");

  const boxBg = useColorModeValue("white", "gray.800");
  const pageBg = useColorModeValue("gray.50", "gray.900");
  const headingColor = useColorModeValue("teal.600", "teal.300");

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

      toast({
        title: "Leave request submitted!",
        description: `Sent to: ${newLeave.sendTo.length > 0 ? newLeave.sendTo.join(", ") : "No one"}`,
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
    () => leaveHistory.filter((record) =>
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
    <Box maxW="1000px" mx="auto" py={8} px={4} bg={pageBg} borderRadius="10px" minH="100vh">
      <HStack justify="space-between" mb={8}>
        <Heading textAlign="left" color={headingColor}>
          Employee Leave Dashboard
        </Heading>
      </HStack>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={4} mb={8}>
        <SummaryCard icon={FiCalendar} label="Annual Leave" value={12} max={20} gradient="linear(to-r, teal.400, green.400)" />
        <SummaryCard icon={FiClock} label="Sick Leave" value={8} max={10} gradient="linear(to-r, yellow.400, orange.300)" />
        <SummaryCard icon={FiCalendar} label="Casual Leave" value={5} max={10} gradient="linear(to-r, blue.400, cyan.400)" />
        <SummaryCard icon={FiCheckCircle} label="Used This Year" value={10} max={40} gradient="linear(to-r, purple.500, pink.400)" />
      </SimpleGrid>

      <Box bg={boxBg} p={6} rounded="md" shadow="md" mb={8}>
        <Heading size="md" mb={4} color="teal.600">

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


            <FormControl pt={2} alignItems="flex-start" isInvalid={!!errors.sendTo}>

              <FormLabel>Send Request To (Optional)</FormLabel>
              <Controller
                control={control}
                name="sendTo"
                render={({ field }) => (

                  <CheckboxGroup
                    {...field}

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
              colorScheme="blue"
              isLoading={isSubmitting}
              loadingText="Submitting"
              w="full"

            >
              Submit Request
            </Button>
          </VStack>
        </form>

      </Box>

      <Box bg={boxBg} p={6} rounded="md" shadow="md">
        <HStack justify="space-between" mb={4}>

          <Heading size="md" color="teal.600">

            Leave History
          </Heading>
          <Button colorScheme="blue" size="sm" onClick={() => setShowHistory(!showHistory)}>
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

                <Th cursor="pointer" onClick={() => toggleSort("status")}>
                  Status{renderSortIcon("status")}
                </Th>
                <Th cursor="pointer" onClick={() => toggleSort("appliedOn")}>
                  Applied On{renderSortIcon("appliedOn")}
                </Th>
                <Th>Sent To</Th>

              </Tr>
            </Thead>
            <Tbody>
              {paginatedHistory.length === 0 && (
                <Tr>

                  <Td colSpan={6} textAlign="center" py={6}>
                    No records found.
                  </Td>
                </Tr>
              )}
              {paginatedHistory.map((record) => (
                <Tr key={record.id}>
                  <Td>{record.type}</Td>
                  <Td>{record.from.toLocaleDateString()}</Td>
                  <Td>{record.to.toLocaleDateString()}</Td>
                  <Td>
                    <Badge
                      colorScheme={
                        record.status === "Approved"
                          ? "green"
                          : record.status === "Pending"
                            ? "yellow"
                            : "red"
                      }
                    >
                      {record.status}
                    </Badge>
                  </Td>
                  <Td>{record.appliedOn.toLocaleDateString()}</Td>
                  <Td>{record.sendTo.join(", ") || "N/A"}</Td>

                </Tr>
              ))}
            </Tbody>
          </Table>


          <HStack justify="center" mt={4} spacing={2}>
            <Button
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              isDisabled={currentPage === 1}
            >
              Prev
            </Button>
            <Text>
              Page {currentPage} of {totalPages}
            </Text>
            <Button
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              isDisabled={currentPage === totalPages || totalPages === 0}

            >
              Next
            </Button>
          </HStack>
        </Collapse>

      </Box>

      {/* Confirmation Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Leave Request</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={2}>Please confirm your leave request details:</Text>
            {formDataToSubmit && (
              <VStack align="start" spacing={1}>
                <Text>
                  <b>Leave Type:</b> {formDataToSubmit.leaveType}
                </Text>
                <Text>
                  <b>From:</b>{" "}
                  {formDataToSubmit.fromDate?.toLocaleDateString() ?? ""}
                </Text>
                <Text>
                  <b>To:</b> {formDataToSubmit.toDate?.toLocaleDateString() ?? ""}
                </Text>
                <Text>
                  <b>Reason:</b> {formDataToSubmit.reason}
                </Text>
                <Text>
                  <b>Send To:</b>{" "}
                  {formDataToSubmit.sendTo.length > 0
                    ? formDataToSubmit.sendTo.join(", ")
                    : "No one"}
                </Text>
              </VStack>
            )}

          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="teal"
              mr={3}
              onClick={() => {
                if (formDataToSubmit) {
                  handleRealSubmit(formDataToSubmit);
                  setIsModalOpen(false);


                }
              }}
            >
              Confirm
            </Button>

            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>

              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};



interface SummaryCardProps {
  icon: React.ComponentType;
  label: string;
  value: number;
  max: number;
  gradient: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  icon: Icon,
  label,
  value,
  max,
  gradient,
}) => {
  const percentage = (value / max) * 100;

  return (
    <Box
      bgGradient={gradient}
      color="white"
      p={5}
      rounded="md"
      boxShadow="md"
      cursor="default"
    >
      <HStack spacing={3} mb={3}>
        <Box as={Icon} boxSize={6} />
        <Text fontWeight="bold" fontSize="lg">
          {label}
        </Text>
      </HStack>
      <Text fontSize="2xl" fontWeight="bold">
        {value} / {max}
      </Text>
      <Progress
        mt={3}
        value={percentage}
        size="sm"
        colorScheme="whiteAlpha"
        bg="whiteAlpha.300"
        sx={{
          "> div": {
            bgColor: "whiteAlpha.800",
            filter: "brightness(1.2)",
          },
        }}
      />
    </Box>
  );
};

export default Leaveemployee;
