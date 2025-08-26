/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDriverHIstoryQuery, useUserInfoQuery } from "@/redux/auth.api";

const DriverHIstory = () => {
  const {data: driver}= useUserInfoQuery(undefined)
    console.log(driver?.data?._id);
    const driverId = driver?.data?._id
    const { data: DriverHistory, error, isLoading, isSuccess }= useDriverHIstoryQuery(driverId);

    console.log(driver);
    
console.log(DriverHistory);



    return (
        <div>
            <h5>hello {driver?.data?.name}</h5>
            <h1>this is driver hostru</h1>
        </div>
    );
};

export default DriverHIstory;