import { Box, Heading, Input, InputGroup, InputLeftElement, Table, Thead, Tbody, Tr, Th, Td, Avatar, Badge, Button, HStack, VStack, IconButton, useColorModeValue, } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { FaEye, FaEdit } from "react-icons/fa";
import { useState } from "react";
interface UsersempProps {

  search: string;

}
type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
  avatarUrl?: string;
};

const usersData: User[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Frontend Developer",
    status: "Active",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    role: "Backend Developer",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "QA Engineer",
    status: "Active",
  },
];

const statusColorMap = {
  Active: "green",
  Inactive: "red",
};


export default function UsersPage({ searchQuery }: { searchQuery: string }) {
  const bg = useColorModeValue("white", "gray.700");
  const [search, setSearch] = useState('');

  const filteredUsers = usersData.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <VStack align="start" spacing={6} maxW="1000px" mx="auto" p={6}>
      <Heading size="lg" color="teal.600">Users</Heading>

      <InputGroup maxW="400px">
        <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.400" />} />
        <Input
          placeholder="Search users by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>

      <Box
        w="100%"
        bg={bg}
        p={6}
        rounded="md"
        shadow="md"
        overflowX="auto"
      >
        <Table variant="simple" size="sm">
          <Thead bg={useColorModeValue("gray.100", "gray.600")}>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Status</Th>
              <Th textAlign="right">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>

            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <Tr key={user.id}>
                  <Td>
                    <HStack>
                      <Avatar name={user.name} size="sm" />
                      <Box>
                        <Box fontWeight="medium">{user.name}</Box>
                      </Box>
                    </HStack>
                  </Td>
                  <Td>{user.email}</Td>
                  <Td>{user.role}</Td>
                  <Td>
                    <Badge colorScheme={statusColorMap[user.status]}>
                      {user.status}
                    </Badge>
                  </Td>
                  <Td textAlign="right">
                    <HStack spacing={2} justify="end">
                      <IconButton
                        size="sm"
                        icon={<FaEye />}
                        aria-label="View User"
                        variant="ghost"
                        colorScheme="blue"
                      />
                      <IconButton
                        size="sm"
                        icon={<FaEdit />}
                        aria-label="Edit User"
                        variant="ghost"
                        colorScheme="green"
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={5}>
                  <Box textAlign="center" py={4}>No matching users found.</Box>
                </Td>
              </Tr>
            )
            }

          </Tbody>
        </Table>
      </Box>
    </VStack>
  );
}
