import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Registration from "./component/Registration";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./component/Login";
import Dashboard from "./component/Dashboard";
import Navbar from "./component/Navbar";
import React, { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, setuser } from "./redux/actions";
function App() {
  const [id, setId] = React.useState(false);

  let tempId;
  const dispatch = useDispatch();
  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(setuser(user));
        setId(true);
      } else {
        setId(false);
        <Navigate to="/" />;
      }
    });
  }, [dispatch]);

  const selector = useSelector((item) => item);

  if (id) {
    tempId = selector.user.currentUser.uid;
  }

  return (
    <>
      <BrowserRouter>
        <Navbar user={tempId} idExists={id} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
          {id ? (
            <Route path="/dashboard" element={<Dashboard user={tempId} />} />
          ) : (
            <Route path="/dashboard" element={<Login />} />
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
