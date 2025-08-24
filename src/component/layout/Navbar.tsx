import { Button } from "@/components/ui/button";
import { authApi, useLogoutMutation, useUserInfoQuery } from "@/redux/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { fetchData } from "@/utils/fetchData";
import { useEffect } from "react";
import { Link } from "react-router";

const Navbar = () => {
  const { data } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation()
  const dispatch = useAppDispatch();

  

const fetchUserInfo = async () => {
  try {
    // Get the JWT token from the cookies
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('accessToken='))
      ?.split('=')[1]; // If token is not HttpOnly

    if (!token) {
      console.log('No token found. Please log in.');
      return;
    }

    // Make the GET request to fetch user info
    const response = await fetch('http://localhost:5000/gari-lagbe/v1/user/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Attach token in the Authorization header
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Ensures cookies are sent with the request
    });

    if (response.ok) {
      const data = await response.json();
      console.log('User Info:', data); // Log the user info
      return data; // You can update state or pass the data as needed
    } else {
      const errorData = await response.json();
      console.error('Error fetching user info:', errorData.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const UserProfile = () => {
  useEffect(() => {
    // Automatically hit the API on component mount
    fetchUserInfo();
  }, []); // Empty dependency array ensures this only runs once when the component mounts

}

  

UserProfile()

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
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
        <li><a>Item 1</a></li>
        <li>
          <a>Parent</a>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
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
        <details>
          <summary>Parent</summary>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </details>
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