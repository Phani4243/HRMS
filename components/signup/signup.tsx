import { yupResolver } from "@hookform/resolvers/yup";
import NextLink from "next/link";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { PasswordField } from "../login/PasswordField";
import { InputControl } from "components/atoms/TextInput";
import { DarkModeSwitch } from "components/DarkModeSwitch";
import { Logo } from "../login/Logo";
import { authService } from "../../lib/services/api";

interface SignupData {
  email: string;
  username: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  username: yup.string().min(3).required("Username is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const Signup = () => {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<SignupData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    setValue("email", "");
    setValue("username", "");
    setValue("password", "");
  }, [setValue]);

  const onSubmit = async (data: SignupData) => {
    setLoading(true);
    try {
      const user = await authService.signup(data);  
      localStorage.setItem("user", JSON.stringify(user));

      toast({
        title: "Signup successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      router.push("/login");
    } catch (error) {
      const message =
        (error as any)?.response?.data?.detail ||
        "Signup failed. Please try again.";
      toast({
        title: "Signup failed",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container maxW="lg" py={{ base: "12", md: "24" }} px={{ base: "0", sm: "8" }}>
        <DarkModeSwitch sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
        <Stack spacing="8">
          <Stack spacing="6">
            <Logo />
            <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
              <Heading size={{ base: "xs", md: "sm" }}>Create an account</Heading>
              <Text color="fg.muted">
                Already have an account?{" "}
                <Link as={NextLink} href="/login" color="blue.500">
                  Log in
                </Link>
              </Text>
            </Stack>
          </Stack>
          <Box
            py={{ base: "0", sm: "8" }}
            px={{ base: "4", sm: "10" }}
            bg={{ base: "transparent", sm: "bg.surface" }}
            boxShadow={{ base: "none", sm: "md" }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            <Stack spacing="6">
              <Stack spacing="5">
                <InputControl
                  label="Email"
                  name="email"
                  control={control}
                  errors={errors}
                  inputProps={{ autoComplete: "email", placeholder: "Enter your email" }}
                />
                <InputControl
                  label="Username"
                  name="username"
                  control={control}
                  errors={errors}
                  inputProps={{ autoComplete: "username", placeholder: "Choose a username" }}
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
                      placeholder="Create a password"
                    />
                  )}
                />
              </Stack>
              <Stack spacing="6">
                <Button
                  type="submit"
                  colorScheme="blue"
                  isLoading={loading}
                  loadingText="Signing up..."
                >
                  Sign up
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </form>
  );
};

export default Signup;
