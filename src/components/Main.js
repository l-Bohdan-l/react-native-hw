import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase/config";
import useRoute from "../hooks/useRoute";
import { authStateChangeUser } from "../redux/auth/authOperations";

export const Main = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  //   const state = useSelector((state) => state);
  //   console.log("state", state);

  const { stateChange } = useSelector((state) => state.auth);
  console.log("stateChange", stateChange);

  const routing = useRoute(stateChange);

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  //   onAuthStateChanged(auth, (user) => {
  //     setUser(user);
  //   });
  //   console.log(user);
  return <NavigationContainer>{routing}</NavigationContainer>;
};
