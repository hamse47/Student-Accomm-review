const AddSchoolAccommodation = ({ data, setData, setActive }) => {
  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    setActive((prev) => prev + 1);
  };
  return (
    <div className="container">
      <input
        value={data.school_name}
        name="school_name"
        onChange={handleChange}
        placeholder="school name"
        className="w-full  mx-auto my-auto block mt-4 p-2 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <input
        value={data.dorm_name}
        name="dorm_name"
        onChange={handleChange}
        placeholder="dorm name"
        className="w-full  mx-auto my-auto block mt-4  p-2 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />

      <div className="flex container justify-between">
        <button
          onClick={handleSubmit}
          disabled={
            data.dorm_name === "" ||
            !data.dorm_name ||
            data.school_name === "" ||
            !data.school_name
          }
          className={`bg-red-400 text-white px-10 py-2 mt-10 mx-auto rounded-md ${
            data.dorm_name === "" ||
            !data.dorm_name ||
            data.school_name === "" ||
            !data.school_name
              ? "bg-blue-200"
              : "bg-blue-400"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AddSchoolAccommodation;
