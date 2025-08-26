
import { useForm } from 'react-hook-form';
import { useUserInfoQuery, useUpdateUserMutation } from '@/redux/auth.api';
import { toast } from 'sonner';

const UpdateProfile = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { data: user, isLoading, isError } = useUserInfoQuery(undefined); // Fetch user info from RTK
  const [updateUser] = useUpdateUserMutation(); // Mutation to update user info

  // Handle form submission
  const onSubmit = async (data: any) => {

    
    try {
        
      await updateUser(data).unwrap();
      toast.success('Profile updated successfully');
    } catch (error : any) {
      console.error('Error updating profile', error);
      toast.error(error?.data?.message 
      
        
      );
    }
  };

  // Set form default values
  if (user) {
    setValue('name', user?.data?.name);
    setValue('email', user?.data?.email);
  }

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading user data</div>;

  return (
    <div className="max-w-[70%] mx-auto p-5 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">Update Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Name */}
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            placeholder="Enter your name"
          />
          
        </div>

        {/* Email (Read-only) */}
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={user?.data?.email || ''}
            readOnly
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700">old Password</label>
          <input
            type="password"
            {...register('oldPassword')}
            placeholder="******"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-gray-700">New Password</label>
          <input
            type="password"
            {...register('newPassword')}
            placeholder="******"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 bg-[#175C4F] text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
