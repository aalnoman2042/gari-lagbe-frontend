import { Button } from "@/components/ui/button";

import { authApi, useLogoutMutation, useUserInfoQuery } from "@/redux/auth.api";
import { useAppDispatch } from "@/redux/hook";


import { Link } from "react-router";
import { toast } from "sonner";

const Navbar = () => {
  const { data } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation()
  const dispatch = useAppDispatch();

  console.log(data);


  const handleLogout = async () => {
  await logout(undefined);
  toast.success("Successfully Logged out");
  dispatch(authApi.util.resetApiState());
  // localStorage.clear(); // অথবা শুধু auth related key clear করো
};


    return (
        <div>
         <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><Link to={'/'}> Home</Link></li>
     

          <li>
  {data?.data?.role === "rider" ? (
    <Link to="/rider">Rider Dashboard</Link>
  ) : data?.data?.role === "driver" ? (
    <Link to="/driver">Driver Dashboard</Link>
  ) : data?.data?.role === "admin" ? (
    <Link to="/admin">Admin Dashboard</Link>
  ) : null}
</li>
         
       
        <li><a>Item 3</a></li>
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><a>Item 1</a></li>
              <li>
  {data?.data?.role === "rider" ? (
    <Link to="/rider">Rider Dashboard</Link>
  ) : data?.data?.role === "driver" ? (
    <Link to="/driver">Driver Dashboard</Link>
  ) : data?.data?.role === "admin" ? (
    <Link to="/admin">Admin Dashboard</Link>
  ) : null}
</li>
      <li><a>Item 3</a></li>
    </ul>
  </div>
  <div className="navbar-end ">
{data?.data?.email && (
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-sm"
            >
              Logout
            </Button>
          )}
          {!data?.data?.email && (
            <Button asChild className="text-sm">
              <Link to="/login">Login</Link>
            </Button>
          )}
  </div>
</div>
        </div>
    );
};

export default Navbar;