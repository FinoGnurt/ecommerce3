const StarRating = ({
  value = 0,
  bgColorCheck = "bg-[#F59E0C]",
  bgColorUnCheck = "bg-[#ffe3a0]",
  width = "w-24",
  editStar = false,
}) => {
  const allRating = 10;
  const rating = value * 2;
  return (
    <div
      className={`rating rating-half ${width} ${editStar ? "" : "pointer-events-none"}`}
    >
      <input type="radio" name="rating-10" className="rating-hidden" />
      {new Array(rating).fill(0).map((_, index) => {
        if ((index + 1) % 2 === 0) {
          return (
            <input
              key={index}
              type="radio"
              name="rating-10"
              className={`mask mask-half-2 mask-star-2 ${bgColorCheck}`}
            />
          );
        } else {
          return (
            <input
              key={index}
              type="radio"
              name="rating-10"
              className={`mask mask-half-1 mask-star-2 ${bgColorCheck}`}
            />
          );
        }
      })}
      {new Array(allRating - rating).fill(0).map((_, index) => {
        if ((index + 2) % 2 === 0) {
          return (
            <input
              key={index}
              type="radio"
              name="rating-10"
              className={`mask mask-half-2 mask-star-2 ${bgColorUnCheck}`}
            />
          );
        } else {
          return (
            <input
              key={index}
              type="radio"
              name="rating-10"
              className={`mask mask-half-1 mask-star-2 ${bgColorUnCheck}`}
            />
          );
        }
      })}
    </div>
  );
};

export default StarRating;
