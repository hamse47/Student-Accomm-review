import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [data, setData] = useState({});
  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/user/login", data)
      .then((res) => {
        alert("login sucess");
        localStorage.setItem("token", res.data.token);
        window.location.href = "/";
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });
  };
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="shadow-md flex flex-col p-10 py-18 border-black rounded-md "
      >
        <p className="text-2xl text-center my-4">Login</p>
        <input
          placeholder="enter username"
          className="m-2 w-[300px] border p-2 rounded-md"
          name="username"
          value={data.username}
          onChange={handleChange}
        />
        <input
          placeholder="enter password"
          className="m-2 w-[300px] border p-2 rounded-md"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
        />
        <button className="bg-blue-400 py-2 text-white px-6 mx-auto mt-10 rounded-md w-[max-content]">
          Login
        </button>
        <p className="w-[300px] mt-5 text-center text-sm">
          Don't have account ?{" "}
          <Link to="/register" className="text-blue-400 font-bold">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
