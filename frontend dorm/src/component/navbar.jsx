import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context";
const Navbar = () => {
  const { token } = useContext(AuthContext);
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <div className="sticky h-15 flex items-center justify-between bg-white w-[100%] border-b-[1px] border-black">
      <Link to="/">
        <img
          src={"/ICON-Student-2.png"}
          className="flex cursor-pointer my-auto sm:w-10/12 h-24 md:w-30 md:h-20 lg:w-45 lg:h-40 mr-24 p-6"
          alt="/ICON-Student-2.png"
        />
      </Link>
      {token ? (
        <div id="welcome-area" className="w-23 relative flex items-center">
          <p className="font-bold text-2xl p-5 pb-0 decoration-2">Welcome</p>
          <button
            onClick={logout}
            className="text-white bg-red-500 py-2 px-4 rounded-md shadow-md hover:bg-red-300 font-bold text-xl mt-5 mr-3"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <Link to="/register">
          <p className="font-bold text-2xl p-5 decoration-red-400 underline decoration-2">
            Register
          </p>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
