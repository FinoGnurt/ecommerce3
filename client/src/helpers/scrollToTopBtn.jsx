import { useState, useEffect } from "react";
import { FaRegArrowAltCircleUp } from "../utils/icons";

const ScrollToTopBtn = () => {
  // State để theo dõi xem nút có hiển thị hay không
  const [isVisible, setIsVisible] = useState(false);

  // Hàm để cuộn lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Kiểm tra khi cuộn trang và hiển thị nút khi cuộn xuống
  const handleScroll = () => {
    if (window.scrollY > 20) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Lắng nghe sự kiện cuộn
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup
    };
  }, []);

  return (
    isVisible && (
      <button
        className="btn btn-outline fixed bottom-6 right-6 p-3"
        onClick={scrollToTop}
      >
        <FaRegArrowAltCircleUp size={24} />
      </button>
    )
  );
};

export default ScrollToTopBtn;
