import React from "react";
import { Box, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText, Text, Button, HStack, Table,  Thead,  Tbody,  Tr,  Th,  Td,  Badge,  VStack, useColorModeValue,Icon,} from "@chakra-ui/react";
import { FiCheckCircle, FiUsers, FiMessageCircle, FiBriefcase } from "react-icons/fi";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,} from "recharts";

const stats = [
  { id: 1, label: "Completed Tasks", value: 153, change: "+8%", icon: FiCheckCircle, color: "green.500" },
  { id: 2, label: "Active Projects", value: 12, change: "+2%", icon: FiBriefcase, color: "blue.500" },
  { id: 3, label: "Team Members", value: 27, change: "+0%", icon: FiUsers, color: "purple.500" },
  { id: 4, label: "Unread Messages", value: 5, change: "-1%", icon: FiMessageCircle, color: "orange.400" },
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


const statusColorMap = {
  Completed: "green",
  "In Progress": "blue",
  Blocked: "red",
  Pending: "gray",
};

export default function DashboardContent() {
  const bgCard = useColorModeValue("white", "gray.700");
  const bgSection = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");

  return (
    <VStack spacing={8} align="stretch" p={6} bg={bgSection} borderRadius="md" boxShadow="sm">
    
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6}>
        {stats.map(({ id, label, value, change, icon, color }) => (
          <Box
            key={id}
            p={6}
            bg={bgCard}
            borderRadius="md"
            boxShadow="md"
            transition="all 0.2s"
            _hover={{ boxShadow: "xl", transform: "scale(1.03)" }}
          >
            <HStack spacing={4} mb={3}>
              <Icon as={icon} boxSize={8} color={color} />
              <Stat>
                <StatLabel fontWeight="medium" fontSize="md" color={textColor}>
                  {label}
                </StatLabel>
                <StatNumber fontSize="2xl" fontWeight="bold" color={textColor}>
                  {value}
                </StatNumber>
                <StatHelpText
                  color={change.startsWith("+") ? "green.400" : "red.400"}
                  fontWeight="semibold"
                  fontSize="sm"
                >
                  {change} vs last week
                </StatHelpText>
              </Stat>
            </HStack>
          </Box>
        ))}
      </SimpleGrid>

      <Box
        p={6}
        bg={bgCard}
        borderRadius="md"
        boxShadow="md"
        height={{ base: "320px", md: "350px" }}
      >
        <Text fontSize="xl" fontWeight="semibold" mb={6} color={textColor}>
          Tasks Completed (Last 7 Days)
        </Text>
        <ResponsiveContainer width="100%" height="85%">
          <LineChart data={taskData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={useColorModeValue("#e2e8f0", "#2d3748")} />
            <XAxis
              dataKey="day"
              tick={{ fill: textColor, fontWeight: "600" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: textColor, fontWeight: "600" }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{ backgroundColor: bgCard, borderRadius: 8, border: "none" }}
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

      <Box p={6} bg={bgCard} borderRadius="md" boxShadow="md" overflowX="auto">
        <Text fontSize="xl" fontWeight="semibold" mb={4} color={textColor}>
          Recent Tasks
        </Text>
        <Table variant="simple" size="md" color={textColor}>
          <Thead bg={useColorModeValue("gray.100", "gray.900")}>
            <Tr>
              <Th>Task ID</Th>
              <Th>Task Name</Th>
              <Th>Assigned To</Th>
              <Th>Due Date</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {recentTasks.map(({ id, name, assignedTo, dueDate, status }) => (
              <Tr
                key={id}
                _hover={{ bg: useColorModeValue("blue.50", "gray.700"), cursor: "pointer" }}
              >
                <Td fontWeight="semibold">{id}</Td>
                <Td>{name}</Td>
                <Td>{assignedTo}</Td>
                <Td>{dueDate}</Td>
                <Td>
                
                  <Badge colorScheme={statusColorMap [status as keyof typeof statusColorMap] || "gray"} fontWeight="bold" px={3} py={1}>
                    {status}
                  </Badge>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

    
      <HStack spacing={4} justify="flex-end">
        <Button colorScheme="blue" variant="solid" size="md">
          Create New Task
        </Button>
        <Button colorScheme="gray" variant="outline" size="md">
          View Reports
        </Button>
      </HStack>
    </VStack>
  );
}
