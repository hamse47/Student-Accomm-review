const ReviewRange = ({ title, value }) => (
  <div className="mt-5 grid grid-cols-12 items-center">
    <p className="col-span-4">{title}</p>
    <div class="col-span-6 w-[100%] bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div
        class="bg-blue-600 h-2.5 rounded-full"
        style={{ width: `${value}%`, maxWidth: "100%" }}
      ></div>
    </div>
    <p className="col-span-2 text-right">{value}</p>
  </div>
);

export default ReviewRange;
