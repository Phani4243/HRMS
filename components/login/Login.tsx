import { yupResolver } from "@hookform/resolvers/yup";
import NextLink from "next/link";
import { useEffect } from "react";
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
} from "@chakra-ui/react";
import { Logo } from "./Logo";
import { useSignIn } from "./hook";
import { PasswordField } from "./PasswordField";
import { OAuthButtonGroup } from "./OAuthButtonGroup";
import { InputControl } from "components/atoms/TextInput";
import { DarkModeSwitch } from "components/DarkModeSwitch";
import { useRouter } from "next/router";

const Login = () => {
  const { schema, submit } = useSignIn();
  const router = useRouter();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    setValue("email", "");
    setValue("password", "");
  }, [setValue]);

  const onSubmit = (data: any) => {
    submit(data, router);
  };

  const cardBg = useColorModeValue("white", "gray.800");
  const cardShadow = useColorModeValue(
    "0 8px 30px rgba(0, 0, 0, 0.12)",      // light mode shadow
    "0 10px 40px rgba(0, 0, 0, 0.5)"       // dark mode shadow
  );
  
  const textMuted = useColorModeValue("gray.600", "gray.400");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" name="fake-email" style={{ display: "none" }} />
      <input type="password" name="fake-password" style={{ display: "none" }} />

      <Container maxW="lg" py={{ base: 12, md: 24 }} px={{ base: 4, sm: 8 }}>
        <DarkModeSwitch sx={{ position: "fixed", top: "1rem", right: "1rem" }} />

        <Stack spacing={10} align="center">
          <Logo />
          <Stack spacing={1} textAlign="center">
            <Heading size="lg">Welcome Back</Heading>
            <Text fontSize="sm" color={textMuted}>
              Don’t have an account?{" "}
              <Link as={NextLink} href="#" color="teal.500" fontWeight="medium">
                Sign up
              </Link>
            </Text>
          </Stack>

          <Box
            w="full"
            py={8}
            px={6}
            bg={cardBg}
            boxShadow={cardShadow}
            borderRadius="xl"
          >
            <Stack spacing={6}>
              <InputControl
                label="Email"
                name="email"
                control={control}
                errors={errors}
                inputProps={{ autoComplete: "new-email" }}
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
                  />
                )}
              />
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
              <Button
                type="submit"
                colorScheme="teal"
                size="lg"
                fontWeight="semibold"
              >
                Sign in
              </Button>
              <HStack align="center" width="100%" spacing={4}>
                <Divider flex="1" borderColor="gray.300" />
                <Text fontSize="sm" whiteSpace="nowrap" color="gray.500">
                  or continue with
                </Text>
                <Divider flex="1" borderColor="gray.300" />
              </HStack>
              <OAuthButtonGroup />
            </Stack>
          </Box>
        </Stack>
      </Container>
    </form>
  );
};

export default Login;
