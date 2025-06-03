import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Select,
  VStack,
  Text,
  Table,
  Tbody,
  Td,
  Tr,
  Divider,
  Badge,
  SimpleGrid,
  Image,
} from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';
import { useReactToPrint } from 'react-to-print';
import { useRouter } from 'next/router';
interface PayslipData {
  month: string;
  basic: number;
  hra: number;
  conveyance: number;
  medical: number;
  deductions: number;
}

const payslips: PayslipData[] = [
  { month: 'January 2025', basic: 50000, hra: 15000, conveyance: 3000, medical: 2000, deductions: 5000 },
  { month: 'February 2025', basic: 51000, hra: 15200, conveyance: 3000, medical: 2100, deductions: 5200 },
  { month: 'March 2025', basic: 52000, hra: 15300, conveyance: 3100, medical: 2200, deductions: 5300 },
  { month: 'April 2025', basic: 53000, hra: 15400, conveyance: 3100, medical: 2200, deductions: 5400 },
  { month: 'May 2025', basic: 54000, hra: 15500, conveyance: 3200, medical: 2300, deductions: 5500 },
  { month: 'June 2025', basic: 55000, hra: 15600, conveyance: 3200, medical: 2300, deductions: 5600 },
  { month: 'July 2025', basic: 56000, hra: 15700, conveyance: 3300, medical: 2400, deductions: 5700 },
  { month: 'August 2025', basic: 57000, hra: 15800, conveyance: 3300, medical: 2400, deductions: 5800 },
  { month: 'September 2025', basic: 58000, hra: 15900, conveyance: 3400, medical: 2500, deductions: 5900 },
  { month: 'October 2025', basic: 59000, hra: 16000, conveyance: 3400, medical: 2500, deductions: 6000 },
  { month: 'November 2025', basic: 60000, hra: 16100, conveyance: 3500, medical: 2600, deductions: 6100 },
  { month: 'December 2025', basic: 61000, hra: 16200, conveyance: 3500, medical: 2600, deductions: 6200 },
];

const PayslipCard = React.forwardRef<HTMLDivElement, { payslip: PayslipData }>(({ payslip }, ref) => {
  const totalEarnings = payslip.basic + payslip.hra + payslip.conveyance + payslip.medical;
  const netPay = totalEarnings - payslip.deductions;
  
  return (
    <Box
      ref={ref}
      bg="white"
      borderRadius="xl"
      p={6}
      boxShadow="2xl"
      mb={8}
      transition="all 0.3s"
      _hover={{ transform: 'scale(1.01)' }}
    >
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="lg" fontWeight="bold" color="blue.800">Payslip — {payslip.month}</Text>
        <Badge colorScheme="green" fontSize="md" px={4} py={1} borderRadius="md">
          ₹ {netPay.toLocaleString()} Net Pay
        </Badge>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
        <Box>
          <Text><b>Name:</b> Ram Kumar</Text>
          <Text><b>Employee ID:</b> EMP12345</Text>
        </Box>
        <Box>
          <Text><b>Role:</b> Frontend Developer</Text>
          <Text><b>Department:</b> Software</Text>
        </Box>
      </SimpleGrid>

      <Divider my={4} />

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <Box>
          <Text fontWeight="bold" color="gray.600" mb={2}>Earnings</Text>
          <Table size="sm">
            <Tbody>
              <Tr><Td>Basic</Td><Td isNumeric>₹{payslip.basic.toLocaleString()}</Td></Tr>
              <Tr><Td>HRA</Td><Td isNumeric>₹{payslip.hra.toLocaleString()}</Td></Tr>
              <Tr><Td>Conveyance</Td><Td isNumeric>₹{payslip.conveyance.toLocaleString()}</Td></Tr>
              <Tr><Td>Medical</Td><Td isNumeric>₹{payslip.medical.toLocaleString()}</Td></Tr>
              <Tr fontWeight="bold"><Td>Total</Td><Td isNumeric>₹{totalEarnings.toLocaleString()}</Td></Tr>
            </Tbody>
          </Table>
        </Box>

        <Box>
          <Text fontWeight="bold" color="gray.600" mb={2}>Deductions</Text>
          <Table size="sm">
            <Tbody>
              <Tr><Td>PF & Tax</Td><Td isNumeric>₹{payslip.deductions.toLocaleString()}</Td></Tr>
              <Tr fontWeight="bold" color="green.700"><Td>Net Pay</Td><Td isNumeric>₹{netPay.toLocaleString()}</Td></Tr>
            </Tbody>
          </Table>
        </Box>
      </SimpleGrid>
    </Box>
  );
});
PayslipCard.displayName = 'PayslipCard';

const Payslipemp: React.FC = () => {
  const [payslipList] = useState<PayslipData[]>(payslips);
  const [startMonth, setStartMonth] = useState(payslips[0].month);
  const [endMonth, setEndMonth] = useState(payslips[0].month);
  const printRef = useRef<HTMLDivElement>(null);
  
  const startIndex = payslipList.findIndex(p => p.month === startMonth);
  const endIndex = payslipList.findIndex(p => p.month === endMonth);
  const isRangeValid = startIndex !== -1 && endIndex !== -1 && startIndex <= endIndex;
  const selectedPayslips = isRangeValid ? payslipList.slice(startIndex, endIndex + 1) : [];
   
  const router = useRouter();
  const rawUsername = router.query.username;
  const username = Array.isArray(rawUsername) ? rawUsername[0] : rawUsername || 'User';

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Payslip_${startMonth.replace(' ', '_')}${startMonth !== endMonth ? `_to_${endMonth.replace(' ', '_')}` : ''}`,
  });

  return (
    <Box maxW="1000px" mx="auto" p={6}>
      <Flex justify="space-between" align="center" mb={10} wrap="wrap">
        <Box>
          <Heading size="lg" color="teal.600">Employee Payslip Portal</Heading>
          <Text fontSize="md" mt={2}>{username} ({username}12345)</Text>
        </Box>
      </Flex>

      <Box
        bg="white"
        p={6}
        borderRadius="lg"
        boxShadow="lg"
        mb={8}
        position="sticky"
        top="0"
        zIndex="docked"
      >
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <Box>
            <Text fontWeight="medium" mb={2}>Start Month</Text>
            <Select value={startMonth} onChange={(e) => setStartMonth(e.target.value)}>
              {payslipList.map(p => <option key={p.month}>{p.month}</option>)}
            </Select>
          </Box>

          <Box>
            <Text fontWeight="medium" mb={2}>End Month</Text>
            <Select value={endMonth} onChange={(e) => setEndMonth(e.target.value)}>
              {payslipList.map(p => <option key={p.month}>{p.month}</option>)}
            </Select>
          </Box>

          <Box display="flex" alignItems="flex-end">
            <Button
              colorScheme="teal"
              w="full"
              onClick={handlePrint}
              leftIcon={<DownloadIcon />}
              isDisabled={selectedPayslips.length === 0}
            >
              Download Payslip PDF
            </Button>
          </Box>
        </SimpleGrid>
      </Box>

  
      <Box
        ref={printRef}
        sx={{
          '@media print': {
            display: 'block',
            position: 'static',
            overflow: 'visible',
          },
          display: 'none',
        }}
      >
        {selectedPayslips.map(p => (
          <PayslipCard key={p.month} payslip={p} />
        ))}
      </Box>

      
      <VStack spacing={8} align="stretch">
        {selectedPayslips.map(p => (
          <PayslipCard key={p.month} payslip={p} />
        ))}
      </VStack>
    </Box>
  );
};

export default Payslipemp;
