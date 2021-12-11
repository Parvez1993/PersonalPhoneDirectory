import { signOut } from "firebase/auth";
import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../config";
import { removeUser } from "../redux/actions";
function Navbar(props) {
  const { user } = props;
  const navigate = useNavigate("/");

  const logout = async (e) => {
    setInfo("");
    e.preventDefault();
    try {
      await signOut(auth)
        .then(() => {
          navigate("/");
        })
        .then(() => {
          dispatch(removeUser());
        });
    } catch (error) {
      console.log(error);
    }
  };
  let [info, setInfo] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    let infoafterload = [];
    const db = getDatabase();
    const groupRef = ref(db, `users/${user}`);
    onValue(groupRef, (snapshot) => {
      snapshot.forEach((item) => {
        setInfo(snapshot.val());
      });
    });
  }, [user]);

  console.log(info);

  if (!info) {
    return <div className="text-center text-7xl">Welcome</div>;
  } else {
    return (
      <div className="flex flex-row justify-around align-items-center">
        <div>{info.username}</div>
        <div className="border-4 mt-10" onClick={logout}>
          logout
        </div>
        <div>{info.phoneNumber}</div>
      </div>
    );
  }
}

export default Navbar;
