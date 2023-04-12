import { Link } from "react-router-dom";

const Card = ({ _id, name, reviewCount }) => (
  <Link to={`/dorm/${_id}`} state={{ name }}>
    <div class="w-full mx-auto max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 rounded-3xl">
      <img class="p-8 rounded-t-lg" src="/univercity.jpg" alt="" />
      <div class="px-5 pb-5">
        <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        <p className="text">{reviewCount} reviews</p>
      </div>
    </div>
  </Link>
);

export default Card;
