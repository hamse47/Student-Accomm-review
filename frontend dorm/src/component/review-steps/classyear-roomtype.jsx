const ClassYearRoomType = ({ data, setData, setActive }) => {
  const class_year_data = [
    "First Year",
    "Second Year",
    "Third Year",
    "Fourth Year",
  ];
  const room_type = ["Single", "Double", "Triple", "Quad", "Suite", "Other"];

  const handleClassYear = (e) => {
    let class_year = data.classYear || [];
    if (class_year.includes(e.target.name)) {
      let index = class_year.indexOf(e.target.name);
      if (index !== -1) {
        class_year.splice(index, 1);
      }
    } else {
      class_year.push(e.target.name);
    }
    setData((prev) => ({ ...prev, classYear: class_year }));
  };

  const handleRoomType = (e) => {
    let room_type = data.roomType || [];
    if (room_type.includes(e.target.name)) {
      let index = room_type.indexOf(e.target.name);
      if (index !== -1) {
        room_type.splice(index, 1);
      }
    } else {
      room_type.push(e.target.name);
    }
    setData((prev) => ({ ...prev, roomType: room_type }));
  };

  const isValid = () => {
    if (
      data.classYear &&
      data.classYear.length > 0 &&
      data.roomType &&
      data.roomType.length > 0
    ) {
      return true;
    }
    return false;
  };

  const handleSubmit = () => {
    setActive((prev) => prev + 1);
  };

  const handlePrev = () => {
    setActive((prev) => prev - 1);
  };
  return (
    <div className="container">
      <div className="grid grid-cols-3">
        <div className="col-span-2">
          <p className="text-2xl">What class year(s) did you live here?</p>
        </div>
        <div className="col-span-1">
          {class_year_data.map((text) => (
            <div>
              <input
                checked={data.classYear && data.classYear.includes(text)}
                onChange={handleClassYear}
                class="h-4 w-4 rounded-full shadow"
                name={text}
                type="checkbox"
                id={text}
              />
              <label for={text} class="text-xl ms-4">
                {text}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 mt-20">
        <div className="col-span-2">
          <p className="text-2xl">What type of room(s) did you have?</p>
        </div>
        <div className="col-span-1">
          {room_type.map((text) => (
            <div>
              <input
                checked={data.roomType && data.roomType.includes(text)}
                onChange={handleRoomType}
                name={text}
                class="h-4 w-4 rounded-full shadow"
                type="checkbox"
                id={text}
              />
              <label for={text} class="text-xl ms-4">
                {text}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex mt-10 container justify-between">
        <button
          onClick={handlePrev}
          className="bg-blue-400 text-white px-10 py-2 mt-10 mx-auto rounded-md"
        >
          Prev
        </button>
        <button
          onClick={handleSubmit}
          disabled={!isValid()}
          className={`${
            isValid() ? "bg-red-400" : "bg-blue-200"
          } text-white px-10 py-2 mt-10 mx-auto rounded-md`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ClassYearRoomType;
