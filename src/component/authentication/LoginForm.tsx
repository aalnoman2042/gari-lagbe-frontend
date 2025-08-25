/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { authApi, useLoginMutation } from '../../redux/auth.api';
import { toast} from 'sonner';
import { useAppDispatch } from '@/redux/hook';



const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();


  // Form submit handler
  const onSubmit: SubmitHandler<FieldValues> = async(data) => {
    console.log(data);

    login(data)
    navigate("/")
    dispatch(authApi.util.resetApiState());
    toast.success('logged In successfully')

//     try {

//       const response = await fetch(`http://localhost:5000/gari-lagbe/v1/auth/login`, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   credentials: "include",
//   body: JSON.stringify(data), 
   
// });
// if (response.ok) {
//   const data = await response.json();
//   console.log(data); 
//   toast.success("Logged in successfully");
//   navigate("/")
// } else {
//   console.log("Error: ", response.status);
// }
//     } catch (err) {
//       console.error(err);

//       if(err.data.message === "Password does not match" ){
//         toast.error("invalid credentials")
//       }

//       if (err.data.message === "User is not verified") {
//         toast.error("Your account is not verified");
//         navigate("/verify", { state: data.email });
//       }

      
//     }
    // Handle login authentication logic here
    // Navigate to the dashboard or any other page on successful login
    // navigate('/dashboard');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl mb-4 text-center">Login</h2>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
            placeholder="Enter your email"
            {...register('email', { required: 'Email is required' })}
          />
          
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
            placeholder="Enter your password"
            {...register('password', { required: 'Password is required' })}
          />
          
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Login
        </button>

        {/* Google Login */}
        {/* <div className="mt-4 text-center">
          <GoogleLogin
            clientId="YOUR_GOOGLE_CLIENT_ID"
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy="single_host_origin"
            className="w-full p-2 bg-blue-500 text-white rounded-md"
          />
        </div> */}

        {/* Register Route Link */}
        <div className="mt-4 text-center">
          <p>
            Don't have an account?{' '}
            <a href="/register" className="text-blue-500 hover:underline">Register</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
