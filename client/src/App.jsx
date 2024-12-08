import { Route, Routes } from "react-router-dom";
import { LayoutAdmin, LayoutUser, NotFound } from "./pages";
import { adminRouter, userRouter } from "./routes";
import toast, { Toaster, useToasterStore } from "react-hot-toast";
import { useContext, useEffect } from "react";
import ScrollToTop from "./helpers/scrollToTop";
import ScrollToTopBtn from "./helpers/scrollToTopBtn";
import Loading from "./assets/Loading.gif";
import { ShopContext } from "./context/shopContext";

function App() {
  const { loading } = useContext(ShopContext);

  // customization limit react-hot-toast
  const { toasts } = useToasterStore();
  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= 3) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);
  return (
    <div className="relative">
      {/* Toast */}
      <Toaster />

      {/* Scoll to top when change route */}
      <ScrollToTop />

      {/* Show btn ScrollToTop when scroll page */}
      <ScrollToTopBtn />

      {/* Loading */}
      {loading && (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-[rgba(255,255,255,0.5)]">
          <img src={Loading} alt="" className="w-32" />
        </div>
      )}

      {/* Router */}
      <Routes>
        {/* User */}
        <Route path="/" element={<LayoutUser />}>
          {userRouter.map((item) => (
            <Route key={item.id} path={item.path} element={item.element} />
          ))}
        </Route>

        {/* Admin */}
        <Route path="/admin" element={<LayoutAdmin />}>
          {adminRouter.map((item) => (
            <Route key={item.id} path={item.path} element={item.element} />
          ))}
        </Route>

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
