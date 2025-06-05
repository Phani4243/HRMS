import { useRouter } from "next/router";
import { signInSchema } from "../schema";
import { useToastMessages } from "@common-hooks/useToastMessages";
interface Props {
  email: string;
  password: string;
}

export const useSignIn = () => {
  const { Success, Warn } = useToastMessages();
  const router = useRouter();


  const handleSubmit = async (values: Props, router: any) => {
    const { email, password } = values;
    const username = email.split("@")[0];


    try {



      if (email === "employee@gmail.com" && password === "Employee@1234") {
        await Success("login successful", "Redirecting...");
        router.push({
          pathname: "/Home",
          query: { username },
        });
      } else if (email === "hr@gmail.com" && password === "HRempz@1234") {
        await Success("login successful", "Redirecting...");
        router.push({
          pathname: "/about",
          query: { username },
        });
      } else {
        await Warn("Invalid credentials");
        return;
      }
    } catch (err: any) {
      Warn(err?.message || "loging failed");
    }
  };

  return {
    schema: signInSchema,
    submit: handleSubmit,
  };
};
