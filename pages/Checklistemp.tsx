import React, { useState, useMemo } from 'react';
import {
  Box,
  SimpleGrid,
  Heading,
  Text,
  Badge,
  IconButton,
  Input,
  Progress,
  Button,
  useColorModeValue,
  VStack,
  HStack,
  Tooltip,
} from '@chakra-ui/react';
import { CheckIcon, EditIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';

interface ChecklistItem {
  id: number;
  label: string;
  completed: boolean;
  editing?: boolean;
}

const initialChecklist: ChecklistItem[] = [
  { id: 1, label: 'Submit Identification Documents', completed: false },
  { id: 2, label: 'Complete Tax Forms', completed: false },
  { id: 3, label: 'Attend Orientation Session', completed: false },
  { id: 4, label: 'Set Up Workstation', completed: false },
  { id: 5, label: 'Complete Mandatory Trainings', completed: false },
];

const Checklistemp: React.FC = () => {
  const [items, setItems] = useState(initialChecklist);
  const [newTask, setNewTask] = useState('');
  const bg = useColorModeValue('white', 'gray.700');
  const cardBg = useColorModeValue('gray.50', 'gray.600');

  const toggleComplete = (id: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const startEditing = (id: number) => {
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, editing: true } : item))
    );
  };

  const cancelEditing = (id: number) => {
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, editing: false } : item))
    );
  };

  const saveLabel = (id: number, newLabel: string) => {
    if (newLabel.trim() === '') return;
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, label: newLabel, editing: false } : item
      )
    );
  };

  const deleteTask = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const addTask = () => {
    if (newTask.trim() === '') return;
    const maxId = items.length ? Math.max(...items.map(i => i.id)) : 0;
    setItems(prev => [
      ...prev,
      { id: maxId + 1, label: newTask.trim(), completed: false },
    ]);
    setNewTask('');
  };

  const completedCount = useMemo(
    () => items.filter(item => item.completed).length,
    [items]
  );
  const completionPercent = (completedCount / items.length) * 100;

  const markAllComplete = () => {
    setItems(prev => prev.map(item => ({ ...item, completed: true })));
  };

  const resetAll = () => {
    setItems(prev => prev.map(item => ({ ...item, completed: false })));
  };

  return (
    <Box maxW="1000px" mx="auto" p={6} bg={bg} borderRadius="md" boxShadow="md">
      <Heading mb={6} size="lg" color="teal.600" textAlign="center">
        Employee Checklist
      </Heading>

      <Progress value={completionPercent} size="sm" colorScheme="green" mb={4} />

      <Text textAlign="center" fontWeight="bold" mb={6}>
        {completedCount} of {items.length} completed
      </Text>

      <HStack mb={6}>
        <Input
          placeholder="Add new task..."
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') addTask();
          }}
        />
        <Button
          colorScheme="cyan" // Add Task button color scheme changed to cyan
          onClick={addTask}
          disabled={!newTask.trim()}
          leftIcon={<AddIcon />}
        >
          Add Task
        </Button>
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {items.map(({ id, label, completed, editing }) => (
          <Box
            key={id}
            p={4}
            bg={cardBg}
            borderRadius="md"
            boxShadow="sm"
            position="relative"
          >
            {editing ? (
              <Input
                size="sm"
                autoFocus
                defaultValue={label}
                onBlur={e => saveLabel(id, e.target.value.trim() || label)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.currentTarget.blur();
                  }
                  if (e.key === 'Escape') {
                    cancelEditing(id);
                  }
                }}
              />
            ) : (
              <Text
                fontSize="md"
                mb={2}
                cursor="pointer"
                onDoubleClick={() => startEditing(id)}
                textDecoration={completed ? 'line-through' : 'none'}
                color={completed ? 'gray.500' : 'inherit'}
              >
                {label}
              </Text>
            )}

            <Badge
              colorScheme={completed ? 'green' : 'red'}
              variant="subtle"
              mb={2}
            >
              {completed ? 'Completed' : 'Pending'}
            </Badge>

            <Box
              display={'flex'}
              flexWrap={'wrap'}
              justifyContent={'space-between'}
              gap={2}
            >
              <Button
                size="sm"
                colorScheme={completed ? 'red' : 'blue'} // changed green to blue here
                onClick={() => toggleComplete(id)}
              >
                {completed ? 'Mark Incomplete' : 'Mark Complete'}
              </Button>

              {!editing && (
                <>
                  <IconButton
                    aria-label="Edit item"
                    size="sm"
                    icon={<EditIcon />}
                    onClick={() => startEditing(id)}
                  />
                  <Tooltip label="Delete Task" aria-label="Delete task tooltip">
                    <IconButton
                      aria-label="Delete item"
                      size="sm"
                      icon={<CloseIcon />}
                      colorScheme="red"
                      onClick={() => deleteTask(id)}
                    />
                  </Tooltip>
                </>
              )}
            </Box>
          </Box>
        ))}
      </SimpleGrid>

      <VStack mt={6} spacing={4}>
        <Button colorScheme="blue" onClick={markAllComplete} width="full">
          Mark All Completed
        </Button>
        <Button variant="outline" colorScheme="red" onClick={resetAll} width="full">
          Reset All
        </Button>
      </VStack>
    </Box>
  );
};

export default Checklistemp;
