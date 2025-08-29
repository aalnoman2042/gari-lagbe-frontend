import { useForm } from "react-hook-form";
import { useUserInfoQuery, useUpdateUserMutation } from "@/redux/auth.api";
import { toast } from "sonner";
import Loading from "@/component/common/loading";

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

  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading user data</div>;

  return (
    <div className="w-[50%] max-w-md mx-auto p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl mt-12 transition-transform duration-300 hover:scale-[1.02]">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#175C4F]">
        Update Your Profile
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-gray-700 mb-1 text-base font-medium">
            Name
          </label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full p-4 border border-gray-300 rounded-xl 
                       focus:outline-none focus:ring-2 focus:ring-[#175C4F] focus:border-[#175C4F] 
                       transition-all duration-300 ease-in-out hover:shadow-md text-base"
            placeholder="Enter your full name"
          />
          {/* {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors?.name.message}</p>
          )} */}
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 mb-1 text-base font-medium">
            Email
          </label>
          <input
            type="email"
            value={user?.data?.email || ""}
            readOnly
            className="w-full p-4 border border-gray-300 rounded-xl bg-gray-100 cursor-not-allowed text-base"
          />
        </div>

        {/* Old Password */}
        <div>
          <label className="block text-gray-700 mb-1 text-base font-medium">
            Old Password
          </label>
          <input
            type="password"
            {...register("oldPassword")}
            placeholder="******"
            className="w-full p-4 border border-gray-300 rounded-xl 
                       focus:outline-none focus:ring-2 focus:ring-[#175C4F] focus:border-[#175C4F] 
                       transition-all duration-300 ease-in-out hover:shadow-md text-base"
          />
        </div>

        {/* New Password */}
        <div>
          <label className="block text-gray-700 mb-1 text-base font-medium">
            New Password
          </label>
          <input
            type="password"
            {...register("newPassword")}
            placeholder="******"
            className="w-full p-4 border border-gray-300 rounded-xl 
                       focus:outline-none focus:ring-2 focus:ring-[#175C4F] focus:border-[#175C4F] 
                       transition-all duration-300 ease-in-out hover:shadow-md text-base"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-4 bg-gradient-to-r from-[#175C4F] to-[#1B6D5F] text-white text-lg font-semibold 
                     rounded-xl shadow-lg hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-[#175C4F]/50 
                     transition-all duration-300 ease-in-out"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
