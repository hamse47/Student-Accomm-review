import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.password !== data.confirm_password) {
      return alert("password doesn't match");
    }
    axios
      .post("/api/user/register", data)
      .then((res) => {
        alert("registration sucessfull , please do login now !!");
        navigate("/login");
      })
      .catch((err) => {
        if (err.response.code === 400) {
          alert(err.response.data.msg);
        }
      });
  };

  console.log(data);
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="shadow-md flex flex-col p-10 py-18 border-black rounded-md "
      >
        <p className="text-2xl text-center my-4">Register</p>
        <input
          placeholder="enter username"
          className="m-2 w-[300px] border p-2 rounded-md"
          name="username"
          value={data.username || ""}
          onChange={handleChange}
          required
        />
        <input
          placeholder="enter first name"
          className="m-2 w-[300px] border p-2 rounded-md"
          name="first_name"
          value={data.first_name || ""}
          onChange={handleChange}
          required
        />
        <input
          placeholder="enter last name"
          className="m-2 w-[300px] border p-2 rounded-md"
          name="last_name"
          value={data.last_name || ""}
          onChange={handleChange}
          required
        />
        <input
          placeholder="enter email"
          className="m-2 w-[300px] border p-2 rounded-md"
          name="email"
          type="email"
          value={data.email || ""}
          onChange={handleChange}
          required
        />
        <input
          placeholder="enter password"
          className="m-2 w-[300px] border p-2 rounded-md"
          type="password"
          name="password"
          value={data.password || ""}
          onChange={handleChange}
          required
        />
        <input
          placeholder="confirm password"
          className="m-2 w-[300px] border p-2 rounded-md"
          type="password"
          name="confirm_password"
          value={data.confirm_password || ""}
          onChange={handleChange}
          required
        />
        <button className="bg-blue-400 py-2 text-white px-6 mx-auto mt-10 rounded-md w-[max-content]">
          Register
        </button>
        <p className="w-[300px] mt-5 text-center text-sm">
          Already have account ?{" "}
          <Link to="/login" className="text-blue-400 font-bold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
