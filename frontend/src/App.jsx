import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components";
import { Home, Login, Profile, Register } from "./pages";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <ToastContainer />
        <main id="main">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/page/auth" exact element={<Login />} />
            <Route path="/page/register" exact element={<Register />} />

            {/* Private Routes  */}
            <Route path="" element={<PrivateRoute />}>
              <Route path="/page/profile" exact element={<Profile />} />
            </Route>
          </Routes>
        </main>
      </Router>
    </>
  );
};

export default App;
