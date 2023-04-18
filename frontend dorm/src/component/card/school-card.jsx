import { Link } from "react-router-dom";

const Card = ({ _id, name, reviewCount }) => (
  <Link to={`/accommodation/${_id}`} state={{ name }}>
    <div class="w-full mx-auto max-w-sm bg-white border rounded-2xl space-x-2 hover:scale-105 hover:bg-red-100 translate duration-200 ease-out shadow dark:border-gray-700">
      <img class="p-8 rounded-t-lg" src="/university.jpg" alt="" />
      <div class="px-6 pb-7">
        <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        <p className="text-gray-500">{reviewCount} reviews</p>
      </div>
    </div>
  </Link>
);

export default Card;
