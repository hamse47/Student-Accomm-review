const ReviewStar = ({ title = "no title", rating = 0, style }) => (
  <div style={style} className="mt-5 flex items-center justify-between">
    <p className="me-4">{title}</p>
    <div>
      {[...Array(rating).keys()].map(() => (
        <i class="text-[#ffd700] fa-solid fa-star me-3"></i>
      ))}
      {[...Array(5 - rating).keys()].map(() => (
        <i class="text-gray-300 fa-solid fa-star me-3"></i>
      ))}
    </div>
  </div>
);

export default ReviewStar;
