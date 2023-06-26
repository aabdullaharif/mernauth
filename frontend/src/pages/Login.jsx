import {
  faEnvelope,
  faLock,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <div className="px-4 pt-8 container">
        <h2 className="text-3xl uppercase mb-12 text-center font-bold">
          Login Now!
        </h2>

        <form className="max-w-lg m-auto" onSubmit={submitHandler}>
          <div className="input-group mb-4">
            <label className="mb-3 inline-block">
              <FontAwesomeIcon
                icon={faEnvelope}
                bounce
                size="lg"
                className="mr-3"
              />
              Email
            </label>
            <input
              className="border outline-none w-full py-2 px-3 rounded"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group mb-10">
            <label className="mb-3 inline-block">
              <FontAwesomeIcon
                icon={faLock}
                bounce
                size="lg"
                className="mr-3"
              />
              Password
            </label>
            <input
              className="border outline-none w-full py-2 px-3 rounded"
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {isLoading && <h2>Loading..</h2>}
          <button
            type="submit"
            className="w-full uppercase text-center bg-teal-950 hover:bg-teal-600 py-2 text-white rounded"
          >
            Sign in
          </button>

          <div className="pt-4 text-sm">
            <FontAwesomeIcon
              icon={faRightToBracket}
              size="lg"
              className="mr-3"
            />
            Don't Have Account?{" "}
            <Link to="/page/register" className="underline">
              Register
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
