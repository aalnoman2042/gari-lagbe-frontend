/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Password from "@/components/ui/password";
import { useRegisterMutation } from "@/redux/auth.api";

const registerSchema = z
  .object({
    name: z.string().min(3, { error: "Name is too short" }).max(50),
    email: z.email(),
    password: z.string().min(8, { error: "Password is too short" }),
    confirmPassword: z.string().min(8, { error: "Confirm Password is too short" }),
    role: z.enum(["rider", "driver"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function RegisterForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();
  const [register] = useRegisterMutation();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "rider",
    },
  });

  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
    };

    register(userInfo);
    navigate("/login");
    toast.success(`${userInfo?.name} account created, please login`);
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-8 p-6 md:p-10 bg-white shadow-lg rounded-2xl max-w-2xl mx-auto",
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-[#175C4F]">
          Register Your Account
        </h1>
        <p className="text-sm md:text-base text-gray-500">
          Enter your details to create a new account
        </p>
      </div>

      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 md:gap-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#175C4F] font-medium">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    {...field}
                    className="border-[#175C4F] focus:ring-[#175C4F] focus:border-[#175C4F]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#175C4F] font-medium">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="john.doe@example.com"
                    type="email"
                    {...field}
                    className="border-[#175C4F] focus:ring-[#175C4F] focus:border-[#175C4F]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#175C4F] font-medium">Password</FormLabel>
                <FormControl>
                  <Password {...field} className="border-[#175C4F]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#175C4F] font-medium">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Password {...field} className="border-[#175C4F]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Role Selection */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#175C4F] font-medium">Role</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-6 mt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        {...field}
                        value="rider"
                        checked={field.value === "rider"}
                        className="accent-[#175C4F]"
                      />
                      Rider
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        {...field}
                        value="driver"
                        checked={field.value === "driver"}
                        className="accent-[#175C4F]"
                      />
                      Driver
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full py-3 mt-2 bg-[#175C4F] hover:bg-black text-white font-semibold rounded-lg transition-all duration-300"
          >
            Register
          </Button>
        </form>
      </Form>

      {/* Or continue with */}
      <div className="relative text-center text-sm mt-4">
        <span className="relative z-10 bg-white px-2 text-gray-500">Or continue with</span>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full py-3 mt-2 border-[#175C4F] text-[#175C4F] hover:bg-[#175C4F] hover:text-white transition-all duration-300"
      >
        Login with Google
      </Button>

      {/* Login Link */}
      <p className="text-center text-sm mt-4 text-gray-500">
        Already have an account?{" "}
        <Link to="/login" className="underline underline-offset-2 text-[#175C4F] hover:text-black">
          Login
        </Link>
      </p>
    </div>
  );
}
