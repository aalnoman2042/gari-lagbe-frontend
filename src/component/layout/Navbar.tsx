import { Button } from "@/components/ui/button";
import { authApi, useLogoutMutation, useUserInfoQuery } from "@/redux/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { Link } from "react-router";
import { toast } from "sonner";

const Navbar = () => {
  const { data } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await logout(undefined);
    toast.success("Successfully Logged out");
    dispatch(authApi.util.resetApiState());
  };

  return (
    <div className="sticky top-0 z-50 shadow-md bg-white">
      <div className="navbar px-6 py-3 max-w-7xl mx-auto">
        {/* Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#175C4F]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white rounded-box mt-3 w-52 p-2 shadow-lg"
            >
              <li><Link to="/">Home</Link></li>

              {/* Dashboard - role based */}
              {data?.data?.role === "rider" && <li><Link to="/rider">Rider Dashboard</Link></li>}
              {data?.data?.role === "driver" && <li><Link to="/driver">Driver Dashboard</Link></li>}
              {data?.data?.role === "admin" && <li><Link to="/admin">Admin Dashboard</Link></li>}

              <li><Link to="/">...</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/">....</Link></li>
              <li><Link to="/">...</Link></li>
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-2xl font-bold text-[#175C4F]">
            gariLagbe
          </Link>
        </div>

        {/* Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-6">
            <li><Link to="/" className="hover:text-[#175C4F] transition">Home</Link></li>

            {/* Dashboard - role based */}
            {data?.data?.role === "rider" && <li><Link to="/rider" className="hover:text-[#175C4F] transition">Rider Dashboard</Link></li>}
            {data?.data?.role === "driver" && <li><Link to="/driver" className="hover:text-[#175C4F] transition">Driver Dashboard</Link></li>}
            {data?.data?.role === "admin" && <li><Link to="/admin" className="hover:text-[#175C4F] transition">Admin Dashboard</Link></li>}

            <li><Link to="/" className="hover:text-[#175C4F] transition">All Rides</Link></li>
            <li><Link to="/contact" className="hover:text-[#175C4F] transition">contact</Link></li>
            <li><Link to="/" className="hover:text-[#175C4F] transition">Support</Link></li>
            <li><Link to="/" className="hover:text-[#175C4F] transition">About</Link></li>
          </ul>
        </div>

        {/* End */}
        <div className="navbar-end">
          {data?.data?.email ? (
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-sm border-[#175C4F] text-[#175C4F] hover:bg-[#175C4F] hover:text-white transition"
            >
              Logout
            </Button>
          ) : (
            <Button asChild className="text-sm bg-[#175C4F] hover:bg-black text-white transition">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
