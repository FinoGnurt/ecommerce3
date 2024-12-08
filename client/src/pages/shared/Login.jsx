import { useContext, useEffect, useState } from "react";
import { apiSignIn, apiSignUp } from "../../services/user";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/shopContext";

const Login = () => {
  const { setAccessToken, user } = useContext(ShopContext);
  const [currentState, setCurrentState] = useState("Login");
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const resetData = () => {
    setData({ name: "", email: "", password: "" });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const rs =
      currentState === "Login" ? await apiSignIn(data) : await apiSignUp(data);

    // rs = accessToken when login

    if (rs.success) {
      toast.success(rs.message);

      if (currentState === "Login") {
        setAccessToken(rs.accessToken);
        localStorage.setItem("token", rs.accessToken);
        navigate("/");
      } else {
        setCurrentState("Login") & resetData();
      }
    } else {
      toast.error(rs.message);
    }
  };

  useEffect(() => {
    if (user !== null && Object.keys(user).length !== 0) {
      navigate("/");
    }
  }, []);

  return (
    <form
      className="m-auto mt-14 flex w-[90%] flex-col items-center gap-4 text-gray-800 sm:max-w-96"
      onSubmit={onSubmitHandler}
    >
      <div className="mb-2 mt-10 inline-flex items-center gap-2">
        <p className="text-3xl">{currentState}</p>
        <hr className="h-[1.5px] w-8 border-none bg-gray-800" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          type="text"
          placeholder="Name"
          className="w-full border border-gray-800 px-3 py-2"
          id="name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
      )}
      <input
        type="email"
        placeholder="Email"
        className="w-full border border-gray-800 px-3 py-2"
        id="email"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border border-gray-800 px-3 py-2"
        id="password"
        value={data.password}
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />
      <div className="mt-[-8px] flex w-full justify-between text-sm">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === "Login" ? (
          <p
            className="cursor-pointer"
            onClick={() => {
              setCurrentState("Sign up");
              resetData();
            }}
          >
            Create account
          </p>
        ) : (
          <p
            className="cursor-pointer"
            onClick={() => {
              setCurrentState("Login");
              resetData();
            }}
          >
            Login Here
          </p>
        )}
      </div>
      <button className="mt-4 bg-black px-8 py-2 font-light text-white">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
