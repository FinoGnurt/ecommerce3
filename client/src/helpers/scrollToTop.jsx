import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn trang lên đầu
  }, [location]); // Lắng nghe thay đổi route

  return null; // Không render gì cả, chỉ để làm việc cuộn trang
};

export default ScrollToTop;
