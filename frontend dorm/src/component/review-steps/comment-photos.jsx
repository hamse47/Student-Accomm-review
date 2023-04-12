import { useState, useEffect, useCallback } from "react";

const CommentPhoto = ({ data, setData, setActive }) => {
  const [preview_img, setPreview] = useState([]);
  const handleComment = (e) => {
    setData((prev) => ({ ...prev, comment: e.target.value }));
  };

  const handlePhoto = (e) => {
    let photoArray = data.photos || [];
    setData((prev) => ({
      ...prev,
      photos: [...photoArray, e.target.files[0]],
    }));
  };

  useEffect(() => {
    if (data.photos) {
      let images = data.photos.map((file) => URL.createObjectURL(file));
      setPreview(images);
    }
  }, [data.photos]);

  const removePhoto = (index) => {
    console.log(index);
    if (!isNaN(index)) {
      data.photos.splice(index, 1);
      setData((prev) => ({
        ...prev,
        photos: [...data.photos],
      }));
    }
  };

  const handleSubmit = () => {
    setActive((prev) => prev + 1);
  };

  const handlePrev = () => {
    setActive((prev) => prev - 1);
  };

  const isValid = useCallback(() => {
    if (
      data.comment &&
      data.comment !== "" &&
      data.photos &&
      data.photos.length > 0
    ) {
      return true;
    }
    return false;
  }, [data]);
  return (
    <div className="container">
      <label className="mt-5 text-xl font-bold block">Write a comment</label>
      <p className="text">
        How was your experience living here? Write a helpful comment about the
        pros, cons and what to expect when living at {data.dorm_name}.
      </p>
      <textarea
        value={data.comment}
        onChange={handleComment}
        className="block w-full border-2 h-32 mt-4 rounded-md p-2"
        placeholder="write a comment"
      />
      <label className="mt-7 text-xl font-bold block">Upload Photos</label>
      <p className="text">
        ou can attach up to 5 photos to your review. Please only attach clear,
        helpful photos of the exterior and interior Oo---. All photos are
        screened by moderators.
      </p>
      <div className="container flex my-5">
        {preview_img.map((file, index) => (
          <div className="relative">
            <button
              id={index}
              onClick={() => removePhoto(index)}
              className="absolute top-[-10px] right-0"
            >
              <i class="text-blue-500 text-xl fa-regular fa-circle-xmark"></i>
            </button>
            <img
              className="h-20 border-blue-400 border mx-2"
              src={file}
              alt=""
            />
          </div>
        ))}
      </div>
      <div className="relative flex items-center justify-center flex-col w-full border-2  h-32  mt- rounded-md p-2 ">
        <input
          onChange={handlePhoto}
          type="file"
          className="w-full h-full absolute opacity-0"
        />
        <p className="text-3xl">
          <i class="text-blue-400 fa-solid fa-cloud-arrow-up"></i>
        </p>
        <p className="text-xl">Click to browse files</p>
      </div>
      <div className="flex container justify-between">
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
            isValid() ? "bg-blue-400" : "bg-blue-200"
          } text-white px-10 py-2 mt-10 mx-auto rounded-md`}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default CommentPhoto;
