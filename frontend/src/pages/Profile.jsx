import {
  faEnvelope,
  faLock,
  faSignature,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useUpdateUserMutation } from "../slices/userApiSlice.js";

const Profile = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.name, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile Updated!");
      } catch (err) {
        toast.error(err?.data.message || err.error);
      }
    }
  };
  return (
    <>
      <div className="px-4 pt-8 container">
        <h2 className="text-3xl uppercase mb-12 text-center font-bold">
          Welcome {userInfo.name}!
        </h2>

        <form className="max-w-lg m-auto" onSubmit={submitHandler}>
          <div className="input-group mb-4">
            <label className="mb-3 inline-block">
              <FontAwesomeIcon
                icon={faSignature}
                bounce
                size="lg"
                className="mr-3"
              />
              Name
            </label>
            <input
              className="border outline-none w-full py-2 px-3 rounded"
              placeholder="Enter your name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <div className="input-group mb-4">
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
          <div className="input-group mb-10">
            <label className="mb-3 inline-block">
              <FontAwesomeIcon
                icon={faLock}
                bounce
                size="lg"
                className="mr-3"
              />
              Confirm Password
            </label>
            <input
              className="border outline-none w-full py-2 px-3 rounded"
              placeholder="Enter your confirm password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {isLoading && "<h2>Updating</h2>"}
          <button
            type="submit"
            className="w-full uppercase text-center bg-teal-950 hover:bg-teal-600 py-2 text-white rounded"
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default Profile;
