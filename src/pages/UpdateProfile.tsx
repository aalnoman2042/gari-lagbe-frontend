import { useForm } from "react-hook-form";
import { useUserInfoQuery, useUpdateUserMutation } from "@/redux/auth.api";
import { toast } from "sonner";

const UpdateProfile = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { data: user, isLoading, isError } = useUserInfoQuery(undefined);
  const [updateUser] = useUpdateUserMutation();

  const onSubmit = async (data: any) => {
    try {
      await updateUser(data).unwrap();
      toast.success("Profile updated successfully");
    } catch (error: any) {
      console.error("Error updating profile", error);
      toast.error(error?.data?.message);
    }
  };

  if (user) {
    setValue("name", user?.data?.name);
    setValue("email", user?.data?.email);
  }

  if (isLoading) return <span className="loading loading-spinner loading-lg"></span>;
  if (isError) return <div>Error loading user data</div>;

  return (
    <div className="w-[60%] mx-auto p-12 bg-white rounded-2xl shadow-2xl mt-12 transition-transform duration-300 hover:scale-[1.01]">
      <h2 className="text-4xl font-bold text-center mb-10 text-[#175C4F]">
        Update Your Profile
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Name */}
        <div>
          <label className="block text-gray-700 mb-2 text-lg">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full p-5 border border-gray-300 rounded-xl 
                       focus:outline-none focus:ring-2 focus:ring-[#175C4F] focus:border-[#175C4F] 
                       transition-all duration-300 ease-in-out hover:shadow-lg text-lg"
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors?.name?.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 mb-2 text-lg">Email</label>
          <input
            type="email"
            value={user?.data?.email || ""}
            readOnly
            className="w-full p-5 border border-gray-300 rounded-xl bg-gray-100 cursor-not-allowed text-lg"
          />
        </div>

        {/* Old Password */}
        <div>
          <label className="block text-gray-700 mb-2 text-lg">Old Password</label>
          <input
            type="password"
            {...register("oldPassword")}
            placeholder="******"
            className="w-full p-5 border border-gray-300 rounded-xl 
                       focus:outline-none focus:ring-2 focus:ring-[#175C4F] focus:border-[#175C4F] 
                       transition-all duration-300 ease-in-out hover:shadow-lg text-lg"
          />
        </div>

        {/* New Password */}
        <div>
          <label className="block text-gray-700 mb-2 text-lg">New Password</label>
          <input
            type="password"
            {...register("newPassword")}
            placeholder="******"
            className="w-full p-5 border border-gray-300 rounded-xl 
                       focus:outline-none focus:ring-2 focus:ring-[#175C4F] focus:border-[#175C4F] 
                       transition-all duration-300 ease-in-out hover:shadow-lg text-lg"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-5 bg-[#175C4F] text-white text-xl font-semibold 
                     rounded-xl shadow-xl hover:bg-black 
                     focus:outline-none focus:ring-4 focus:ring-[#175C4F]/50 
                     transition-all duration-300 ease-in-out"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
