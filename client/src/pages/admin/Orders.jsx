const Orders = () => {
  return (
    <>
      <h3>Order Page</h3>
      <div>
        <div className="my-3 grid grid-cols-1 items-start gap-3 border-2 border-gray-200 p-5 text-xs text-gray-700 sm:grid-cols-[0.5fr_2fr_1fr] sm:text-sm md:my-4 md:p-8 lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr]">
          <img
            className="w-12"
            src="data:image/svg+xml,%3csvg%20width='73'%20height='73'%20viewBox='0%200%2073%2073'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20x='0.5'%20y='0.5'%20width='72'%20height='72'%20fill='%23F9FAFB'%20stroke='%23D2D2D2'/%3e%3cpath%20d='M41.1484%2037.4871L38.6348%2038.9418V65.0908L61.2694%2052.0221V25.873L41.1484%2037.4871Z'%20fill='%23565656'/%3e%3cpath%20d='M45.247%2014.039L36.5423%209L13.2793%2022.4295L21.9956%2027.4684L45.247%2014.039Z'%20fill='%23565656'/%3e%3cpath%20d='M59.7945%2022.4307L49.7631%2016.7168L26.5117%2030.1463L27.8384%2030.8329L36.5431%2035.8602L45.2013%2030.8678L59.7945%2022.4307Z'%20fill='%23565656'/%3e%3cpath%20d='M24.7545%2039.7573L20.5883%2037.6161V30.9595L12%2026.0137V51.9765L34.4717%2064.9521V38.9893L24.7545%2033.3917V39.7573Z'%20fill='%23565656'/%3e%3c/svg%3e"
            alt=""
          />
          <div>
            <div>
              <p className="py-0.5">
                Men Round Neck Pure Cotton T-shirt x 1 <span> M </span>
              </p>
            </div>
            <p className="mb-2 mt-3 font-medium">Shani Singh</p>
            <div>
              <p>Bundela health club iti jhansi,</p>
              <p>Jhansi, Uttar Pradesh, India, 284003</p>
            </div>
          </div>
          <div>
            <p className="text-sm sm:text-[15px]">Items : 1</p>
            <p className="mt-3">Method : COD</p>
            <p>Payment : Pending</p>
            <p>Date : 7/12/2024</p>
          </div>
          <p className="text-sm sm:text-[15px]">$74</p>
          <select className="select_input_textarea p-2 font-semibold">
            <option value="Order Placed">Order Placed</option>
            <option value="Packing">Packing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for delivery">Out for delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Orders;
