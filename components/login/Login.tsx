import { yupResolver } from "@hookform/resolvers/yup";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Heading,
  HStack,
  Link,
  Stack,
  Text,

  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Logo } from "./Logo";
import { useSignIn } from "./hook";
import { PasswordField } from "./PasswordField";
import { OAuthButtonGroup } from "./OAuthButtonGroup";
import { InputControl } from "components/atoms/TextInput";
import { DarkModeSwitch } from "components/DarkModeSwitch";
import { useRouter } from "next/router";

import { authService } from "./../../lib/services/api";


interface LoginData {
  email: string;
  password: string;
}

interface ApiError {
  message: string;
  detail?: string;
}


const Login = () => {
  const { schema, submit } = useSignIn();
  const router = useRouter();

  const toast = useToast();
  const [loading, setLoading] = useState(false);


  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  useEffect(() => {
    setValue("email", "");
    setValue("password", "");
  }, [setValue]);

  const cardBg = useColorModeValue("white", "gray.800");
  const cardShadow = useColorModeValue(
    "0 8px 30px rgba(0, 0, 0, 0.12)",      // light mode shadow
    "0 10px 40px rgba(0, 0, 0, 0.5)"       // dark mode shadow
  );

  const onSubmit = async (data: LoginData) => {
    setLoading(true);
    try {
      const user = await authService.login({ 
        email: data.email,
        password: data.password,
      });

      localStorage.setItem('user', JSON.stringify(user));

      toast({
        title: "Login successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      submit(data, router);
      router.push('/Home');
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      
      
      toast({
        title: "Login failed",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === 'object' && error !== null) {
      const apiError = error as ApiError;
      return apiError.detail || apiError.message || 'An error occurred';
    }
    return 'An unexpected error occurred';
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    
      <input type="text" name="fake-email" style={{ display: "none" }} />
      <input type="password" name="fake-password" style={{ display: "none" }} />

      <Container maxW="lg" py={{ base: 12, md: 24 }} px={{ base: 4, sm: 8 }}>
        <DarkModeSwitch sx={{ position: "fixed", top: "1rem", right: "1rem" }} />

        <Stack spacing="8">
          <Stack spacing="6">
            <Logo />
            <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
              <Heading size={{ base: "xs", md: "sm" }}>Log in to your account</Heading>
              <Text color="fg.muted">
                Don&apos;t have an account?{" "}
                <Link as={NextLink} href="/signup" color="blue.500">
                  Sign up
                </Link>
              </Text>
            </Stack>

          </Stack>

          <Box
            w="full"
            py={8}
            px={6}
            bg={cardBg}
            boxShadow={cardShadow}
            borderRadius="xl"
          >

            <Stack spacing="6">
              <Stack spacing="5">
                <InputControl
                  label="Email"
                  name="email"
                  control={control}
                  errors={errors}
                  inputProps={{
                    autoComplete: "new-email",
                    placeholder: "Enter your email",
                  }}
                />
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <PasswordField
                      {...field}
                      value={field.value || ""}
                      isInvalid={!!errors.password}
                      errorMessage={errors.password?.message}
                      autoComplete="new-password"
                      placeholder="Enter your password"
                    />
                  )}
                />
              </Stack>

              <HStack justify="space-between">
                <Checkbox defaultChecked>Remember me</Checkbox>
                <Link
                  as={NextLink}
                  href="/forgot-password"
                  fontSize="sm"
                  color="teal.500"
                  fontWeight="medium"
                >
                  Forgot password?
                </Link>
              </HStack>

              <Stack spacing="6">
                <Button
                  type="submit"
                  colorScheme="blue"
                  isLoading={loading}
                  loadingText="Signing in..."
                >
                  Sign in
                </Button>
                <HStack>
                  <Divider />
                  <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
                    or continue with
                  </Text>
                  <Divider />
                </HStack>
                <OAuthButtonGroup />
              </Stack>

            </Stack>
          </Box>
        </Stack>
      </Container>
    </form>
  );
};

export default Login;