import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context";
const Navbar = () => {
  const { token } = useContext(AuthContext);

  return (
    <div className="sticky top-0 h-15 flex items-center justify-between  bg-white w-[100%] border-b-[1px] border-black">
      <Link to="/">
        <img
          src={"/ICON-Student-2.png"}
          className="flex cursor-pointer my-auto sm: w-10/12 h-24 md:w-30 md:h-20 lg:w-45 lg:h-40 mr-24 p-6"
        />
      </Link>
      {token ? (
        <p className="font-bold text-2xl p-5">Welcome</p>
      ) : (
        <Link to="/register">
          <p className="font-bold text-2xl p-5">Register</p>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
