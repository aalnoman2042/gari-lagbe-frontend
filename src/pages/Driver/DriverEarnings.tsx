/* eslint-disable @typescript-eslint/no-unused-vars */
import {  useDriverEariningsQuery, useUserInfoQuery } from "@/redux/auth.api";

const DriverEarnings = () => {
    const {data: driver}= useUserInfoQuery(undefined)
    console.log(driver?.data?._id);
    const driverId = driver?.data?._id
    const { data:earn, error, isLoading, isSuccess }= useDriverEariningsQuery(driverId);

console.log(earn?.data?.totalEarnings);

    
    
    if (isLoading) {
        return <h2 className="text-red-700">data is loading</h2>
    }

    return (

        
        <div>
            <h1>total earnings of driver {earn?.data?.totalEarnings}</h1>
        </div>
    );
};

export default DriverEarnings;