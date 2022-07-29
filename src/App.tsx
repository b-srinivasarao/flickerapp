/* eslint-disable react-hooks/exhaustive-deps */
import { ReactElement, useEffect } from "react";
import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Explore from "./pages/Explore";
import NotFound from "./pages/NotFound";
import MyAccount from "./pages/MyAccount";
import { useDispatch, useSelector } from "react-redux";
import ImageInfo from "./components/ImageInfo";
import ResponsiveAppBar from "./components/Navbar";
import { loginCheck } from "./reducer";

const App = (): ReactElement => {
  const isLoggedIn = useSelector((state: any) => state?.flicker?.isLoggedIn);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    dispatch(loginCheck(query.get("oauth_verifier")));
  }, [location.search]);
  return (
    <>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/photos/:id/:owner" element={<ImageInfo />} />
        <Route
          path="/user"
          element={isLoggedIn ? <MyAccount /> : <Navigate to="/" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
