/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useLoginMutation } from "../../redux/auth.api";
import { toast } from "sonner";


const LoginForm: React.FC = () => {
  const { register, handleSubmit } = useForm<FieldValues>();
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  // Form submit handler
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    
    try {
      const res = await login(data).unwrap();

      if (res.success) {
        toast.success("Logged in successfully");
        navigate("/");
      }
    } catch (err: any) {
      // console.error(err?.data?.message);

        toast.error(err?.data?.message)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-[#175C4F]">
          Login
        </h2>

        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#175C4F]"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required" })}
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#175C4F]"
            placeholder="Enter your password"
            {...register("password", { required: "Password is required" })}
          />
        </div>

        {/* Role Field */}
        <div className="mb-6">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Role
          </label>
          <select
            id="role"
            {...register("role", { required: "Role is required" })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#175C4F]"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="rider">Rider</option>
            <option value="driver">Driver</option>
          </select>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-[#175C4F] text-white py-3 rounded-lg font-semibold hover:bg-black transition-colors duration-300"
        >
          Login
        </button>

        {/* Register Route Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don&apos;t have an account?{" "}
            <a
              href="/register"
              className="text-[#175C4F] font-semibold hover:underline"
            >
              Register
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
