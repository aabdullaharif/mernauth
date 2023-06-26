import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { menuItems } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { clearCredentials } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/userApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleHumburger = () => {
    setIsOpen(!isOpen);
  };
  const showHideClass = `lg:flex justify-between lg:w-2/3 menu-wrapper fixed top-0 inset-0 bg-slate-200 px-4 py-8 h-full w-2/3 lg:static lg:h-fit lg:block lg:bg-inherit lg:p-0 ${
    isOpen ? "" : "hidden"
  }`;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(clearCredentials());
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <header className="p-4 flex justify-between items-center bg-cyan-200">
        <div className="lg:w-1/3">
          <Link to="/" className="logo w-40 inline-block">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <button type="button" className="lg:hidden" onClick={handleHumburger}>
          <FontAwesomeIcon size="xl" icon={faBars} />
        </button>
        <div className={showHideClass}>
          <nav className="nav">
            <ul className="navigation mb-8 lg:mb-0 lg:flex gap-20">
              {menuItems &&
                menuItems.map((item) => (
                  <li className="mb-2 lg:mb-0" key={item.id}>
                    <Link to={item.path}>{item.label}</Link>
                  </li>
                ))}
            </ul>
          </nav>
          {userInfo ? (
            <>
              <ul className="text-center">
                <li>
                  <Link to="/page/profile">
                    <strong className="uppercase">{userInfo.name}</strong>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    type="button"
                    className="underline"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </>
          ) : (
            <>
              <ul className="auth-btn flex gap-4">
                <li>
                  <Link
                    className="bg-teal-950 hover:bg-teal-600 py-2 px-4 text-white rounded"
                    to="page/auth"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    className="bg-teal-950 hover:bg-teal-600 py-2 px-4 text-white rounded"
                    to="page/register"
                  >
                    Register
                  </Link>
                </li>
              </ul>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
