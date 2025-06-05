import React from "react";
import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Text,
  Button,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  VStack,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import {
  FiCheckCircle,
  FiUsers,
  FiMessageCircle,
  FiBriefcase,
} from "react-icons/fi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";


interface DashboardempProps {
  searchQuery: string;
}


const stats = [
  {
    id: 1,
    label: "Completed Tasks",
    value: 153,
    change: "+8%",
    icon: FiCheckCircle,

    color: "white",
    bg: "linear(to-r, green.400, green.600)",

  },
  {
    id: 2,
    label: "Active Projects",
    value: 12,
    change: "+2%",
    icon: FiBriefcase,

    color: "white",
    bg: "linear(to-r, blue.400, blue.600)",

  },
  {
    id: 3,
    label: "Team Members",
    value: 27,
    change: "+0%",
    icon: FiUsers,

    color: "white",
    bg: "linear(to-r, purple.400, purple.600)",

  },
  {
    id: 4,
    label: "Unread Messages",
    value: 5,
    change: "-1%",
    icon: FiMessageCircle,

    color: "white",
    bg: "linear(to-r, orange.400, orange.600)",

  },
];

const taskData = [
  { day: "Mon", tasks: 22 },
  { day: "Tue", tasks: 18 },
  { day: "Wed", tasks: 25 },
  { day: "Thu", tasks: 30 },
  { day: "Fri", tasks: 20 },
  { day: "Sat", tasks: 15 },
  { day: "Sun", tasks: 12 },
];

const recentTasks = [
  { id: "TSK-001", name: "Code review", assignedTo: "Alice", dueDate: "2025-05-28", status: "Completed" },
  { id: "TSK-002", name: "Design mockups", assignedTo: "Bob", dueDate: "2025-05-29", status: "In Progress" },
  { id: "TSK-003", name: "Write tests", assignedTo: "Charlie", dueDate: "2025-05-30", status: "Blocked" },
  { id: "TSK-004", name: "Deploy updates", assignedTo: "Dana", dueDate: "2025-06-01", status: "Pending" },
];

const statusColorMap: Record<string, string> = {
  Completed: "green",
  "In Progress": "blue",
  Blocked: "red",
  Pending: "gray",
};

const Dashboardemp: React.FC<DashboardempProps> = ({ searchQuery }) => {
  const bgPage = useColorModeValue("gray.50", "gray.800");
  const bgCard = useColorModeValue("white", "gray.700");
  const bgTableHeader = useColorModeValue("gray.100", "gray.900");
  const textColor = useColorModeValue("gray.800", "gray.100");

  const filteredTasks = recentTasks.filter((task) => {
    const q = searchQuery.toLowerCase();
    return (
      task.name.toLowerCase().includes(q) ||
      task.assignedTo.toLowerCase().includes(q) ||
      task.status.toLowerCase().includes(q) ||
      task.id.toLowerCase().includes(q)
    );
  });

  return (
    <VStack maxW="1000px" spacing={8} align="stretch" p={6} bg={bgPage} minH="100vh">
      {/* Stat Cards */}
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6}>


        {stats.map(({ id, label, value, change, icon, color, bg }) => (
          <Box
            key={id}
            p={6}
            bgGradient={bg}
            color={color}
            borderRadius="lg"
            boxShadow="lg"
            transition="all 0.3s"
            _hover={{ transform: "translateY(-6px)", boxShadow: "xl" }}
          >

            <HStack spacing={4} mb={3}>
              <Icon as={icon} boxSize={8} />
              <Stat>


                <StatLabel fontWeight="medium">{label}</StatLabel>
                <StatNumber fontSize="2xl" fontWeight="bold">{value}</StatNumber>
                <StatHelpText color="whiteAlpha.800">

                  {change} vs last week
                </StatHelpText>
              </Stat>
            </HStack>
          </Box>
        ))}
      </SimpleGrid>


      {/* Line Chart */}
      <Box p={6} bg={bgCard} borderRadius="lg" boxShadow="lg" height={{ base: "300px", md: "350px" }}>
        <Text fontSize="xl" fontWeight="semibold" mb={6} color="teal.600">
          Tasks Completed (Last 7 Days)
        </Text>

        <ResponsiveContainer width="100%" height="85%">
          <LineChart data={taskData}>
            <CartesianGrid strokeDasharray="3 3" stroke={useColorModeValue("#e2e8f0", "#2d3748")} />
            <XAxis dataKey="day" tick={{ fill: textColor }} />
            <YAxis tick={{ fill: textColor }} allowDecimals={false} />
            <Tooltip
              contentStyle={{ backgroundColor: bgCard, borderRadius: 8 }}
              labelStyle={{ fontWeight: "bold" }}
            />
            <Line
              type="monotone"
              dataKey="tasks"
              stroke="#3182CE"
              strokeWidth={3}
              dot={{ r: 5, stroke: "#3182CE", strokeWidth: 2, fill: "white" }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>


      {/* Task Table */}
      <Box p={6} bg={bgCard} borderRadius="lg" boxShadow="lg" overflowX="auto">
        <Text fontSize="xl" fontWeight="semibold" color="teal.600" mb={4} >
          Recent Tasks
        </Text>
        <Table variant="simple" size="md">
          <Thead bg={bgTableHeader}>

            <Tr>
              <Th>Task ID</Th>
              <Th>Task Name</Th>
              <Th>Assigned To</Th>
              <Th>Due Date</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredTasks.length > 0 ? (
              filteredTasks.map(({ id, name, assignedTo, dueDate, status }) => (
                <Tr key={id}>
                  <Td fontWeight="semibold">{id}</Td>
                  <Td>{name}</Td>
                  <Td>{assignedTo}</Td>
                  <Td>{dueDate}</Td>
                  <Td>
                    <Badge colorScheme={statusColorMap[status] || "gray"} px={3} py={1} fontWeight="medium">
                      {status}
                    </Badge>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={5}>
                  <Text py={4} textAlign="center" color="gray.500">
                    No tasks found matching "{searchQuery}"
                  </Text>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>


      {/* Action Buttons */}
      <HStack spacing={4} justify="flex-end">
        <Button colorScheme="blue" size="lg">Create New Task</Button>
        <Button colorScheme="gray" variant="outline" size="lg">View Reports</Button>

      </HStack>
    </VStack>
  );
};

export default Dashboardemp;
