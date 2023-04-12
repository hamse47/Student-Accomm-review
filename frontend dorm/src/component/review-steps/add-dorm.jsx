const AddDorm = ({ data, setData, setActive }) => {
  const handleChange = (e) => {
    setData((prev) => ({ ...prev, dorm_name: e.target.value }));
  };
  console.log(data);
  const handleSubmit = () => {
    setActive((prev) => prev + 1);
  };
  return (
    <div className="container">
      <input
        name="dorm_name"
        onChange={handleChange}
        value={data.dorm_name}
        placeholder="dorm name"
        className="w-full  mx-auto my-auto block mt-4  p-2 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />

      <div className="flex container justify-between">
        <button
          disabled={!(data.dorm_name && data.dorm_name !== "")}
          onClick={handleSubmit}
          className={`${
            data.dorm_name && data.dorm_name !== ""
              ? "bg-blue-400"
              : "bg-blue-200"
          } text-white px-10 py-2 mt-10 mx-auto rounded-md`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AddDorm;
