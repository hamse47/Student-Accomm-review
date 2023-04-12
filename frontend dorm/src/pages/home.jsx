import { useState, useContext } from "react";
import Card from "../component/card/school-card";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context";

const Home = () => {
  const [school, setSchool] = useState([]);
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    axios.get("/api/dorm/school/").then((res) => setSchool(res.data || []));
  }, []);

  const handleSelect = (e) => {
    let id = e.target.value;
    let name = school.filter((obj) => obj._id === id)[0].name;
    navigate(`/dorm/${id}`, { state: { name } });
  };

  const handleAddSchool = () => {
    if (token) {
      navigate(`/add-review/new-school/new-dorm`);
    } else {
      alert("you must be logged in to writing a review");
      navigate(`/login`);
    }
  };

  return (
    <div>
      <div className="h-[600px] w-[100%] flex flex-col items-center justify-center">
        <div className="max-w-[800px] w-full">
          <p className="text-xl text-center text-white mb-2">
            Your dream student housing, made easy.
          </p>
          <select
            onChange={handleSelect}
            className=" w-[80%]  mx-auto my-auto block  p-4 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="" hidden></option>
            {school.map(({ name, _id }) => (
              <option value={_id}>{name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="w-full text-right">
        <button
          onClick={handleAddSchool}
          className="bg-blue-500 text-white px-4 py-2 rounded-md m-3"
        >
          Add New School
        </button>
      </div>
      <div className="w-full container mx-auto my-10 gap-2 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2">
        {school.map((data) => (
          <Card {...data} />
        ))}
      </div>
    </div>
  );
};

export default Home;
