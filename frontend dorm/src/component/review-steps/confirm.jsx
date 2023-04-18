import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Star = ({ rating }) => {
  return (
    <div className="flex">
      {[...Array(rating).keys()].map((e) => (
        <button key={e} className="m-1">
          <i class="text-[#ffd700] fa-solid fa-star"></i>
        </button>
      ))}
      {[...Array(5 - rating).keys()].map((e) => (
        <button key={e} className="m-1">
          <i class="text-gray-300 fa-solid fa-star"></i>
        </button>
      ))}
    </div>
  );
};

const Label = ({ name, data }) => {
  return (
    <div className="mt-3 ms-10">
      <p className="text-wm">{name}</p>
      <div className="flex flex-wrap">
        {data?.map((text) => (
          <p className="bg-gray-400 px-1 m-1 text-[12px] w-[max-content] py-[2px] rounded-md">
            {text}
          </p>
        ))}
      </div>
    </div>
  );
};

const PreviewImg = ({ name, data }) => {
  const [img_url, setImg] = useState(data || []);

  useEffect(() => {
    if (data) {
      let images = data.map((file) => URL.createObjectURL(file));
      setImg(images);
    }
  }, [data]);
  return (
    <div className="mt-3 ms-10">
      <p className="text-wm">{name}</p>
      <div className="flex flex-wrap">
        {img_url?.map((images) => (
          <img className="h-12 m-2" src={images} alt="" />
        ))}
      </div>
    </div>
  );
};

const Confirmation = ({ data, setData, setActive }) => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    let form = new FormData();
    Object.keys(data).map((key) => {
      if (key === "photos") {
        data[key].map((img) => form.append("images", img));
      } else {
        form.append(key, data[key]);
      }
    });
    axios
      .post("/api/accommodation", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        alert("review added !!");
        navigate("/");
      })
      .catch((err) => alert("something went wrong !!"));
  };

  const handlePrev = () => {
    setActive((prev) => prev - 1);
  };
  return (
    <div className="container">
      <p className="text-2xl my-5">
        Confirm your review for {data.dorm_name} at {data.school_name}
      </p>
      <div className="w-full p-7  min-h-[300px] rounded-md bg-gray-100">
        <div className="grid grid-cols-7 ">
          <div className="col-span-4">
            <div className="mt-3 flex justify-between">
              <p className="text-xl font-bold ">Room rating</p>
              <Star rating={data.roomRating} />
            </div>
            <div className="mt-3 flex justify-between">
              <p className="text-xl font-bold">Building rating</p>
              <Star rating={data.buildingRating} />
            </div>
            <div className="mt-3 flex justify-between">
              <p className="text-xl font-bold">Bathroom rating</p>
              <Star rating={data.bathroomRating} />
            </div>
            <div className="mt-3 flex justify-between">
              <p className="text-xl font-bold">Location rating</p>
              <Star rating={data.locationRating} />
            </div>
          </div>
          <div className="col-span-3 ">
            <Label name={"Class year"} data={data.classYear} />
            <Label name={"Room type"} data={data.roomType} />
            <PreviewImg name="Photos" type="img" data={data.photos} />
          </div>
        </div>
        <div className="mt-3">
          <p className="text-xl font-bold">comment</p>
          <p className="text">{data.comment}</p>
        </div>
      </div>
      <div className="flex container justify-between">
        <button
          onClick={handlePrev}
          className="bg-blue-400 text-white px-10 py-2 mt-10 mx-auto rounded-md"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="bg-yellow-400 text-white px-10 py-2 mt-10 mx-auto rounded-md"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
