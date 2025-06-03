import React, { useState } from 'react';
import { Box, Text, Input, Button, useBreakpointValue, AccordionItem, Accordion ,AccordionButton,AccordionPanel,AccordionIcon} from '@chakra-ui/react';
import { FaMoneyBill, FaUsers,FaGraduationCap, FaCircle,FaCheck, FaChartLine,FaCog,FaHeadphones ,FaUserPlus, FaClock, FaCalendarCheck, FaCogs, FaTrophy, FaComments, FaBullseye, FaCreditCard, FaLaptop, FaFlask, FaUniversity, FaShoppingBag, FaChartBar } from 'react-icons/fa';
import { useRouter } from "next/router";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram } from 'react-icons/fa';
import Image from 'next/image';
import {useDisclosure, IconButton, Drawer,DrawerOverlay, DrawerContent,DrawerCloseButton,DrawerHeader,DrawerBody,} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import path from 'path';
interface NavItem {
  title: string;
  options: string[];
}

interface FeatureCard {
  icon: string;
  title: string;
  description: string;
  link: string;
}

interface FooterSectionProps {
  title: string;
  items: string[];
}

const App = ({ navigation }: { navigation: any }) => {
  const [activeNavDropdown, setActiveNavDropdown] = useState<number | null>(null);
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('')
  const [value, setValue] = useState('');
   const router = useRouter();
   const HEADER_HEIGHT = 64;
   const{isOpen, onOpen, onClose} = useDisclosure();
   const isMobile = useBreakpointValue({base: true, md: false})
   const [selectedFeature, setSelectedFeature] = useState(0);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  type IconKey =
  | 'money'
  | 'users'
  | 'line-chart'
  | 'user-plus'
  | 'clock-o'
  | 'calendar-check-o'
  | 'cogs'
  | 'trophy'
  | 'comments'
  | 'bullseye'
  | 'credit-card'
  | 'laptop'
  | 'flask'
  | 'university'
  | 'shopping-bag'
  | 'bar-chart'
  | 'cog'
  | 'check'
  | 'headphones'
  | 'circle'
  | 'graduationCap';


  const iconMap:Record<IconKey, JSX.Element> = {
    money: <FaMoneyBill />,
    users: <FaUsers />,
    'line-chart': <FaChartLine />,
    'user-plus': <FaUserPlus />,
    'clock-o': <FaClock />,
    'calendar-check-o': <FaCalendarCheck />,
    cogs: <FaCogs />,
    trophy: <FaTrophy />,
    comments: <FaComments />,
    bullseye: <FaBullseye />,
    'credit-card': <FaCreditCard />,
    laptop: <FaLaptop />,
    flask: <FaFlask />,
    university: <FaUniversity />,
    'shopping-bag': <FaShoppingBag />,
    'bar-chart': <FaChartBar />,
  'cog': <FaCog />,
  'check':<FaCheck/>,
  'headphones': <FaHeadphones />,
  'circle':<FaCircle/>,
  'graduationCap':<FaGraduationCap/>
  };

  const navItems: NavItem[] = [
    { title: 'Products', options: ['Payroll Software', 'Performance & Careers', 'Modern HR', 'Time & Attendance', 'Hiring & Onboarding', 'Timesheets & Projects(PSA)', 'Learning Management'] },
    { title: 'Customers', options: ['Customer Experience', 'Customer Stories', 'Onboarding Support', 'Wall of Love', 'Support'] },
    { title: 'Pricing', options: ['Basic', 'Pro'] },
    { title: 'About', options: ['Our Story', 'Our Team', 'Contact Us'] },
    { title: 'Resources', options: ['Blog', 'Glossary', 'HR Toolkit', 'Whitepaper', 'Free Tools', 'Use Cases', 'HR Katalyst report', 'Comics', 'HR Story Book', 'HR Perspective', 'News', 'Events'] },
    { title: 'Careers', options: [] },
  ];
const features = [
  {title: "People data & Analytics",description: "Connect all your people together in one place and gain powerful insights",image: "/images/modrenHR.jpg",},
  { title: "Payroll & Expense tracking",description: "Automate and Pay employees in 6 steps like clockwork. Stay 100% Compliant.",image: "/images/payroll.jpg", },
  {title: "Performance and Culture",description: "Employ SMART Goals and OKRS to measure & maximize talent performance.",image: "/images/performance and culture.jpg",},
  {title: "Hiring and Onboarding",description: "Source, hire and onboard top talent. Personalized dashboards for insights.",image: "/images/hiring and onboarding.jpg",},
  {title: "Timesheets & Projects (PSA)",description: "Manage time, resource and project profitability efficiently.",image: "/images/timesheet.jpg", },
];

  const featureCards: FeatureCard[] = [
    { icon: 'money', title: 'Payroll & Expenses', description: 'Our industry redefining payroll system automates your payroll and saves time for everyone.', link: 'Learn more' },
    { icon: 'users', title: 'Modern HR', description: 'All your people information in one place to create a connected digital workplace.', link: 'Learn more' },
    { icon: 'line-chart', title: 'Performance & Culture', description: 'An engaging culture driven by contextual feedback and organization aligned goals.', link: 'Learn more' },
    { icon: 'user-plus', title: 'Hiring & Onboarding', description: 'An integrated hiring platform for teams to collaborate with recruiters and hire good talent.', link: 'Learn more' },
    { icon: 'clock-o', title: 'Project Timesheet', description: 'Track your employee time and maintain effective utilization to grow your services business.', link: 'Learn more' },
    { icon: 'calendar-check-o', title: 'Time & Attendance', description: 'Track your employee time effectively and compensate on time while working remotely.', link: 'Learn more' },
    { icon:'graduationCap' , title: 'Learning Management', description: 'Upskill and train employees effortlessly with an intuitive LMS.' , link: 'Learn more'},
  ];

  const FooterSection = ({ title, items }: FooterSectionProps) => (
    <Box mb={4}>
      <Text fontWeight="bold" fontSize="lg">{title}</Text>
      {items.map((item, index) => (
        <Text key={index} fontSize="md" mb={1}>{item}</Text>
      ))}
    </Box>
  );
  const handleLoginClick = () => {
    router.push('/login');
  }
 const handlesignupfordemo = () => {
   router.push({
   pathname:'/Home',
   query:{username: email.split('@')[0]}
 }
)}
  const handleToggle = (index: number) => {
    if (activeNavDropdown === index) {
      setActiveNavDropdown(null);
    } else {
      setActiveNavDropdown(index);
    }
  };
return(
    <Box  height="100vh" overflowY="auto">
      <Box 
      position={"fixed"}
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      display="flex" 
      w={"100%"}
      bg={"white"}
      alignItems={"center"}
      justifyContent="space-between" 
      px={4} 
      py={2} 
      height={`${HEADER_HEIGHT}px`}
      >
        <Text fontSize="2xl" fontWeight="bold">AVLR</Text>
        {!isMobile && (
        <Box display="flex">
          {navItems.map((item, index) => (
            <Box key={index} mr={6} position="relative" 
            onMouseEnter={() => setActiveNavDropdown(index)} 
            onMouseLeave={() => setActiveNavDropdown(null)}>
              <Button variant="link" onClick={() => setActiveNavDropdown(activeNavDropdown === index ? null : index)}>
                <Text fontSize="lg" color="#333">{item.title}</Text>
              </Button>

              {activeNavDropdown === index && (
                <Box 
                  position="absolute" 
                  top="100%" 
                  left={0} 
                  bg="white" 
                  borderWidth="1px" 
                  borderColor="gray.200" 
                  width="200px" 
                  zIndex={10}
                  borderRadius="md"
                  boxShadow="lg"
                  mt={2}
                  py={2}
                  transition={"all 0.2s ease-in-out"}
                  >
                  {item.options.map((option, optIndex) => (
                    <Button 
                      key={optIndex} 
                      variant="ghost" 
                      w="full" 
                      justifyContent="flex-start"
                      px={4}
                      py={2}
                      borderRadius="md"
                      _hover={{ bg: 'gray.100', color: '#007bff' }}
                      _focus={{boxShadow: 'outline'}}
                      fontSize={"sm"}
                      fontWeight={"medium"}
                      onClick={() => {
                       setActiveNavDropdown(null);
                        navigation.navigate(option); 
                        }}>
                      <Text fontSize="md" color="#333">{option}</Text>
                    </Button>
                  ))}
                </Box>
              )}
            </Box>
          ))}
        </Box>
        )}
        {!isMobile ? (
        <Box display="flex" alignItems="center">
          <Button variant="link" onClick={handleLoginClick}>
            <Text fontSize="lg" color="#333">Login</Text>
          </Button>
          <Button bg="#007bff" color="white" px={6} py={2} borderRadius="md" ml={4}>
           Get free trial
          </Button>
        </Box>
        ):(
          <IconButton
           icon={<HamburgerIcon/>}
           aria-label='Open Menu'
           onClick={onOpen}
           variant={"outline"}
           />
        )}
      </Box>
<Drawer placement="right" onClose={onClose} isOpen={isOpen}>
  <DrawerOverlay />
  <DrawerContent>
    <DrawerCloseButton />
    <DrawerHeader>Menu</DrawerHeader>
    <DrawerBody>
      <Accordion allowToggle>
        {navItems.map((item, index) => (
          <AccordionItem key={index} border="none">
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">{item.title}</Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {item.options.map((option, optIndex) => (
                <Button
                  key={optIndex}
                  variant="ghost"
                  width="100%"
                  justifyContent="flex-start"
                  onClick={() => {
                    onClose(); 
                    navigation.navigate(option);
                  }}
                >
                  {option}
                </Button>
              ))}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>

      <Box mt={6} display={"flex"} gap={4}>
        <Button
          variant="outline"
          width="100%"
          mb={3}
          onClick={() => {
            onClose();
            router.push('/login');
          }}
        >
          Login
        </Button>
        <Button
          bg="#007bff"
          color="white"
          width="100%"
          onClick={() => {
            onClose();
            router.push('/signup');
          }}
        >
          Get free trial
        </Button>
      </Box>
    </DrawerBody>
  </DrawerContent>
</Drawer>

      <Box 
        position={"absolute"}
        top={`${HEADER_HEIGHT + 16}px`} 
        left={"0"}
        right={"0"}
        bottom={"0"}
        overflowY={"auto"}
         px={4}
      >
      <Box display="flex" flexDirection={{base: 'column', md: 'row'}} py={16} gap={8} >
        <Box py={16} width={{base: '100%', md:'50%'}} px={4} mb={{base:8, md:0}}>
          <Box  textAlign={"center"}>
          <Text fontSize="4xl" fontWeight="bold" textAlign= "center" mb={4}>Everything you need to <br/>build a great company</Text>
          <Text fontSize="lg" maxW={"800px"} mx={"auto"} mb={4}>
            AVLR is your people enabler. From Automation of people processes to creating an engaged and driven culture, AVLR is all you need to build a good to great company.
          </Text>
          </Box>
          <Box display="flex">
            <Input 
               placeholder=" ✉️ Your work email"  
               value={email}  
               onChange={(e) =>{
                 setEmail(e.target.value);
                 if(emailError) setEmailError('');
                } }
               width="60%" 
                mr={4}
                 />
                 {emailError && (
                  <Text color= "red.500" mt={2} fontSize="sm">
                    {emailError}
                  </Text>
                 )}
            <Button 
              bg="#007bff" 
              color="white" 
              px={6} 
              py={2} 
              borderRadius="md"
              onClick={() =>{
                if (!email || !/\S+@\S+\.\S+/.test(email)) {
                 setEmailError("Please enter a valid email address.");
               } else {
                setEmailError("");
               console.log("Email submitted for demo:", email);
                 handlesignupfordemo();
               }
               } }
              >
                Signup for Demo</Button>
          </Box>
        </Box>

        <Box width={{bas:'100%', md:'50%'}} py={16} px={4}>
           <Box 
             display="grid" 
             gridTemplateColumns={{ base: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }} 
             gap={4}
            >
          {[
             {label: 'Automation', icon: 'cogs'},
            {label: 'Analytics', icon: 'bar-chart'},
            {label: 'Payroll', icon: 'money'},
            {label: 'Recognition', icon: 'trophy'},
            {label: 'Feedback', icon: 'comments'},
            {label: 'Objectives', icon: 'bullseye'},
            {label: 'Expense', icon:'credit-card'}
          ].map((item, index) => (
            <Box 
               key={index}  
               display="flex" 
               alignItems="center" 
               p={3}
               boxShadow={"md"}
               bg={"gray.100"}
               _hover={{
                cursor:'pointer',
                bg:'#f0f0f0',
                transform:'scale(1.05)',
               }}
               onClick={() =>{
               console.log(`${item.label} clicked`);
               }}
               borderRadius="md"
               sx={{ aspectRatio: '1/1'}} 
               >
              {iconMap[item.icon as IconKey]}
              <Text fontSize="lg" color="#007bff" ml={2}>{item.label}</Text>
            </Box>
          ))}
        </Box>
      </Box>
      </Box>

       <Box py={16} style={{backgroundColor:'#f8fcff'}}>
        <Box py={16} textAlign={"center"} >
        <Text fontSize="4xl"  fontWeight="bold" mb={6}>Smart HR to outsmart the changing world</Text>
        <Text fontSize="lg" maxW={"800px"} mx={"auto"} mb={6}>The world has changed, and it's going to keep changing. AVLR HR helps your teams to adapt, evolve, and scale by working more effectively. Spend less time on mundane tasks and focus more on strategy. Turn data into smarter decisions and create experiences your employees will love.</Text>
        </Box>
        <Box 
        display={{ base:"block", md:"flex"}} 
        alignItems={"stretch"} 
        px={{base:4, md:12, lg:24}}
        gap={12}>

      
        <Box flex="1">
          {features.map((item, index) => (
            <Box
              key={index}
              p={4}
              mb={4}
              border="1px solid #e2e8f0"
              borderRadius="md"
              bg={selectedFeature === index ? "#e6f7ff" : "white"}
              _hover={{ cursor: "pointer", bg: "#f1f1f1" }}
              onClick={() => setSelectedFeature(index)}
            >
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                {item.title}
              </Text>
              <Text fontSize="md" color="gray.700">
                {item.description}
              </Text>
            </Box>
          ))}
        </Box>
        <Box flex="1" display="flex" justifyContent="center" alignItems="center">
        <Box 
        width={{ base: '100%', md: '80%', lg: '100%' }}
         maxW={{ base: '100%', md: '700px', lg: '900px'}}
         position="relative"
         borderRadius="lg"
         overflow="hidden"
         boxShadow="lg"
         height="100%"
        
        >
    <Image
      src={features[selectedFeature].image}
      alt={features[selectedFeature].title}
      layout='fill' 
      style={{ borderRadius: '12px', objectFit: 'cover' }}
    />
  </Box>
 </Box>
        </Box>
      </Box>

      <Box py={16}>
        <Text fontSize="4xl" align={"center"} fontWeight="bold" mb={6}>Everything you need to create a high <br/>performance culture</Text>
        <Box 
          display="grid" 
          gridTemplateColumns={{base: "1fr", md:"repeat(3, 1fr)" }}
          gap={6}
          px={4}
          justifyContent={{ base:"center", md:"stretch"}}
          >
          {featureCards.slice(0,6).map((item, index) => (
                <Box 
               key={index} 
               bg="white"
               border="1px solid #e2e8f0"
               borderRadius="1g"
               height="220px"
               display="flex"
               flexDirection={"column"}
               justifyContent={"center"}
               alignItems={"center"}
               textAlign={"center"}
               boxShadow="sm"
               transition="all 0.3s ease"
               _hover={{boxShadow:"md", transform:"scale(1.03)"}}
               >
                <Box display="flex" alignItems="center" mb={3}>
                 <Box fontSize="xl" color="#007bff">
                 {iconMap[item.icon as IconKey]}
               </Box>
                <Text fontSize="lg" fontWeight="bold" ml={2}>{item.title}</Text>
                </Box>
              
              <Text fontSize="md"  mb={4}>{item.description}</Text>
              <Button variant="link" color="#007bff">{item.link}</Button>
            </Box>
          ))}
          
    
    {featureCards[6] && (
      <Box
        gridColumn={{ base: "1", md: "2 / span 1" }} 
        bg="white"
        border="1px solid #e2e8f0"
        borderRadius="lg"
        height="220px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        boxShadow="sm"
        transition="all 0.3s ease"
        _hover={{ boxShadow: "md", transform: "scale(1.03)" }}
      >
        <Box display="flex" alignItems="center" mb={3}>
          <Box fontSize="xl" color="#007bff">{iconMap[featureCards[6].icon as IconKey]}</Box>
          <Text fontSize="lg" fontWeight="bold" ml={2}>{featureCards[6].title}</Text>
        </Box>
        <Text fontSize="md"  mb={4}>{featureCards[6].description}</Text>
        <Button variant="link" color="#007bff">{featureCards[6].link}</Button>
      </Box>
    )}
  
        </Box>
      </Box>

      <Box py={16} bg="#f8f8f8">
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={6}>Loved by HR professionals</Text>
        <Box display="flex" gap={8} justifyContent="center" mb={6}>
           <Image
        src="/images/Nike,png.jpg"
        alt="HR App Features"
        width={80}
        height={60}
        style={{objectFit:'contain', borderRadius:'12px'}}
      
      />
       <Image
        src="/images/zapier.png'.jpg"
        alt="HR App Features"
        width={80}
        height={60}
        style={{objectFit:'contain', borderRadius:'12px'}}
      />
        </Box>

        <Box textAlign="center" mb={6}>
          <Text fontSize="lg" fontStyle="italic" mb={4}>
            "AVLR HRMS has transformed our HR processes. Payroll is now seamless, and employees are more engaged."
          </Text>
          <Text fontSize="md" fontWeight="bold">- Emma Brown, HR Manager</Text>
        </Box>
      </Box>

      <Box py={16}>
        <Text fontSize="4xl" align={"center"} fontWeight="bold" mb={6}>Personalized HCM Software for<br/> your industry</Text>
        <Text fontSize="lg" maxW={"800px"} mx={"auto"} align={"center"} mb={6}>You need someone that understands you. Check our tailored offerings for your industry. This is people Management - A` la carte.</Text>
        <Box 
             display="grid" 
             gridTemplateColumns={{ base: "1fr", sm :'1fr 1fr', md: "1fr 1fr", lg: "repeat(4, 1fr)" }}
             gap={6}
             >
          {[{ icon: 'laptop', title: 'Technology & Services', description: 'Powerful HCM software for technology and white collar services companies where EX is essential.', link: 'Know More' },
             {icon: 'flask', title: 'Pharma & Manufacturing', description: 'HR & Payroll for Pharma and manufacturing companies. For both blue-collar and white-collar employees.', link: 'Know More' },
            { icon: 'university', title: 'Bank & Financial Services', description: 'Complete HCM and Payroll for banks and financial services where compliance and audit processes are a must.', link: 'Know More' },
            { icon: 'shopping-bag', title: 'Retail & Other Industries', description: 'One central HR platform for all retail stores. 24x7 accessibility & updates from anywhere on earth.', link: 'Know More' }
          ].map((item, index) => (            
            <Box 
                key={index}
                p={6}
                bg="white"
                borderRadius="lg"
                boxShadow="sm"
                border="1px solid #e2e8f0"
                transition="all 0.3s ease"
                _hover={{ boxShadow: "md", transform: "translateY(-5px)" }}
                display="flex"
                flexDirection={"column"}
                justifyContent="space-between"
                alignItems={"center"}
               >
              <Box display="flex" alignItems="center" mb={4}>
                <Box fontSize="2xl" color="#007bff" mr={4}>
                  {iconMap[item.icon as IconKey]}
                 </Box>
                <Text fontSize="lg" fontWeight="bold" ml={4}>{item.title}</Text>
              </Box>
              <Text fontSize="md" mb={4}>{item.description}</Text>
              <Button variant="link" color="#f9fdff">{item.link}</Button>
            </Box>
           ))};
      
        </Box>
      </Box>
         <Box py={16} style={{backgroundColor:'#f8fcff'}}>
  <Text fontSize="4xl" align="center" fontWeight="bold" mb={6}>
    One HR app, embraced by<br/> 2.5 Million Employees
  </Text>
  <Box display="flex" flexDirection={{ base: "column", md: "row" }} alignItems="center" justifyContent="space-between" gap={8}>
    
    <Box flex="1" display="flex" justifyContent="center">
      <Image
        src="/images/shared image.png"
        alt="HR App Features"
        width={400}
        height={600}
        style={{objectFit:'contain', borderRadius:'12px'}}
      />
    </Box>


    <Box flex="1" display="grid" gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
      {[
        { icon: 'calendar-check-o', title: 'Simplified Leave & Attendance', description: 'Let employees clock in or take leave—remotely, on field, or in-office. Embrace self-accountability.' },
        { icon: 'credit-card', title: 'Tax and Expense - in 2 Clicks', description: 'Let employees manage tax declarations and proofs. File and update expenses in 2 clicks.' },
        { icon: 'check', title: 'A Culture of Recognition', description: 'Give and receive praises to build a culture of recognition. Take a moment to take it in.' },
        { icon: 'circle', title: 'Approvals from a Single Window', description: 'Enable managers to approve or reject requests from a single window.' },
        { icon: 'cog', title: 'Adaptable to Employee Preferences', description: 'Each employee can find their preferred features on the main screen.' },
        { icon: 'headphones', title: 'Faster Resolution of Employee Issues', description: 'A reliable help-desk with a super-easy process for raising and resolving issues.' },
      ].map((item, index) => {
         const showIconOnMobile = useBreakpointValue({ base: true, md: false }); 
        return(
        <Box
          key={index}
          p={4}
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
          transition="all 0.3s ease"
      
        >
          <Box display="flex" alignItems="center" mb={3}>
                  {showIconOnMobile && (
                    <Box fontSize="2xl" color="#007bff" mr={3}>
                      {iconMap[item.icon as IconKey]}
                    </Box>
                  )}
                  <Text fontSize="lg" fontWeight="bold">
                    {item.title}
                  </Text>
                </Box>
          <Text fontSize="md" color="gray.600" mb={4}>
            {item.description}
          </Text>
        </Box>
        );}
      )}
    </Box>
  </Box>
</Box>

      <Box bg="#A9A9A9" py={8} px={{ base:4, md:12, lg:20}} >
        <Text fontSize="xl" fontWeight="bold" textAlign="initial">AVLR</Text>
        <Text fontSize="md"  textAlign="initial" mb={6}>AVLR is made for your people, by people like you,<br/> who care for people in the organization</Text>
    <Box display="flex" gap={4} mb={4}>
      <FaFacebookF size={18} cursor="pointer" />
      <FaTwitter size={18} cursor="pointer" />
      <FaLinkedinIn size={18} cursor="pointer" />
      <FaInstagram size={18} cursor="pointer" />
    </Box>
  
        <Box borderBottom="1px solid #ddd" mb={6}></Box>
        <Box px={4}>
        <Box 
             display="Grid" 
             gridTemplateColumns={{base: "1fr",sm:'1fr 1fr', md: '1fr 1fr',lg:"repeat(4,1fr)"}} 
             gap={4} 
             justifyContent="space-between"
             >
          <FooterSection title="Core HR" items={["HR Software", "ESS Portal", "Employee Profiles", "Documents", "Helpdesk", "Pulse Surveys", "HR Analytics"]} />
            <FooterSection title="Payroll" items={["Payroll Software", "Compliance", "Expense Management", "Compensation", "Loans & Advances", "Employee Finances"]} />
            <Box>
            <FooterSection title="Hiring & Onboarding" items={["Applicant Tracking System", "Hiring Software", "Offer Management", "Employee Onboarding"]} />
            <FooterSection title="Learn" items={["Learning Management System"]} />
            </Box>
            <FooterSection title="Time Attendance" items={["Attendance Management", "Leave Management", "GPS / Mobile Attendance", "Shift Management"]} />
            <FooterSection title="Performance" items={["Performance Management", "360 degree feedback", "Continuous Feedback", "Employee Development"]} />
            <FooterSection title="PSA" items={["PSA Software", "Resource Management", "Project Management", "Timesheet Software", "Billing System", "Analytics", "Opportunity Management"]} />
            <FooterSection title="Company" items={["About us", "Customer Stories", "Partner with Us", "News", "Marketplace", "Security"] }/>
            <FooterSection title="Contact" items={[
      "Sales: +91 89292 08062", "isales@avlr.com",
      "Support: support@avlr.com", "Marketing: marketing@avlr.com",
      "5th Floor, pranava Group, Beside harsha toyota showroom, kondapur, Hyderabad, Telangana 500084",]}/>
      </Box>
      
         <Box mt={10} px={4}>
    <Text fontSize="lg" fontWeight="bold" mb={4}>
      Contact Us
    </Text>
    <Box display="grid" gridTemplateColumns={{ base: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }} gap={4}>
      {[
        { city: "Portland", phone: "+1-540-503-4550" },
        { city: "Singapore", phone: "+65 6232 6961" },
        { city: "Bengaluru", phone: "+91 9000015743" },
        { city: "Hyderabad", phone: "+91 9281115885" },
        { city: "Chennai", phone: "+91 9000017131" },
        { city: "Delhi NCR", phone: "+91 9100085589" },
        { city: "Mumbai", phone: "+91 9000017303" },
        { city: "Kolkata", phone: "+91 9281116365" },
        { city: "Pune", phone: "+91 9346991504" },
      ].map((contact, index) => (
        <Box key={index}>
          <Text fontWeight="medium">{contact.city}:</Text>
          <Text>{contact.phone}</Text>
        </Box>
      ))}
       <Box w="100%" mt={4} display="flex" textAlign="center" justifyContent={"center"}>
       <Text fontSize="sm" textAlign={"center"} color="gray.600">© {new Date().getFullYear()} AVLR Innovative Solutions. All rights reserved.</Text>
          </Box>
          </Box>
          </Box>
      </Box>
    </Box>
    </Box>
    </Box>
  );
};

export default App;
