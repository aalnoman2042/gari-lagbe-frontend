

import { useUserInfoQuery } from "@/redux/auth.api";
import { TRole } from "@/types/sideBarTypes";
import { ComponentType } from "react";
import { Navigate } from "react-router";
// import {Tstatus} from "@/constants/status";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery(undefined);

       const role = data?.data?.role;
    const status = data?.data?.status;



   // Block or suspend check
    if ((role === "driver" || role === "rider") && (status === "suspended" || status === "blocked")) {
      return <Navigate to={"/unauthorized"} />;
    }

    if (!isLoading && !data?.data?.email) {
      return <Navigate to="/login" />;
    }

    if (requiredRole && !isLoading && requiredRole !== data?.data?.role) {
      return <Navigate to="/unauthorized" />;
    }

    return <Component />;
  };
};