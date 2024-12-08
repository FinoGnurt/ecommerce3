import {
  About,
  Cart,
  Products,
  Contact,
  Home,
  OrdersUser,
  PlaceOrder,
  ProductDetail,
  Login,
  Orders,
  ListProduct,
  AddProduct,
  Profile,
  Users,
  Brands,
  UpdateProduct,
} from "../pages";

const userRouter = [
  { id: 1, path: "", element: <Home /> },
  { id: 2, path: "products", element: <Products /> },
  { id: 3, path: "about", element: <About /> },
  { id: 4, path: "contact", element: <Contact /> },
  { id: 5, path: "product/:slug", element: <ProductDetail /> },
  { id: 6, path: "cart", element: <Cart /> },
  { id: 7, path: "login", element: <Login /> },
  { id: 8, path: "place-order", element: <PlaceOrder /> },
  { id: 9, path: "orders", element: <OrdersUser /> },
  { id: 10, path: "profile", element: <Profile /> },
];

const adminRouter = [
  { id: 1, path: "add", element: <AddProduct /> },
  { id: 2, path: "list", element: <ListProduct /> },
  { id: 3, path: "orders", element: <Orders /> },
  { id: 4, path: "users", element: <Users /> },
  { id: 4, path: "brands", element: <Brands /> },
  { id: 5, path: "update-product/:slug", element: <UpdateProduct /> },
];

export { userRouter, adminRouter };
