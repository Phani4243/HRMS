import { yupResolver } from "@hookform/resolvers/yup";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Logo } from "../Logo";
import { InputControl } from "components/atoms/TextInput";
import { DarkModeSwitch } from "components/DarkModeSwitch";
import { useForgotPassword } from "../hook";

const ForgotPassword = () => {
  const { initialValues, schema, submit } = useForgotPassword();
  const { handleSubmit, control, formState } = useForm({
    resolver: yupResolver(schema),
  });
  const { errors } = formState;

  const cardBg = useColorModeValue("white", "gray.800");
  const cardShadow = useColorModeValue("md", "dark-lg");
  const textMuted = useColorModeValue("gray.600", "gray.400");

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <Container maxW="lg" py={{ base: 12, md: 24 }} px={{ base: 4, sm: 8 }}>
          <DarkModeSwitch sx={{ position: "fixed", top: "1rem", right: "1rem" }} />

          <Stack spacing={10} align="center">
            <Logo />
            <Stack spacing={1} textAlign="center">
              <Heading size="lg">Reset your password</Heading>
              <Text fontSize="sm" color={textMuted}>
                Enter your email and we’ll send you instructions
              </Text>
            </Stack>

            <Box
              w="full"
              py={8}
              px={6}
              bg={cardBg}
              boxShadow={cardShadow}
              borderRadius="lg"
            >
              <Stack spacing={6}>
                <InputControl
                  label="Email"
                  name="email"
                  control={control}
                  initialValues={initialValues.email}
                  errors={errors}
                />
                <Button
                  type="submit"
                  colorScheme="teal"
                  size="lg"
                  fontWeight="semibold"
                >
                  Send Reset Link
                </Button>
              </Stack>
            </Box>

            <Text fontSize="sm" color={textMuted}>
              Remember your password?{" "}
              <Link as={NextLink} href="/login" color="teal.500" fontWeight="medium">
                Sign In
              </Link>
            </Text>
          </Stack>
        </Container>
      </form>
    </>
  );
};

export default ForgotPassword;
