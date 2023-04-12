import { useLocation, useNavigate, useParams } from "react-router-dom";
import Card from "../component/card/dorm-card";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../context";

const DormList = () => {
  const { school } = useParams();
  const { state } = useLocation();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  useEffect(() => {
    axios
      .get(`/api/dorm/school/${school}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  console.log();
  const addDorm = () => {
    if (token) {
      navigate(`/add-review/${school}/new-dorm`);
    } else {
      alert("you must be loggein for writing review");
      navigate(`/login`);
    }
  };
  return (
    <div>
      <div className="bg-blue-500 h-[400px] w-[100%] flex flex-col items-center justify-center">
        <div className="max-w-[800px] w-full">
          <p className="text-center font-bold text-3xl text-white ">
            {state?.name}
          </p>
        </div>
      </div>
      <div className="w-full container flex flex-wrap py-2">
        <div className="w-full text-right">
          <button
            onClick={addDorm}
            className="bg-blue-500 text-white px-4 py-2 rounded-md m-3"
          >
            Add New Dorm
          </button>
        </div>
        {data.map((data) => (
          <Card {...data} school={school} />
        ))}
      </div>
    </div>
  );
};

export default DormList;
